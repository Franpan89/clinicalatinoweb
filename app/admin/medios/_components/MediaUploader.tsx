'use client'

import { useRef, useState, useTransition } from 'react'
import { Upload, X, CheckCircle, AlertCircle, Link as LinkIcon, FileVideo, Image as ImageIcon } from 'lucide-react'
import { uploadSiteMedia, setSiteMediaUrl, clearSiteMedia } from '@/app/admin/actions'
import { toEmbedUrl } from '@/lib/utils/maps'

type MediaUploaderProps = {
  /** Clave única en site_settings — ej: 'hero_image_url' */
  mediaKey: string
  /** Etiqueta visible */
  label: string
  /** Descripción / contexto */
  description?: string
  /** URL actual guardada */
  currentUrl?: string | null
  /** MIME accept para input file */
  accept?: string
  /** Tamaño recomendado */
  recommendedSize?: string
  /** Aspect ratio para preview (ej: "4/3", "16/9") */
  previewRatio?: string
  /** Tipo de media — 'image' o 'video' */
  mediaType?: 'image' | 'video'
  /** Si true, también permite pegar una URL externa (YouTube, etc.) */
  allowExternalUrl?: boolean
}

export default function MediaUploader({
  mediaKey,
  label,
  description,
  currentUrl,
  accept = 'image/jpeg,image/png,image/webp',
  recommendedSize,
  previewRatio = '16/9',
  mediaType = 'image',
  allowExternalUrl = false,
}: MediaUploaderProps) {
  const [status, setStatus] = useState<{ kind: 'idle' | 'success' | 'error'; msg?: string }>({ kind: 'idle' })
  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl ?? null)
  const [externalUrl, setExternalUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isVideo = mediaType === 'video'
  const embedUrl = previewUrl ? toEmbedUrl(previewUrl) : null
  const isYouTube = previewUrl && /youtube\.com|youtu\.be|vimeo\.com/.test(previewUrl)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 50 * 1024 * 1024) {
      setStatus({ kind: 'error', msg: 'El archivo no puede superar 50 MB.' })
      return
    }

    setStatus({ kind: 'idle' })
    const fd = new FormData()
    fd.append('key', mediaKey)
    fd.append('file', file)

    startTransition(async () => {
      const result = await uploadSiteMedia(fd)
      if (result?.error) {
        setStatus({ kind: 'error', msg: result.error })
      } else if (result?.success) {
        setPreviewUrl(result.url ?? null)
        setStatus({ kind: 'success', msg: 'Subido correctamente.' })
        setTimeout(() => setStatus({ kind: 'idle' }), 3000)
      }
    })
  }

  const handleSaveExternal = () => {
    if (!externalUrl.trim()) return
    setStatus({ kind: 'idle' })
    const resolvedUrl = toEmbedUrl(externalUrl.trim()) ?? externalUrl.trim()
    const fd = new FormData()
    fd.append('key', mediaKey)
    fd.append('url', resolvedUrl)

    startTransition(async () => {
      const result = await setSiteMediaUrl(fd)
      if (result?.error) {
        setStatus({ kind: 'error', msg: result.error })
      } else {
        setPreviewUrl(resolvedUrl)
        setExternalUrl('')
        setStatus({ kind: 'success', msg: 'URL guardada.' })
        setTimeout(() => setStatus({ kind: 'idle' }), 3000)
      }
    })
  }

  const handleClear = () => {
    if (!confirm(`¿Quitar ${label}?`)) return
    startTransition(async () => {
      const result = await clearSiteMedia(mediaKey)
      if (result?.error) {
        setStatus({ kind: 'error', msg: result.error })
      } else {
        setPreviewUrl(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        setStatus({ kind: 'success', msg: 'Removido — usando placeholder.' })
        setTimeout(() => setStatus({ kind: 'idle' }), 3000)
      }
    })
  }

  return (
    <div className="bg-white p-5 border border-brand-surface">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 bg-brand-teal/10 flex items-center justify-center flex-shrink-0">
            {isVideo ? (
              <FileVideo className="text-brand-teal" size={16} />
            ) : (
              <ImageIcon className="text-brand-teal" size={16} />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-lato text-brand-dark font-bold text-sm leading-tight">{label}</h3>
            {description && (
              <p className="font-lato text-brand-gray text-xs mt-0.5">{description}</p>
            )}
            {recommendedSize && (
              <p className="font-lato text-brand-gray text-[10px] mt-1 uppercase tracking-wider">
                Recomendado: {recommendedSize}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div
        className="relative bg-brand-surface mb-4 overflow-hidden border border-brand-dark/5"
        style={{ aspectRatio: previewRatio }}
      >
        {previewUrl ? (
          isVideo ? (
            isYouTube ? (
              <iframe
                src={embedUrl ?? previewUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={previewUrl}
                className="w-full h-full object-cover"
                controls
                muted
              />
            )
          ) : (
            <img src={previewUrl} alt={label} className="w-full h-full object-cover" />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-brand-gray">
            {isVideo ? <FileVideo size={28} className="opacity-50 mb-2" /> : <ImageIcon size={28} className="opacity-50 mb-2" />}
            <div className="font-lato text-xs uppercase tracking-wider">Sin archivo · usa placeholder</div>
          </div>
        )}
      </div>

      {/* Upload + URL externa */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <label className="inline-flex items-center gap-2 cursor-pointer bg-brand-dark hover:bg-brand-blue text-white font-lato font-bold py-2.5 px-4 text-xs tracking-wider uppercase transition-colors">
          <Upload size={13} />
          {previewUrl ? 'Reemplazar' : 'Subir'}
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            disabled={isPending}
          />
        </label>

        {previewUrl && (
          <button
            type="button"
            onClick={handleClear}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-lato text-xs font-bold uppercase tracking-wider py-2.5 px-3 transition-colors"
          >
            <X size={13} />
            Quitar
          </button>
        )}

        {isPending && (
          <span className="text-brand-gray font-lato text-xs">Procesando...</span>
        )}
      </div>

      {/* URL externa (para videos YouTube principalmente) */}
      {allowExternalUrl && (
        <div className="pt-3 border-t border-brand-surface mt-3">
          <label className="block font-lato text-[10px] font-bold text-brand-gray uppercase tracking-wider mb-2">
            O pega una URL (YouTube, Vimeo, MP4 externo)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" />
              <input
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://youtube.com/embed/..."
                className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none pl-9 pr-3 py-2 font-lato text-xs bg-white"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveExternal}
              disabled={isPending || !externalUrl.trim()}
              className="bg-brand-teal hover:bg-brand-blue text-white font-lato text-xs font-bold uppercase tracking-wider px-4 py-2 disabled:opacity-50 transition-colors"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Status */}
      {status.kind === 'success' && (
        <div className="mt-3 flex items-start gap-2 text-green-700 bg-green-50 border border-green-200 px-3 py-2">
          <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-xs">{status.msg}</span>
        </div>
      )}
      {status.kind === 'error' && (
        <div className="mt-3 flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 px-3 py-2">
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          <span className="font-lato text-xs">{status.msg}</span>
        </div>
      )}
    </div>
  )
}
