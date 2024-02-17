import { PropsWithChildren, useEffect } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from 'i18n/en.json'
import it from 'i18n/it.json'

export const I18nProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const lang = new URLSearchParams(window.location?.search).get('lang')
    const navigatorLanguage = navigator.language.startsWith('it') ? 'it' : 'en' ?? 'it'
    const lng = lang || navigatorLanguage
    console.debug({ lng })
    i18n
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: en,
          },
          it: {
            translation: it,
          },
        },
        lng,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
      })
      .then(() => i18n.changeLanguage(lng))
      .catch(() => console.debug('Translations init error'))
  }, [])

  return <>{children}</>
}
