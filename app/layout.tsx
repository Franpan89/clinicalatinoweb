import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={lato.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
