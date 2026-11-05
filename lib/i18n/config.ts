export type Locale = 'es' | 'en'

export const LOCALES: Locale[] = ['es', 'en']
export const DEFAULT_LOCALE: Locale = 'es'

/** Cookie donde se guarda el idioma elegido en el toggle del header */
export const LOCALE_COOKIE = 'locale'

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'es' || value === 'en'
}

/** Locale BCP-47 para Intl / toLocaleDateString */
export const DATE_LOCALE: Record<Locale, string> = {
  es: 'es-EC',
  en: 'en-US',
}

/** Locale para <meta property="og:locale"> */
export const OG_LOCALE: Record<Locale, string> = {
  es: 'es_EC',
  en: 'en_US',
}
