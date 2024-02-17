import { useAppContext } from 'hooks/useAppContext'
import { MarkdownText } from 'components/MarkdownText'
import { formattedTs } from 'utils/dates'
import { Icon } from 'components/ui/Icon'
import { useTheme } from 'hooks/useTheme'
import { memo } from 'react'
import { Message } from 'types/state'

type TextMessageProps = {
  messageItem: Message
  text: string
  startsSequence?: boolean
  endsSequence?: boolean
  showBotAvatar?: boolean
  ts: string
}

export const TextMessage = memo(
  ({ text, startsSequence, endsSequence, showBotAvatar, ts }: TextMessageProps) => {
    const { botMsgColor, botMsgBackgroundColor } = useAppContext()
    const { colors } = useTheme()

    const position = ['message', `${startsSequence ? 'start' : ''}`, `${endsSequence ? 'end' : ''}`].join(' ').trim()
    let borderStyle

    if (position === 'message start end') {
      borderStyle = 'tw-rounded-[20px]'
    }

    if (position === 'message start') {
      borderStyle = 'tw-rounded-tl-[20px] tw-rounded-br-[20px] tw-rounded-tr-[20px] tw-rounded-bl-[5px]'
    }

    if (position === 'message  end') {
      borderStyle = 'tw-rounded-tl-[5px] tw-rounded-br-[20px] tw-rounded-tr-[20px] tw-rounded-bl-[20px]'
    }

    if (position === 'message') {
      borderStyle = 'tw-rounded-tl-[5px] tw-rounded-bl-[5px] tw-rounded-br-[20px] tw-rounded-tr-[20px]'
    }

    return (
      <div className="tw-flex tw-space-x-1">
        <div className={`tw-flex tw-w-5 tw-items-end`}>
          <Icon
            className={`tw-h-5 tw-w-5 tw-rounded-full ${showBotAvatar ? '' : 'tw-hidden'}`}
            // src={botAvatar}
            icon={['fas', 'robot']}
            color={colors.primary}
          />
        </div>
        <div className="tw-flex tw-min-w-[10%] tw-max-w-[80%] tw-flex-col tw-space-x-2">
          <div
            className={`tw-w-fit tw-text-sm ${borderStyle} tw-whitespace-pre-line tw-break-words tw-px-[15px] tw-py-[8px]`}
            style={{ color: botMsgColor, backgroundColor: botMsgBackgroundColor }}
            dir="auto"
          >
            <MarkdownText text={text} />
          </div>
          {showBotAvatar && (
            <div className={'tw-row-auto justify-between'}>
              <span className="tw-text-[10px] tw-italic tw-capitalize tw-text-gray-500">{formattedTs(ts)}</span>
            </div>
          )}
        </div>
      </div>
    )
  },
)
TextMessage.displayName = 'TextMessage'
