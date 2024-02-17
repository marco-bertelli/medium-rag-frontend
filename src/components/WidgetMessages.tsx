import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { useAppContext } from 'hooks/useAppContext'
import { useScrollBottom } from 'hooks/useScrollBottom'
import { Chats } from 'components/chats/Chats'
import { BotTyping } from 'components/BotTyping'
import { selectMessages } from 'store/messages'
import clsx from 'clsx'
import { BotMode } from 'hooks/useGetBotMode'

const MessagesDiv = styled.div<{ widgetColor?: string }>`
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;

}
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius:20px;
  background-clip: padding-box;
  background: ${(props) => props.widgetColor}; /* color of the scroll thumb */,
  border-radius: "20px"; /* roundness of the scroll thumb */,
  border: "none"; /* creates padding around scroll thumb */,
}
`

export type WidgetMessagesProps = {
  botMode: BotMode
}

export const WidgetMessages = ({ botMode }: WidgetMessagesProps) => {
  const isInApp = botMode === 'app'
  const appContext = useAppContext()
  const { widgetColor } = appContext
  const messages = useSelector(selectMessages)
  const bottomRef = useScrollBottom(messages)

  return (
    <MessagesDiv
      className={clsx(
        'tw-flex tw-w-full tw-flex-col tw-self-start tw-overflow-y-auto tw-rounded-t-[1.2rem] tw-bg-white tw-p-2 tw-pt-2 ',
        isInApp ? 'tw-h-[calc(99vh-4.8rem)]' : `tw-h-[29rem]`,
      )}
      widgetColor={widgetColor}
    >
      <Chats messages={messages} />
      <BotTyping />
      <div ref={bottomRef} />
    </MessagesDiv>
  )
}
