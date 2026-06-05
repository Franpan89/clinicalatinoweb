import { getSiteSettings } from '@/lib/data/settings'
import MapSettingsForm from './_components/MapSettingsForm'

export const dynamic = 'force-dynamic'

export default async function ConfiguracionPage() {
  const settings = await getSiteSettings()

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
          Configuración del sitio
        </h1>
        <p className="font-lato text-brand-gray">
          Ajustes generales que afectan el sitio público.
        </p>
      </div>

      <MapSettingsForm
        initialEmbedUrl={settings.map_embed_url ?? ''}
        initialAddress={settings.map_address ?? ''}
      />
    </div>
  )
}
