import type { Locale } from './i18n.config'

const dictionaries = {
  tr: () =>
    import('@/lib/i18n/dictionaries/tr.json').then(module => module.default),
  en: () =>
    import('@/lib/i18n/dictionaries/en.json').then(module => module.default),
  az: () =>
    import('@/lib/i18n/dictionaries/az.json').then(module => module.default),
  de: () =>
    import('@/lib/i18n/dictionaries/de.json').then(module => module.default),
  ru: () =>
    import('@/lib/i18n/dictionaries/ru.json').then(module => module.default),
    jp: () =>
    import('@/lib/i18n/dictionaries/jp.json').then(module => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
