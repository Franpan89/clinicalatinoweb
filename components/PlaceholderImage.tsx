'use client'

import { useId, useState } from 'react'
import { ImageIcon, type LucideIcon } from 'lucide-react'

type Variant = 'brand' | 'soft' | 'dark' | 'outline'

const variantClasses: Record<Variant, string> = {
  brand: 'bg-brand-gradient text-white',
  soft: 'bg-brand-surface text-brand-dark border border-brand-dark/10',
  dark: 'bg-brand-dark text-white',
  outline: 'bg-white border-2 border-dashed border-brand-teal/30 text-brand-dark',
}

export default function PlaceholderImage({
  src,
  alt,
  label,
  ratio = '4/3',
  variant = 'brand',
  icon: Icon = ImageIcon,
  recommendedSize,
  filename,
  className = '',
}: {
  /** Si se provee, renderiza la imagen real */
  src?: string | null
  alt?: string
  /** Etiqueta descriptiva, ej: "Fachada de la clínica" */
  label?: string
  /** Aspect ratio CSS (default "4/3") */
  ratio?: string
  variant?: Variant
  icon?: LucideIcon
  /** Tamaño recomendado, ej: "1600×900px" */
  recommendedSize?: string
  /** Nombre sugerido para el archivo, ej: "hero-banner.jpg" */
  filename?: string
  className?: string
}) {
  const id = useId()
  const patternId = `ph-${id.replace(/[:]/g, '')}`
  const [imgError, setImgError] = useState(false)

  if (src && !imgError) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <img
          src={src}
          alt={alt ?? label ?? ''}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${variantClasses[variant]} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {/* Pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-current opacity-30" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-current opacity-30" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-current opacity-30" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-current opacity-30" />

      <div className="text-center px-6 relative z-10 max-w-xs">
        <Icon size={32} className="mx-auto opacity-60 mb-3" strokeWidth={1.4} />
        {label && (
          <div className="font-lato font-bold text-sm uppercase tracking-wider mb-1">
            {label}
          </div>
        )}
        {recommendedSize && (
          <div className="font-lato text-xs opacity-65 mt-1">{recommendedSize}</div>
        )}
        {filename && (
          <div className="font-lato text-[10px] opacity-50 mt-1 font-mono">{filename}</div>
        )}
        <div className="font-lato text-[10px] uppercase tracking-[0.25em] opacity-50 mt-3">
          Imagen placeholder
        </div>
      </div>
    </div>
  )
}
