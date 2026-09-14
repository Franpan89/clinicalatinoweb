import { Wrench } from 'lucide-react'
import { getSiteSettings } from '@/lib/data/settings'
import Logo from '@/components/Logo'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Sitio en mantenimiento',
  robots: { index: false, follow: false },
}

export default async function MantenimientoPage() {
  const settings = await getSiteSettings()
  const message =
    settings.maintenance_message ||
    'Estamos realizando mejoras en el sitio. Volvemos a estar disponibles muy pronto.'

  return (
    <main className="min-h-screen bg-brand-surface flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-8">
          <Logo size={56} src={settings.logo_url} />
        </div>

        <div className="w-14 h-14 mx-auto mb-6 bg-brand-gradient flex items-center justify-center">
          <Wrench className="text-white" size={24} />
        </div>

        <h1 className="font-lato text-brand-dark text-2xl md:text-3xl font-bold mb-4">
          Sitio en mantenimiento
        </h1>

        <p className="font-lato text-brand-gray text-base leading-relaxed mb-8">
          {message}
        </p>

        <p className="font-lato text-brand-gray text-sm">
          Si es una emergencia médica, comunícate directamente al{' '}
          <a href="tel:+59372846666" className="text-brand-blue font-bold">
            +593 7 284 6666
          </a>
          .
        </p>
      </div>
    </main>
  )
}
