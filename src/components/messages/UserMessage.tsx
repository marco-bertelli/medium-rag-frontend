import { useAppContext } from 'hooks/useAppContext'
import { MarkdownText } from 'components/MarkdownText'
import { formattedTs } from 'utils/dates'
import { Message } from 'types/state'

export type UserTextMessageProps = {
  messageItem: Message
}
export const UserMessage = ({ messageItem }: UserTextMessageProps) => {
  const { text, ts } = messageItem
  const appContext = useAppContext()
  const { textColor, userMsgBackgroundColor } = appContext

  return (
    <div className="tw-flex tw-flex-row-reverse ">
      <div className="tw-mt-4 tw-mb-2 tw-flex tw-max-w-[70%] tw-flex-col tw-items-end tw-justify-end ">
        <div
          className="tw-items-end tw-break-words tw-rounded-t-[20px] tw-rounded-br-[5px] tw-rounded-bl-[20px] tw-border-[0.5px] tw-bg-white tw-px-[10px] tw-py-[6px] tw-text-sm "
          style={{ color: textColor, backgroundColor: userMsgBackgroundColor }}
        >
          <MarkdownText text={text} />
        </div>
        <div className="tw-text-[10px] tw-italic tw-capitalize tw-text-gray-500">{formattedTs(ts)}</div>
      </div>
    </div>
  )
}
