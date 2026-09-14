import { getSiteSettings } from '@/lib/data/settings'
import MaintenanceForm from './_components/MaintenanceForm'

export const dynamic = 'force-dynamic'

export default async function MantenimientoAdminPage() {
  const settings = await getSiteSettings()

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
          Mantenimiento
        </h1>
        <p className="font-lato text-brand-gray">
          Pon el sitio público en pausa mientras haces cambios, sin afectar el acceso al panel.
        </p>
      </div>

      <MaintenanceForm
        initialActive={settings.maintenance_mode === 'true'}
        initialMessage={settings.maintenance_message ?? ''}
      />
    </div>
  )
}
