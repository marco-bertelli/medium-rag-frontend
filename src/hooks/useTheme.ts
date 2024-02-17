import { useAppContext } from 'hooks/useAppContext'
import { useMemo } from 'react'

export const useTheme = () => {
  const { theme } = useAppContext()
  return useMemo(() => theme, [theme])
}
