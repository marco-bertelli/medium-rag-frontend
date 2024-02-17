import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { useAppContext } from 'hooks/useAppContext'
import { selectToggleWidget, setToggleWidget } from 'store/widget'
export const WidgetLauncher = () => {
  const dispatch = useDispatch()
  const toggleWidget = useSelector(selectToggleWidget)
  const appContext = useAppContext()
  const { widgetColor, textColor } = appContext
  return (
    <motion.div
      animate={{
        scale: [0, 1.1, 1],
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`tw-fixed tw-right-5 tw-bottom-2 tw-mr-2 tw-inline-flex tw-cursor-default tw-items-center tw-rounded-full tw-p-2 tw-text-center tw-text-sm tw-font-medium tw-text-white tw-xs:right-0`}
      style={{ backgroundColor: widgetColor, color: textColor }}
      onClick={(e) => {
        e.preventDefault()
        dispatch(setToggleWidget(!toggleWidget))
      }}
    >
      <AnimatePresence>
        {toggleWidget ? (
          <motion.div
            animate={{
              rotate: [0, 90],
            }}
          >
            <XMarkIcon className="tw-h-12 tw-w-12" />
          </motion.div>
        ) : (
          <motion.div animate={{ opacity: 1 }}>
            <ChatBubbleOvalLeftEllipsisIcon className="tw-h-12 tw-w-12" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
