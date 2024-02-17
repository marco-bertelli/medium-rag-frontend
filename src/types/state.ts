import { ChatRole } from 'types/index'
import { ButtonItem } from 'components/messages/MessageButtons'

export type Message = {
  text: string
  sender: 'USER' | 'BOT'
  type: 'text' | 'role_buttons' | 'like_buttons'
  ts: string // iso date
  id: string
  buttons?: ButtonItem[]
  isWelcomeMessage?: boolean
}

export type MessagesState = {
  chatId?: string
  chatRole?: ChatRole
  openChatLoading: boolean
  messages: any[]
  botTyping: boolean
  userTyping: boolean
  userTypingPlaceholder: string
  userGreeted: boolean
}

export type WidgetState = {
  toggleWidget: boolean
  userId: string | null
  showHelpMessage: false
}

export type RootState = {
  messageState: MessagesState
  widgetState: WidgetState
}
