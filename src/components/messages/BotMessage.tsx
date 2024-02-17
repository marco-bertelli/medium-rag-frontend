import { TextMessage } from './TextMessage'
import { Message } from 'types/state'

export type BotMessageProps = {
  messageItem: Message
  startsSequence: boolean
  endsSequence: boolean
  index: number
  showTimestamp: boolean
  ts: string // iso
  isLastMessage: boolean
}

export const BotMessage = ({ messageItem, startsSequence, endsSequence, index }: BotMessageProps) => {
  const botResponse = []
  let showBotAvatar = true

  if (endsSequence) {
    showBotAvatar = true
  }

  if (messageItem.type === 'text') {
    botResponse.push(
      <TextMessage
        startsSequence={startsSequence}
        endsSequence={endsSequence}
        showBotAvatar={showBotAvatar}
        text={messageItem.text}
        key={`${index}_text`}
        ts={messageItem.ts}
        messageItem={messageItem}
      />,
    )
  }
  
  return <>{botResponse}</>
}
