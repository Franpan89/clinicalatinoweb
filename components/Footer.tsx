import Link from 'next/link'
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react'
import Logo from './Logo'
import { SERVICES } from '@/lib/services'

// Primeros 9 servicios para el footer, con link a su landing
const serviceLinks = SERVICES.slice(0, 9).map((s) => ({
  label: s.title,
  href: `/servicios/${s.slug}`,
}))

const clinicLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nuestros Médicos', href: '/medicos' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Quiénes Somos', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
]

export default function Footer({ logoUrl }: { logoUrl?: string | null } = {}) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-dark pt-16 pb-8">
      <div className="container mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center mb-6">
              <Logo size={56} src={logoUrl} />
            </a>
            <p className="font-outfit text-white/35 text-sm leading-relaxed mb-7">
              Centro médico privado con tecnología de vanguardia y atención humanista.
              Tu salud es nuestra misión desde 1990.
            </p>
            <div className="flex gap-2.5">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-white/15 hover:border-gold flex items-center justify-center text-white/35 hover:text-gold transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-outfit text-white/80 font-semibold uppercase tracking-widest text-xs mb-6">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-outfit text-white/35 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold/40 rounded-full group-hover:bg-gold transition-colors flex-shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div>
            <h4 className="font-outfit text-white/80 font-semibold uppercase tracking-widest text-xs mb-6">
              Clínica
            </h4>
            <ul className="space-y-2.5">
              {clinicLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-outfit text-white/35 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gold/40 rounded-full group-hover:bg-gold transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-outfit text-white/80 font-semibold uppercase tracking-widest text-xs mb-6">
              Contacto
            </h4>
            <div className="space-y-5">
              <a href="tel:+59372846666" className="flex items-start gap-3 group">
                <Phone className="text-gold flex-shrink-0 mt-0.5" size={15} />
                <div>
                  <div className="font-outfit text-white/60 group-hover:text-gold text-sm transition-colors">+593 72 846-666</div>
                  <div className="font-outfit text-white/25 text-xs mt-0.5">Emergencias 24 horas</div>
                </div>
              </a>
              <a
                href="https://maps.google.com/?q=Clínica+Latino+Cuenca+Ecuador"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MapPin className="text-gold flex-shrink-0 mt-0.5" size={15} />
                <div className="font-outfit text-white/60 group-hover:text-gold text-sm transition-colors">Cuenca, Ecuador</div>
              </a>
              <div className="flex items-start gap-3">
                <Clock className="text-gold flex-shrink-0 mt-0.5" size={15} />
                <div>
                  <div className="font-outfit text-white/60 text-sm">Lun – Dom</div>
                  <div className="font-outfit text-gold text-sm font-semibold">24 Horas</div>
                </div>
              </div>
              <a href="mailto:info@clinicalatino.med.ec" className="flex items-start gap-3 group">
                <Mail className="text-gold flex-shrink-0 mt-0.5" size={15} />
                <div className="font-outfit text-white/60 group-hover:text-gold text-sm transition-colors">
                  info@clinicalatino.med.ec
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Gold separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-outfit text-white/25 text-xs">
            © {year} Clínica Latino. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-outfit text-white/20 hover:text-white/40 text-xs transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="font-outfit text-white/20 hover:text-white/40 text-xs transition-colors">
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
