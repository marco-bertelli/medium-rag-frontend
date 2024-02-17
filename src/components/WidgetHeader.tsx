import { Bars3BottomRightIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useDetectClickOutside } from 'hooks/useDetectClickOutside'
import { useAppContext } from 'hooks/useAppContext'
import { setToggleWidget } from 'store/widget'
import {
  removeAllMessages,
  setUserTypingPlaceholder,
  setWelcomeMessage,
  toggleBotTyping,
  toggleUserTyping,
} from 'store/messages'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

export const CLOSE_ACTION = 'close'
export const CLEAR_CHAT_ACTION = 'clearChat'

export const WidgetHeader = () => {
  const dispatch = useDispatch()
  const appContext = useAppContext()
  const { t } = useTranslation()
  const { botSubTitle, botTitle, logo, chatHeaderCss } = appContext

  const { textColor, backgroundColor, avatarStyle, enableBotAvatarBorder } = chatHeaderCss
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useDetectClickOutside({
    setShowModal: setShowDropdown,
  })

  const dropdownMenu = useMemo(() => {
    return [
      {
        action: CLEAR_CHAT_ACTION,
        title: t('clearChat'),
      },
      {
        action: CLOSE_ACTION,
        title: t('close'),
      },
    ]
  }, [t])

  const handleCloseButton = () => {
    dispatch(setToggleWidget(false))
    setShowDropdown(false)
  }

  const handleClearChatButton = async () => {
    dispatch(removeAllMessages())
    dispatch(toggleBotTyping(false))
    dispatch(toggleUserTyping(true))
    dispatch(setUserTypingPlaceholder('typeMessage'))
    dispatch(setWelcomeMessage({}))
    setShowDropdown(false)
  }

  return (
    <>
      <div
        className={clsx(
          'tw-relative tw-flex tw-cursor-default tw-items-center tw-space-x-4 tw-rounded-t-[1.8rem] tw-p-2 tw-shadow-lg tw-drop-shadow',
          `tw-h-[7rem]`,
        )}
        style={{ backgroundColor, color: textColor }}
      >
        <div
          className="tw-shrink-0 tw-rounded-full tw-border-[1px]  tw-p-2"
          style={{ borderColor: textColor, borderWidth: enableBotAvatarBorder }}
        >
          <img style={{ ...avatarStyle }} className="tw-h-12 tw-w-12" src={logo} alt="Bot Logo" />
        </div>
        <div className="tw-w-full">
          <div className="tw-text-xl tw-font-semibold tw-antialiased">{botTitle}</div>
          <p className="">{botSubTitle}</p>
        </div>
        <motion.div whileHover={{ scale: 1.2 }} className="tw-flex" onClick={() => setShowDropdown(!showDropdown)}>
          <Bars3BottomRightIcon className="tw-h-7 tw-w-7" />
        </motion.div>
      </div>
      {showDropdown && (
        <div
          id="dropdown"
          className="tw-absolute tw-right-5 tw-top-16 tw-z-50 tw-w-fit tw-cursor-default  tw-divide-y tw-divide-gray-100 tw-rounded-xl tw-bg-white tw-shadow-lg"
          ref={dropdownRef}
        >
          <ul
            className="tw-rounded-lg tw-py-1 tw-text-sm"
            aria-labelledby="dropdownDefault"
            style={{
              backgroundColor,
              color: textColor,
              border: `1px solid ${textColor}`,
            }}
          >
            {dropdownMenu.map((item, idx) => {
              const { title, action } = item
              const closeAction = action === CLOSE_ACTION
              const clearAction = action === CLEAR_CHAT_ACTION
              return (
                <div
                  key={idx}
                  className="tw-hover:opacity-70 tw-flex"
                  onClick={() => {
                    closeAction && handleCloseButton()
                    clearAction && handleClearChatButton()
                  }}
                >
                  <div className="tw-flex tw-items-center tw-justify-center tw-pl-2">
                    {clearAction && <TrashIcon className="tw-h-4 tw-w-4" />}
                    {closeAction && <XMarkIcon className="tw-h-4 tw-w-4" />}
                  </div>
                  <div>
                    <span className="tw-block tw-px-2 tw-py-2">{title}</span>
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
