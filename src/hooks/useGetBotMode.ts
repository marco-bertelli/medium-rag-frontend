import { useEffect, useState } from 'react'

export type BotMode = 'app' | 'web'

export const useGetBotMode = () => {
  const [mode, setMode] = useState<BotMode>('app')
  useEffect(() => {
    const mode = (new URLSearchParams(window.location?.search).get('mode') || 'web') as BotMode
    setMode(mode)
  }, [])

  return mode
}
