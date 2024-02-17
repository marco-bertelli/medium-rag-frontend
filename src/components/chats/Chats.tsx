import { UserMessage } from 'components/messages/UserMessage'
import { BotMessage } from 'components/messages/BotMessage'
import { Message } from 'types/state'

export type ChatProps = {
  messages: Message[]
}

export const Chats = ({ messages }: ChatProps) => {
  let i = 0
  const tempMessages = []
  const messageCount = messages.length

  while (i < messageCount) {
    // const previous = messages[i - 1]
    const current = messages[i]
    // const next = messages[i + 1]
    const isUser = current.sender === 'USER'
    const ts = current.ts
    if (isUser) {
      tempMessages.push(<UserMessage messageItem={current} key={i} />)
    } else {
      tempMessages.push(
        <BotMessage
          messageItem={current}
          key={i}
          index={i}
          startsSequence={true}
          endsSequence={false}
          showTimestamp={true}
          isLastMessage={i === messageCount - 1}
          ts={ts}
        />,
      )
    }
    i += 1
  }
  return <>{tempMessages}</>
}
