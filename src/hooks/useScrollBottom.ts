import { useEffect, useRef } from 'react'
import { Message } from 'types/state'

export const useScrollBottom = (messageStack: Message[]) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messageStack])
  return bottomRef
}
