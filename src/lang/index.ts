import { uppercaseFirstLetter } from '@/utils/string'
import { createI18n } from 'vue-i18n'

function loadTranslations() {
  if (process.env.NODE_ENV === 'test') return {}
  const context = import.meta.glob('./locales/*.json', { eager: true })

  return Object.keys(context)
    .map((key) => ({ key, name: key.match(/\/([a-z_]+)\.json$/i)?.[1] }))
    .reduce(
      (modules, { key, name }) => ({
        ...modules,
        [name ?? '']: context[key],
      }),
      {},
    )
}

const translations = loadTranslations()

const i18n = createI18n({
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'en',
  fallbackWarn: false,
  missingWarn: false,
  legacy: false,
  messages: translations,
  datetimeFormats: {
    en: {
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
