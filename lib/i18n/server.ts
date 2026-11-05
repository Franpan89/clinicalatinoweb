import { cookies } from 'next/headers'
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from './config'

/** Idioma del visitante (cookie del toggle). Solo para Server Components / Server Actions. */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value
  return isLocale(value) ? value : DEFAULT_LOCALE
}
