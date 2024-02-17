import it from './it.json'
import en from './en.json'
import { initReactI18next } from 'react-i18next'
import { use } from 'i18next'

use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      it: {
        translation: it,
      },
    },
    lng: navigator.language.startsWith('it') ? 'it' : 'en' ?? 'it',
    fallbackLng: 'it',
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => console.debug('Translations init'))
  .catch(() => console.debug('Translations init error'))
