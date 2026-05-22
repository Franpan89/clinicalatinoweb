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
    value: '+30',
    label: 'Años de Experiencia',
    desc: 'Décadas de excelencia en medicina privada',
  },
  {
    icon: Stethoscope,
    value: '15+',
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
    <section className="bg-cream-dark py-14 border-b border-gold/15">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gold/20">
          {pillars.map((p, i) => (
            <div key={i} className="flex items-start gap-4 px-8 py-6 first:pl-0 last:pr-0">
              <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                <p.icon className="text-gold" size={20} />
              </div>
              <div>
                <div className="font-cormorant text-navy text-3xl font-semibold leading-none">
                  {p.value}
                </div>
                <div className="font-outfit text-navy text-xs font-semibold uppercase tracking-wider mt-1.5 mb-1">
                  {p.label}
                </div>
                <div className="font-outfit text-gray-500 text-sm leading-snug">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
