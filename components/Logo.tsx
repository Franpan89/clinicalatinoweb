import { useId } from 'react'

type LogoProps = {
  /** Tamaño del icono en px */
  size?: number
  /** Si true, muestra "CLINICA Latino" al lado del icono */
  withText?: boolean
  /** Color del texto cuando withText=true. Si no se especifica, usa brand-gray. */
  textClassName?: string
  className?: string
}

/**
 * Logo Clínica Latino — aproximación SVG del logo oficial.
 * Reemplazar `public/logo.svg` con el archivo vectorial del manual para precisión absoluta.
 */
export default function Logo({
  size = 40,
  withText = false,
  textClassName = 'text-brand-gray',
  className = '',
}: LogoProps) {
  const id = useId()
  const gradId = `cl-grad-${id.replace(/[:]/g, '')}`

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 220 240"
        width={size}
        height={(size * 240) / 220}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Clínica Latino"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id={gradId} x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#B9DB5C" />
            <stop offset="35%" stopColor="#5BB89A" />
            <stop offset="65%" stopColor="#2BB3B2" />
            <stop offset="100%" stopColor="#2C6FB1" />
          </linearGradient>
        </defs>

        {/* Shape A — top + right arm */}
        <path
          d="M 110 14
             C 88 14 70 32 70 54
             L 70 80
             L 44 80
             C 22 80 4 98 4 120
             C 4 142 22 160 44 160
             L 70 160
             C 88 160 106 142 106 120
             L 106 94
             L 132 94
             C 154 94 172 76 172 54
             C 172 32 154 14 132 14 Z"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="18"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Shape B — bottom + right interlock */}
        <path
          d="M 110 160
             C 132 160 150 142 150 120
             L 150 94
             L 176 94
             C 198 94 216 112 216 134
             C 216 156 198 174 176 174
             L 150 174
             L 150 200
             C 150 222 132 240 110 240
             C 88 240 70 222 70 200
             L 70 174"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="18"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>

      {withText && (
        <div className={`flex flex-col leading-none ${textClassName}`}>
          <span className="font-lato font-light text-[10px] tracking-[0.35em] uppercase">
            Clínica
          </span>
          <span className="font-lato font-light text-2xl -mt-0.5 tracking-tight">
            Latino
          </span>
        </div>
      )}
    </div>
  )
}
