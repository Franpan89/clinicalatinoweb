type LogoProps = {
  /** Tamaño del icono en px (alto). Ancho proporcional. */
  size?: number
  /** Si true, muestra "CLINICA Latino" al lado del icono */
  withText?: boolean
  /** Color del texto cuando withText=true */
  textClassName?: string
  className?: string
}

/**
 * Logo Clínica Latino
 *
 * Renderiza `public/logo.svg` (sólo el ícono — versión cuadrada sin texto)
 * vía <img>. Para reemplazar por el archivo oficial, simplemente sobreescribe
 * `public/logo.svg` con el nuevo SVG. El sitio se actualiza automáticamente.
 *
 * Si quieres usar la versión horizontal con texto incluida en el archivo SVG,
 * cambia `withText={false}` y la prop interna usa esa versión.
 */
export default function Logo({
  size = 40,
  withText = false,
  textClassName = 'text-brand-gray',
  className = '',
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.svg"
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
