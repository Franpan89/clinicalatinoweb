import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Script from 'next/script'
import { getSiteSettings } from '@/lib/data/settings'
import { getLocale } from '@/lib/i18n/server'
import { OG_LOCALE, type Locale } from '@/lib/i18n/config'
import { LocaleProvider } from '@/components/LocaleProvider'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  // Lato sólo ofrece 100, 300, 400, 700, 900 en Google Fonts.
  // No hay 500 ni 600, así que `font-medium`/`font-semibold` caerán a 700 vía font-weight nearest.
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clinicalatino.med.ec'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const faviconUrl = settings.favicon_url

  return {
    ...buildBaseMetadata(getLocale()),
    icons: faviconUrl
      ? { icon: faviconUrl, shortcut: faviconUrl, apple: faviconUrl }
      : { icon: '/logo.svg', shortcut: '/logo.svg' },
  }
}

const META_COPY: Record<
  Locale,
  { title: string; description: string; keywords: string; ogTitle: string; ogDescription: string }
> = {
  es: {
    title: 'Clínica Latino | Medicina de Excelencia en Ecuador',
    description:
      'Centro médico privado con tecnología de vanguardia en Cuenca, Ecuador. Emergencias 24/7, especialidades médicas, cirugía, neonatología y más.',
    keywords:
      'clínica, médico, Ecuador, Cuenca, cirugía, emergencias, especialistas, salud, neonatología, cardiología',
    ogTitle: 'Clínica Latino | Medicina de Excelencia',
    ogDescription: 'Centro médico privado con tecnología de vanguardia. Atención de emergencias 24/7.',
  },
  en: {
    title: 'Clínica Latino | Medical Excellence in Ecuador',
    description:
      'Private medical center with cutting-edge technology in Cuenca, Ecuador. 24/7 emergency care, medical specialties, surgery, neonatology and more.',
    keywords:
      'clinic, doctor, Ecuador, Cuenca, surgery, emergency, specialists, health, neonatology, cardiology',
    ogTitle: 'Clínica Latino | Medical Excellence',
    ogDescription: 'Private medical center with cutting-edge technology. 24/7 emergency care.',
  },
}

function buildBaseMetadata(locale: Locale): Metadata {
  const m = META_COPY[locale]
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.title,
      template: '%s',
    },
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: '/',
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      locale: OG_LOCALE[locale],
      type: 'website',
      url: SITE_URL,
      siteName: 'Clínica Latino',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.ogTitle,
      description: m.ogDescription,
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: 'Clínica Latino',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  telephone: '+593-7-2846-666',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cuenca',
    addressCountry: 'EC',
  },
  medicalSpecialty: [
    'Cardiology',
    'Neonatology',
    'Gynecology',
    'Surgery',
    'IntensiveCare',
  ],
  openingHours: 'Mo-Su 00:00-23:59',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const locale = getLocale()
  const gaId = settings.google_analytics_id
  const pixelId = settings.meta_pixel_id

  return (
    <html lang={locale} className={lato.variable}>
      <body>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics (GA4) — se activa al configurar el ID en /admin/configuracion */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');`}
            </Script>
          </>
        )}

        {/* Meta Pixel (Facebook / Instagram Ads) — se activa al configurar el ID en /admin/configuracion */}
        {pixelId && (
          <>
            <Script id="meta-pixel-init" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');`}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  )
}
