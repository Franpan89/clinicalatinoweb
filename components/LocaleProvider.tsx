'use client'

import { createContext, useContext } from 'react'
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config'

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE)

/** Lo monta el root layout con el idioma leído de la cookie en el servidor. */
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

/** Idioma activo para Client Components. En Server Components usa getLocale(). */
export function useLocale(): Locale {
  return useContext(LocaleContext)
}
