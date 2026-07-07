import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import Script from 'next/script'
import { getSiteSettings } from '@/lib/data/settings'
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Clínica Latino | Medicina de Excelencia en Ecuador',
    template: '%s',
  },
  description:
    'Centro médico privado con tecnología de vanguardia en Cuenca, Ecuador. Emergencias 24/7, especialidades médicas, cirugía, neonatología y más.',
  keywords:
    'clínica, médico, Ecuador, Cuenca, cirugía, emergencias, especialistas, salud, neonatología, cardiología',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Clínica Latino | Medicina de Excelencia',
    description: 'Centro médico privado con tecnología de vanguardia. Atención de emergencias 24/7.',
    locale: 'es_EC',
    type: 'website',
    url: SITE_URL,
    siteName: 'Clínica Latino',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clínica Latino | Medicina de Excelencia',
    description: 'Centro médico privado con tecnología de vanguardia. Atención de emergencias 24/7.',
  },
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
  const gaId = settings.google_analytics_id
  const pixelId = settings.meta_pixel_id

  return (
    <html lang="es" className={lato.variable}>
      <body>
        {children}
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
