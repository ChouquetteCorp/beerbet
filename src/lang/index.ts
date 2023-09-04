import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'

const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'fr',
  fallbackWarn: false,
  missingWarn: false,
  legacy: false,
  messages: {
    fr,
  },
  datetimeFormats: {
    fr: {
      long: {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
      short: {
        month: 'numeric',
        day: 'numeric',
      },
      date: {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      },
      time: {
        hour: '2-digit',
        minute: '2-digit',
      },
    },
  },
})

export default i18n
