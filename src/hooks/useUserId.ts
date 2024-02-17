import { ChatRole } from 'types/index'

type State = {
  userId: string | null
  userToken: string | null
  chatRole: ChatRole | null
}

export const getUserProps = (): State => {
  const searchParams = new URLSearchParams(window.location?.search)
  const userId = searchParams.get('userId')
  const userToken = searchParams.get('token')
  const chatRole = searchParams.get('chatRole')

  return {
    userId,
    userToken,
    chatRole: chatRole as State['chatRole'],
  }
}
