import axios from 'axios'
import { store } from 'store/index'
import { selectChatId, selectOpenChatLoading, setChatId, setOpenChatLoading } from 'store/messages'
import { DateTime } from 'luxon'

export const getGuestChat = async () => {
  try {
    const state = store.getState()
    const loading = selectOpenChatLoading(state)
    const chatId = selectChatId(state)
  
    if (loading || chatId) {
      return
    }

    store.dispatch(setOpenChatLoading(true))

    const { data } = await axios.get<{ _id: string }>('chats/guest')

    store.dispatch(setChatId(data._id))
    store.dispatch(setOpenChatLoading(false))
    
    return data
  } catch (e) {
    console.error({ e })
    store.dispatch(setChatId(undefined))
    store.dispatch(setOpenChatLoading(false))
    store.dispatch({
      text: "Unfortunately, I'm having some problem 😅. I would appreciate it if you could try again later",
      sender: 'BOT',
      type: 'text',
      ts: DateTime.now().toISO(),
    })
  }
}
