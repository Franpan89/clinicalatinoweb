'use client'

import { useState, useTransition } from 'react'
import { Save, AlertCircle, CheckCircle, BarChart3, Info } from 'lucide-react'
import { updateAnalyticsSettings } from '@/app/admin/actions'

export default function AnalyticsForm({
  initialGaId,
  initialPixelId,
}: {
  initialGaId: string
  initialPixelId: string
}) {
  const [gaId, setGaId] = useState(initialGaId)
  const [pixelId, setPixelId] = useState(initialPixelId)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await updateAnalyticsSettings(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3500)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 border border-brand-surface">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
          <BarChart3 className="text-brand-teal" size={18} />
        </div>
        <div>
          <h2 className="font-lato text-brand-dark text-lg font-bold">
            Analítica y píxeles de seguimiento
          </h2>
          <p className="font-lato text-brand-gray text-xs mt-0.5">
            Conecta Google Analytics y Meta Pixel para medir visitas y campañas publicitarias.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-brand-surface/50 border-l-2 border-brand-blue px-4 py-3 mb-6">
        <Info size={14} className="text-brand-blue flex-shrink-0 mt-0.5" />
        <div className="font-lato text-xs text-brand-dark/80 leading-relaxed">
          Deja estos campos vacíos hasta que tengas los IDs listos. Al guardar, los códigos
          se activan automáticamente en todo el sitio público — no requiere tocar código.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
        <div>
          <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
            Google Analytics (GA4)
          </label>
          <input
            name="google_analytics_id"
            value={gaId}
            onChange={(e) => setGaId(e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 px-4 py-2.5 font-lato text-sm text-brand-dark placeholder:text-brand-gray/50 bg-white transition-all"
          />
          <p className="font-lato text-xs text-brand-gray mt-1.5">
            ID de medición GA4. Se encuentra en Google Analytics → Administrar → Flujos de datos.
          </p>
        </div>

        <div>
          <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
            Meta Pixel (Facebook / Instagram Ads)
          </label>
          <input
            name="meta_pixel_id"
            value={pixelId}
            onChange={(e) => setPixelId(e.target.value)}
            placeholder="123456789012345"
            className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 px-4 py-2.5 font-lato text-sm text-brand-dark placeholder:text-brand-gray/50 bg-white transition-all"
          />
          <p className="font-lato text-xs text-brand-gray mt-1.5">
            ID numérico del píxel. Se encuentra en Meta Events Manager → Orígenes de datos.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="mt-4 flex items-start gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3">
          <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-sm">Configuración guardada correctamente.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 inline-flex items-center justify-center gap-3 bg-brand-gradient text-white font-lato font-bold py-3 px-6 text-sm tracking-wide disabled:opacity-60 hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
      >
        {isPending ? (
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Save size={16} />
        )}
        {isPending ? 'Guardando...' : 'Guardar configuración'}
      </button>
    </form>
  )
}
