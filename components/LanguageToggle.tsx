'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { LOCALE_COOKIE, LOCALES, type Locale } from '@/lib/i18n/config'
import { useLocale } from './LocaleProvider'

const ONE_YEAR = 60 * 60 * 24 * 365

const LABELS: Record<Locale, { short: string; aria: string }> = {
  es: { short: 'ES', aria: 'Español' },
  en: { short: 'EN', aria: 'English' },
}

export default function LanguageToggle({ className = '' }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function select(next: Locale) {
    if (next === locale) return
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`
    startTransition(() => router.refresh())
  }

  return (
    <div
      role="group"
      aria-label={locale === 'es' ? 'Idioma' : 'Language'}
      className={`inline-flex items-center border border-brand-dark/15 rounded-sm overflow-hidden font-lato text-xs font-bold tracking-wider ${
        pending ? 'opacity-60' : ''
      } ${className}`}
    >
      {LOCALES.map((l) => {
        const active = l === locale
        return (
          <button
            key={l}
            type="button"
            onClick={() => select(l)}
            aria-pressed={active}
            aria-label={LABELS[l].aria}
            lang={l}
            className={`px-2.5 py-1.5 transition-colors ${
              active
                ? 'bg-brand-blue text-white'
                : 'text-brand-dark/60 hover:text-brand-blue hover:bg-brand-surface'
            }`}
          >
            {LABELS[l].short}
          </button>
        )
      })}
    </div>
  )
}
