'use client'

import { useState, useTransition } from 'react'
import { Save, AlertCircle, CheckCircle, Map, ExternalLink, Info } from 'lucide-react'
import { updateMapSettings } from '@/app/admin/actions'
import { extractMapUrl } from '@/lib/utils/maps'

export default function MapSettingsForm({
  initialEmbedUrl,
  initialAddress,
}: {
  initialEmbedUrl: string
  initialAddress: string
}) {
  const [embedInput, setEmbedInput] = useState(initialEmbedUrl)
  const [address, setAddress] = useState(initialAddress)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Limpia el input y obtiene solo la URL para preview
  const cleanedUrl = extractMapUrl(embedInput)
  const isValidGoogleMaps =
    cleanedUrl !== null &&
    (cleanedUrl.includes('google.com/maps') || cleanedUrl.includes('maps.google'))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Si pegaron un iframe, lo limpiamos antes de guardar
    const formData = new FormData(e.currentTarget)
    if (cleanedUrl !== null) {
      formData.set('map_embed_url', cleanedUrl)
    }

    startTransition(async () => {
      const result = await updateMapSettings(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3500)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mapa principal */}
      <section className="bg-white p-6 md:p-8 border border-brand-surface">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
            <Map className="text-brand-teal" size={18} />
          </div>
          <div>
            <h2 className="font-lato text-brand-dark text-lg font-bold">
              Mapa de ubicación
            </h2>
            <p className="font-lato text-brand-gray text-xs mt-0.5">
              Aparece en la sección "Contacto" del sitio público.
            </p>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="flex items-start gap-3 bg-brand-surface/50 border-l-2 border-brand-blue px-4 py-3 mb-6">
          <Info size={14} className="text-brand-blue flex-shrink-0 mt-0.5" />
          <div className="font-lato text-xs text-brand-dark/80 leading-relaxed">
            <strong className="font-bold">Cómo obtener la URL:</strong>{' '}
            Abre{' '}
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue underline inline-flex items-center gap-0.5"
            >
              Google Maps <ExternalLink size={10} />
            </a>{' '}
            → busca tu ubicación → botón <strong>"Compartir"</strong> → pestaña{' '}
            <strong>"Insertar un mapa"</strong> → copia el código HTML (iframe) o solo la
            URL del <code className="bg-white px-1 py-0.5 text-[11px]">src</code> y pégala
            abajo. Acepta cualquiera de los dos formatos.
          </div>
        </div>

        {/* Embed URL field */}
        <div className="mb-5">
          <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
            URL o iframe del mapa
          </label>
          <textarea
            name="map_embed_url"
            value={embedInput}
            onChange={(e) => setEmbedInput(e.target.value)}
            rows={4}
            placeholder='Pega aquí el iframe completo o solo la URL. Ej:&#10;<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450"></iframe>'
            className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 px-4 py-3 font-lato text-sm font-mono text-brand-dark placeholder:text-brand-gray/50 bg-white transition-all resize-none"
          />
          {embedInput && (
            <div className="mt-2 font-lato text-xs">
              {cleanedUrl && isValidGoogleMaps ? (
                <span className="text-green-600 inline-flex items-center gap-1">
                  <CheckCircle size={12} /> URL válida detectada
                </span>
              ) : cleanedUrl ? (
                <span className="text-amber-600 inline-flex items-center gap-1">
                  <AlertCircle size={12} /> URL detectada pero no parece ser de Google Maps
                </span>
              ) : (
                <span className="text-red-600 inline-flex items-center gap-1">
                  <AlertCircle size={12} /> No se pudo extraer una URL válida
                </span>
              )}
            </div>
          )}
        </div>

        {/* Address field */}
        <div className="mb-5">
          <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
            Dirección textual
          </label>
          <input
            name="map_address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Ej: Av. de las Américas y Solano, Cuenca, Ecuador"
            className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 px-4 py-2.5 font-lato text-sm text-brand-dark placeholder:text-brand-gray/50 bg-white transition-all"
          />
          <p className="font-lato text-xs text-brand-gray mt-1.5">
            Texto que se muestra junto al ícono de ubicación en la sección Contacto.
          </p>
        </div>

        {/* Preview */}
        <div>
          <label className="block font-lato text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
            Vista previa
          </label>
          {cleanedUrl && isValidGoogleMaps ? (
            <div className="aspect-[3/2] bg-brand-surface overflow-hidden border border-brand-surface">
              <iframe
                src={cleanedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vista previa del mapa"
              />
            </div>
          ) : (
            <div className="aspect-[3/2] bg-brand-surface border-2 border-dashed border-brand-dark/15 flex flex-col items-center justify-center text-brand-gray">
              <Map size={36} className="opacity-40 mb-3" strokeWidth={1.2} />
              <div className="font-lato text-sm">
                Pega una URL válida arriba para ver el mapa aquí
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Error / Success */}
      {error && (
        <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3">
          <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-sm">
            Configuración guardada. Los cambios aparecen en el sitio público.
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-3 bg-brand-gradient text-white font-lato font-bold py-3.5 px-8 text-sm tracking-wide disabled:opacity-60 hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
        >
          {isPending ? (
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {isPending ? 'Guardando...' : 'Guardar configuración'}
        </button>
      </div>
    </form>
  )
}
