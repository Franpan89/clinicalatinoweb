import type { InsuranceLogo } from '@/lib/types'

export default function InsurancePartners({ logos }: { logos: InsuranceLogo[] }) {
  if (logos.length === 0) return null

  // Duplicamos la lista para que el loop CSS translate(-50%) sea continuo
  const track = [...logos, ...logos]

  return (
    <section className="py-14 bg-white border-t border-brand-surface overflow-hidden">
      <div className="container mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-10 bg-brand-gradient" />
          <span className="text-brand-blue font-lato text-xs font-bold tracking-[0.3em] uppercase">
            Aseguradoras
          </span>
          <div className="h-px w-10 bg-brand-gradient" />
        </div>
        <h2 className="font-lato text-brand-dark text-2xl font-bold">
          Trabajamos con tu aseguradora
        </h2>
      </div>

      <div className="relative group">
        {/* Fade en los bordes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex items-center justify-center px-10 shrink-0"
              style={{ width: '180px' }}
            >
              {logo.logo_url ? (
                <img
                  src={logo.logo_url}
                  alt={logo.name}
                  className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              ) : (
                <span className="font-lato text-brand-gray text-sm font-bold">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
