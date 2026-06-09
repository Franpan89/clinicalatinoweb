type LogoProps = {
  /** Tamaño del icono en px (alto). Ancho proporcional. */
  size?: number
  /** Si true, muestra "CLINICA Latino" al lado del icono */
  withText?: boolean
  /** Color del texto cuando withText=true */
  textClassName?: string
  /** URL del logo. Si no se provee, usa /logo.svg local. */
  src?: string | null
  className?: string
}

const DEFAULT_LOGO = '/logo.svg'

/**
 * Logo Clínica Latino
 *
 * Renderiza el logo configurado en /admin/medios (site_settings.logo_url),
 * con fallback al archivo local `public/logo.svg`.
 */
export default function Logo({
  size = 40,
  withText = false,
  textClassName = 'text-brand-gray',
  src,
  className = '',
}: LogoProps) {
  const logoUrl = src || DEFAULT_LOGO
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoUrl}
        alt="Clínica Latino"
        width={size}
        height={size}
        style={{ height: size, width: 'auto' }}
        className="flex-shrink-0"
      />

      {withText && (
        <div className={`flex flex-col leading-none ${textClassName}`}>
          <span className="font-lato font-medium text-[10px] tracking-[0.35em] uppercase">
            Clínica
          </span>
          <span className="font-lato font-medium text-2xl -mt-0.5 tracking-tight">
            Latino
          </span>
        </div>
      )}
    </div>
  )
}
