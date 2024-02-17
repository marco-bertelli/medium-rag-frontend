import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import AppContext from '../context/AppContext'
import { RootState } from 'types/state'
import { addMessage, selectChatRole, toggleBotTyping, toggleUserTyping } from 'store/messages'
import { createUserMessage, getBotResponseV2 } from 'utils/helpers'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { BotMode } from 'hooks/useGetBotMode'

const Textarea = styled.textarea`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export type WidgetKeypadProps = {
  botMode: BotMode
}

export const WidgetKeypad = ({ botMode }: WidgetKeypadProps) => {
  const dispatch = useDispatch()
  const isInApp = botMode === 'app'
  const { t } = useTranslation()
  const theme = useContext(AppContext)
  const [userInput, setUserInput] = useState('')
  const userTypingPlaceholder = useSelector((state: RootState) => state.messageState.userTypingPlaceholder)
  const chatRole = useSelector(selectChatRole)
  const userTyping = useSelector((state: RootState) => state.messageState.userTyping)
  const { btnColor } = theme


  const handleSubmit = async () => {
    if (userInput?.length > 0) {
      dispatch(addMessage(createUserMessage(userInput.trim())))
      setUserInput('')
      dispatch(toggleUserTyping(false))
      dispatch(toggleBotTyping(true))
      await getBotResponseV2({
        message: userInput.trim(),
      })
    }
  }

  return (
    <div
      className={clsx(
        'tw-mt-auto tw-flex tw-items-center tw-border-t-[1px] tw-border-t-gray-100 tw-bg-slate-50',
        isInApp ? `tw-h-[4.8rem]` : `tw-h-[4rem]`,
        isInApp ? '' : 'tw-rounded-t-3xl tw-rounded-b-[2rem]',
      )}
    >
      <Textarea
        rows={1}
        className={`tw-mx-4 tw-rounded-b-[2rem] tw-block tw-w-full tw-resize-none tw-bg-slate-50 tw-p-2.5 tw-text-sm tw-text-gray-900 tw-outline-none ${
          userTyping ? 'tw-cursor-default' : 'tw-cursor-not-allowed'
        }`}
        placeholder={!chatRole ? t('answerToQuestionToContinue') : t(userTypingPlaceholder)}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSubmit().catch(console.error)
          }
        }}
        readOnly={!userTyping}
      />
      <button
        type="submit"
        disabled={!userInput}
        className={`${
          userInput.trim().length > 1 ? 'tw-cursor-default' : 'tw-cursor-not-allowed'
        } tw-hover:bg-slate-100 tw-inline-flex tw-justify-center tw-rounded-full tw-p-2 `}
        style={{ color: btnColor || 'black' }}
        onClick={(e) => {
          e.preventDefault()
          handleSubmit().catch(console.error)
        }}
      >
        <PaperAirplaneIcon className="tw-h-6 tw-w-6 -tw-rotate-45 tw-stroke-[1.1px]" />
      </button>
    </div>
  )
}
