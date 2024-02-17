import { useSelector } from 'react-redux'
import { useAppContext } from 'hooks/useAppContext'
import { RootState } from 'types/state'

export const BotTyping = () => {
  const theme = useAppContext()

  const botTyping = useSelector((state: RootState) => state.messageState.botTyping)
  const { botAvatar, botMsgColor, botMsgBackgroundColor } = theme
  return (
    <>
      {botTyping ? (
        <div className="tw-flex tw-space-x-1">
          <div className={`tw-flex tw-w-5 tw-items-end`}>
            <img className={`tw-h-5 tw-w-5 tw-rounded-full`} src={botAvatar} alt="Bot Logo" />
          </div>
          <div
            className={`tw-flex tw-w-fit tw-space-x-2 tw-self-start tw-whitespace-pre-line tw-break-words tw-rounded-tl-[20px] tw-rounded-br-[25px] tw-rounded-tr-[20px] tw-rounded-bl-[5px] tw-px-5 tw-py-3 tw-text-sm tw-text-white`}
            style={{ backgroundColor: botMsgBackgroundColor }}
          >
            <div
              className="tw-animation-delay-32 tw-h-2 tw-w-2 tw-animate-bounce tw-rounded-full tw-bg-white tw-p-1"
              style={{ backgroundColor: botMsgColor }}
            />
            <div
              className="tw-animation-delay-16 tw-h-2 tw-w-2 tw-animate-bounce tw-rounded-full tw-bg-white tw-p-1"
              style={{ backgroundColor: botMsgColor }}
            />
            <div
              className="tw-h-2 tw-w-2 tw-animate-bounce tw-rounded-full tw-bg-white tw-p-1"
              style={{ backgroundColor: botMsgColor }}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
