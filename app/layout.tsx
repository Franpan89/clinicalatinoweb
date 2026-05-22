import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Clínica Latino | Medicina de Excelencia en Ecuador',
  description:
    'Centro médico privado con tecnología de vanguardia en Cuenca, Ecuador. Emergencias 24/7, especialidades médicas, cirugía, neonatología y más.',
  keywords:
    'clínica, médico, Ecuador, Cuenca, cirugía, emergencias, especialistas, salud, neonatología, cardiología',
  openGraph: {
    title: 'Clínica Latino | Medicina de Excelencia',
    description: 'Centro médico privado con tecnología de vanguardia. Atención de emergencias 24/7.',
    locale: 'es_EC',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={lato.variable}>
      <body>{children}</body>
    </html>
  )
}
