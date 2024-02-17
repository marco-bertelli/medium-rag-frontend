import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectToggleWidget } from 'store/widget'

export const useToggleWidget = () => {
  const toggleWidget = useSelector(selectToggleWidget)

  useEffect(() => {
    window.parent.postMessage({ type: 'toggleWidget', payload: toggleWidget }, '*')
  }, [])

  return useMemo(() => toggleWidget, [toggleWidget])
}
