import { Clock, Award, Stethoscope, Cpu } from 'lucide-react'

const pillars = [
  {
    icon: Clock,
    value: '24/7',
    label: 'Atención de Emergencias',
    desc: 'Siempre disponibles cuando más nos necesitas',
  },
  {
    icon: Award,
    value: '69',
    label: 'Años de Experiencia',
    desc: 'Desde 1957 cuidando la salud cuencana',
  },
  {
    icon: Stethoscope,
    value: '40+',
    label: 'Especialidades Médicas',
    desc: 'Cobertura integral de tus necesidades de salud',
  },
  {
    icon: Cpu,
    value: '100%',
    label: 'Tecnología de Punta',
    desc: 'Equipos de diagnóstico de última generación',
  },
]

export default function TrustBar() {
  return (
    <section className="bg-brand-dark py-16 relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="trust-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1.2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trust-dots)" />
        </svg>
      </div>

      {/* Decorative arcs */}
      <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
        <svg width="380" height="380" viewBox="0 0 380 380">
          <circle cx="380" cy="380" r="180" fill="none" stroke="#2BB3B2" strokeWidth="1" />
          <circle cx="380" cy="380" r="120" fill="none" stroke="#2BB3B2" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {pillars.map((p, i) => (
            <div key={i} className="flex items-start gap-4 px-6 py-5 sm:py-2 first:pl-0 last:pr-0">
              <div className="w-11 h-11 bg-brand-teal/15 flex items-center justify-center flex-shrink-0 mt-1">
                <p.icon className="text-brand-teal" size={20} />
              </div>
              <div>
                <div className="font-lato text-brand-teal text-3xl font-bold leading-none">
                  {p.value}
                </div>
                <div className="font-lato text-white text-xs font-bold uppercase tracking-wider mt-1.5 mb-1">
                  {p.label}
                </div>
                <div className="font-lato text-white/55 text-sm leading-snug">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
