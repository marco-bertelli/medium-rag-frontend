import { persistor, store } from '../store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { WidgetLayout } from './WidgetLayout'
import axios from 'axios'
import { useEffect } from 'react'
import { WidgetProps } from 'types/widget'
import './../index.scss'
import { I18nProvider } from '../providers/I18nProvider'
import { getUserProps } from 'hooks/useUserId'
import AppContext from '../context/AppContext'

export const Widget = ({ serverApiUrl, ...props }: WidgetProps) => {
  useEffect(() => {
    axios.defaults.baseURL = serverApiUrl
    axios.defaults.headers.common['Content-Type'] = 'application/json'
  }, [serverApiUrl])

  return (
      <I18nProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContext.Provider value={{ serverApiUrl, ...props, ...getUserProps() }}>
              <WidgetLayout />
            </AppContext.Provider>
          </PersistGate>
        </Provider>
      </I18nProvider>
  )
}
