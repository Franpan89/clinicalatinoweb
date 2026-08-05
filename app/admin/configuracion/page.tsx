import { getSiteSettings } from '@/lib/data/settings'
import MapSettingsForm from './_components/MapSettingsForm'
import LeadsEmailForm from './_components/LeadsEmailForm'
import SocialLinksForm from './_components/SocialLinksForm'
import AnalyticsForm from './_components/AnalyticsForm'
import MediaUploader from '../medios/_components/MediaUploader'

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

      <div className="space-y-6">
        <MediaUploader
          mediaKey="favicon_url"
          label="Favicon del sitio"
          description="Ícono que aparece en la pestaña del navegador. Idealmente PNG o SVG cuadrado con fondo transparente."
          currentUrl={settings.favicon_url}
          recommendedSize="512×512px (cuadrado) · PNG, SVG o ICO"
          previewRatio="1/1"
          previewClassName="max-w-[120px]"
          accept="image/png,image/x-icon,image/svg+xml,image/webp"
        />

        <LeadsEmailForm initialEmail={settings.leads_email ?? ''} />

        <SocialLinksForm initial={settings} />

        <MapSettingsForm
          initialEmbedUrl={settings.map_embed_url ?? ''}
          initialAddress={settings.map_address ?? ''}
        />

        <AnalyticsForm
          initialGaId={settings.google_analytics_id ?? ''}
          initialPixelId={settings.meta_pixel_id ?? ''}
        />
      </div>
    </div>
  )
}
