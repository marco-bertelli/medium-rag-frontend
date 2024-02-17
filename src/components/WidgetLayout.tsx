import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectChatId, setWelcomeMessage } from 'store/messages'
import { WidgetHeader } from 'components/WidgetHeader'
import { WidgetMessages } from 'components/WidgetMessages'
import { WidgetKeypad } from 'components/WidgetKeypad'
import { WidgetLauncher } from 'components/WidgetLauncher'
import { getGuestChat } from 'api'
import clsx from 'clsx'
import { useGetBotMode } from 'hooks/useGetBotMode'
import { useToggleWidget } from 'hooks/useToggleWidget'
import { Icon } from 'components/ui/Icon'
import { useTheme } from 'hooks/useTheme'
import { useTranslation } from 'react-i18next'

export const useConfigureChat = () => {
  const dispatch = useDispatch()
  const chatId = useSelector(selectChatId)

  useEffect(() => {
      if (!chatId) {
        getGuestChat()
          .catch(console.error)
          .then(() => {
            dispatch(setWelcomeMessage({}))
          })
      }
  
  })
}

export const WidgetLayout = () => {
  const toggleWidget = useToggleWidget()
  const botMode = useGetBotMode()
  const { t } = useTranslation()
  const {
    colors: { primary },
  } = useTheme()
  const [showHelpMessage, setShowHelpMessage] = useState(false)
  useConfigureChat()

  useEffect(() => {
    setTimeout(() => {
      if (!toggleWidget) {
        setShowHelpMessage(true)
      }
    }, 1500)
  }, [])

  useEffect(() => {
    if (toggleWidget && showHelpMessage) {
      setShowHelpMessage(false)
    }
  }, [toggleWidget])

  if (botMode === 'app') {
    return (
      <div
        className={clsx(
          'tw-xs:w-full tw-fixed tw-bottom-1 tw-flex tw-h-[99vh] tw-w-[100vw] tw-flex-col tw-rounded-[1.8rem] tw-mt-3 tw-font-lato',
        )}
        key="widget"
        style={{
          zIndex: 9999999,
        }}
      >
        <WidgetMessages botMode={botMode} />
        <WidgetKeypad botMode={botMode} />
      </div>
    )
  }

  return (
    <AnimatePresence>
      {showHelpMessage && (
        <motion.div
          key="help"
          className={clsx(
            'tw-fixed tw-bottom-20 tw-right-4 tw-text-sm tw-border-blue-500 tw-border tw-p-2 tw-rounded-xl tw-bg-white',
          )}
          initial={{ y: -80, opacity: 0 }} // Initial position and opacity
          animate={{ y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80 } }} // Bounce animation configuration
        >
          <div style={{ zIndex: 999999, fontWeight: 700, color: primary }}>
            <span className={'tw-mr-[3px]'}>{t('needHelp')}</span>
            <Icon icon={['fas', 'question-circle']} style={{ fontSize: '14px' }} color={primary} />
          </div>
        </motion.div>
      )}
      {toggleWidget && (
        <motion.div
          className={clsx(
            // eslint-disable-next-line max-len
            'tw-ring-black-5 tw-xs:right-0 tw-xs:w-full tw-fixed tw-bottom-5 tw-right-5 tw-z-50 tw-flex tw-w-[400px]  tw-max-w-[90vw] tw-flex-col tw-rounded-[1.8rem] tw-bg-white tw-font-lato tw-shadow-lg',
            `tw-h-[40rem]`,
          )}
          animate={{ y: -60 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          key="widget"
          style={{
            zIndex: 9999999,
          }}
        >
          <WidgetHeader />
          <WidgetMessages botMode={botMode} />
          <WidgetKeypad botMode={botMode} />
        </motion.div>
      )}
      <WidgetLauncher />
    </AnimatePresence>
  )
}
