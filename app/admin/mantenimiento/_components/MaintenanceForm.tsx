'use client'

import { useState, useTransition } from 'react'
import { Save, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import { updateMaintenanceMode } from '@/app/admin/actions'

export default function MaintenanceForm({
  initialActive,
  initialMessage,
}: {
  initialActive: boolean
  initialMessage: string
}) {
  const [active, setActive] = useState(initialActive)
  const [message, setMessage] = useState(initialMessage)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await updateMaintenanceMode(formData)
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
        <div className="w-10 h-10 bg-red-500/10 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="text-red-600" size={18} />
        </div>
        <div>
          <h2 className="font-lato text-brand-dark text-lg font-bold">
            Sitio en mantenimiento
          </h2>
          <p className="font-lato text-brand-gray text-xs mt-0.5">
            Muestra una página de "en mantenimiento" a los visitantes mientras haces cambios.
            El panel de administración sigue siendo accesible y, si tienes la sesión iniciada,
            también puedes seguir viendo el sitio público normal para revisar tus cambios.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border border-brand-dark/10 px-4 py-3 mb-5">
        <div>
          <div className="font-lato text-sm font-bold text-brand-dark">
            {active ? 'Mantenimiento activado' : 'Sitio activo (normal)'}
          </div>
          <div className="font-lato text-xs text-brand-gray mt-0.5">
            {active
              ? 'Los visitantes ven la página de mantenimiento en todas las rutas públicas.'
              : 'Los visitantes ven el sitio con normalidad.'}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setActive((v) => !v)}
          disabled={isPending}
          className={`relative inline-flex items-center h-6 w-11 flex-shrink-0 transition-colors duration-200 ${
            active ? 'bg-red-600' : 'bg-brand-dark/15'
          } disabled:opacity-50`}
          aria-label={active ? 'Desactivar mantenimiento' : 'Activar mantenimiento'}
        >
          <span
            className={`inline-block h-4 w-4 transform bg-white shadow transition-transform duration-200 ${
              active ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        {/* Checkbox real oculto para que el FormData lleve el valor al enviar */}
        <input type="checkbox" name="maintenance_mode" checked={active} readOnly hidden />
      </div>

      <div className="mb-5">
        <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
          Mensaje personalizado (opcional)
        </label>
        <textarea
          name="maintenance_message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Estamos actualizando el sitio. Volvemos pronto."
          className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 px-4 py-2.5 font-lato text-sm text-brand-dark placeholder:text-brand-gray/50 bg-white transition-all resize-none"
        />
        <p className="font-lato text-xs text-brand-gray mt-1.5">
          Si lo dejas vacío, se muestra un mensaje genérico.
        </p>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-start gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3">
          <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-sm">Guardado correctamente.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-3 bg-brand-gradient text-white font-lato font-bold py-3 px-6 text-sm tracking-wide disabled:opacity-60 hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
      >
        {isPending ? (
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Save size={16} />
        )}
        {isPending ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}
