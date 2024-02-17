import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import ObjectID from 'bson-objectid'
import { t } from 'i18next'
import { Message, MessagesState, RootState } from 'types/state'
import { uniqBy } from 'lodash'

const initialState: MessagesState = {
  chatId: undefined,
  openChatLoading: false,
  chatRole: undefined,
  messages: [],
  botTyping: false,
  userTyping: true,
  userTypingPlaceholder: 'typeMessage',
  userGreeted: false,
}
export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload
    },
    setOpenChatLoading: (state, action) => {
      state.openChatLoading = action.payload
    },
    setChatRole: (state, action) => {
      state.chatRole = action.payload
    },
    updateMessage: (
      state: MessagesState,
      action: PayloadAction<{ messageId: string; messageData: Partial<Message> }>,
    ) => {
      const messageId = action.payload.messageId
      const messageData = action.payload.messageData

      state.messages.map((message) => {
        if (message.id === messageId) {
          message = { ...message, ...messageData }
        }
        return message
      })
    },
    setWelcomeMessage(state, { payload: { createdAt } }: PayloadAction<{ createdAt?: string | null }>) {
      if (state.messages.length === 0) {
        const welcomeTextMessage = {
          text: t('welcome'),
          sender: 'BOT',
          type: 'text',
          showBotAvatar: true,
          ts: createdAt || DateTime.now().toISO(),
          id: String(ObjectID()),
          isWelcomeMessage: true,
        }
        state.messages.push(welcomeTextMessage)
      }
    },
    addNewMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    addMessage: (state, action) => {
      if (action.payload.sender === 'USER') {
        state.messages = state.messages.map((message) => {
          if (message.type === 'custom') {
            if (message.text) {
              message = {
                text: message.text,
                sender: 'BOT',
                type: 'text',
                ts: message.ts,
                id: String(ObjectID()),
              }
            }
          }
          if (message.type === 'buttons') {
            message.quick_replies = []
          }
          return message
        })
      }
      state.messages.push(action.payload)
    },
    startBotResponse: (state) => {
      state.botTyping = true
    },
    streamBotResponse: (state, action) => {
      state.botTyping = false
      const { botMessageId, partialResponse } = action.payload
      const index = state.messages.findIndex((message) => message.id === botMessageId)
      if (index > -1) {
        state.messages[index].text = `${partialResponse}...`
      } else {
        state.messages.push({
          text: `${partialResponse} ...`,
          sender: 'BOT',
          type: 'text',
          ts: DateTime.now().toISO(),
          id: botMessageId,
        })
      }
    },
    endBotResponse: (state: MessagesState, action) => {
      const { botMessageId, botResponse, botDatabaseId } = action.payload
      console.debug('endBotResponse', action.payload)
      const index = state.messages.findIndex((message) => message.id === botMessageId)
      state.botTyping = false
      state.userTyping = true
      state.messages[index] = {
        ...state.messages[index],
        text: botResponse,
        id: botDatabaseId,
        botDatabaseId: botDatabaseId,
      }
      state.userTypingPlaceholder = 'typeMessage'
    },
    addMessages: (state: MessagesState, action: PayloadAction<Message[]>) => {
      state.messages = uniqBy([...state.messages, ...action.payload], 'id')
    },
    resetMessageState: () => {
      return initialState
    },
    removeAllMessages: (state) => {
      state.messages = []
    },
    disableButtons: (state, action) => {
      const index = action.payload
      state.messages[index].callback = false
    },
    toggleUserTyping: (state, action) => {
      state.userTyping = action.payload
    },
    toggleBotTyping: (state, action) => {
      state.botTyping = action.payload
      state.userTypingPlaceholder = action.payload ? 'waitBotResponse' : 'typeMessage'
    },
    setUserTypingPlaceholder: (state, action) => {
      state.userTypingPlaceholder = action.payload
    },
    setUserGreeted: (state, action) => {
      state.userGreeted = action.payload
    },
  },
})

export const {
  addMessage,
  removeAllMessages,
  toggleBotTyping,
  toggleUserTyping,
  setUserTypingPlaceholder,
  setUserGreeted,
  resetMessageState,
  disableButtons,
  startBotResponse,
  streamBotResponse,
  setWelcomeMessage,
  endBotResponse,
  setChatId,
  addNewMessage,
  setChatRole,
  setOpenChatLoading,
  addMessages,
} = messagesSlice.actions

export const selectChatId = (rootState: RootState) => rootState.messageState.chatId
export const selectOpenChatLoading = (rootState: RootState) => rootState.messageState.openChatLoading
export const selectMessages = (rootState: RootState) => rootState.messageState.messages
export const selectHasMessages = (rootState: RootState) => rootState.messageState?.messages?.length > 0
export const selectChatRole = (rootState: RootState) => rootState.messageState?.chatRole

export default messagesSlice.reducer
