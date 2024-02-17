import { useContext } from 'react'
import AppContext from '../context/AppContext'
import { WidgetProps } from 'types/widget'

export const useAppContext = (): WidgetProps => {
  return useContext(AppContext)
}
