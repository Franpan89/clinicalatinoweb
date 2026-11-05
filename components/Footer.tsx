import Link from 'next/link'
import { Phone, MapPin, Mail, Clock } from 'lucide-react'
import Logo from './Logo'
import SocialIcon from './SocialIcon'
import { getServices } from '@/lib/services'
import { SOCIAL_PLATFORMS } from '@/lib/social'
import { getLocale } from '@/lib/i18n/server'

const es = {
  tagline:
    'Centro médico privado con tecnología de vanguardia y atención humanista. Tu salud es nuestra misión desde 1990.',
  servicesHeading: 'Servicios',
  clinicHeading: 'Clínica',
  contactHeading: 'Contacto',
  clinicLinks: [
    { label: 'Inicio', href: '/' },
    { label: 'Nuestros Médicos', href: '/medicos' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Quiénes Somos', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' },
  ],
  emergency: 'Emergencias 24 horas',
  location: 'Cuenca, Ecuador',
  daysRange: 'Lun – Dom',
  hours: '24 Horas',
  copyright: (year: number) => `© ${year} Clínica Latino. Todos los derechos reservados.`,
  privacy: 'Política de Privacidad',
  terms: 'Términos de Uso',
}

const en: typeof es = {
  tagline:
    'Private medical center with cutting-edge technology and compassionate care. Your health has been our mission since 1990.',
  servicesHeading: 'Services',
  clinicHeading: 'Clinic',
  contactHeading: 'Contact',
  clinicLinks: [
    { label: 'Home', href: '/' },
    { label: 'Our Doctors', href: '/medicos' },
    { label: 'Services', href: '/servicios' },
    { label: 'About Us', href: '/nosotros' },
    { label: 'Contact', href: '/contacto' },
  ],
  emergency: '24-hour emergency care',
  location: 'Cuenca, Ecuador',
  daysRange: 'Mon – Sun',
  hours: '24 Hours',
  copyright: (year: number) => `© ${year} Clínica Latino. All rights reserved.`,
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
}

const COPY = { es, en }

export default function Footer({
  logoUrl,
  socials,
}: {
  logoUrl?: string | null
  socials?: Record<string, string | null>
} = {}) {
  const locale = getLocale()
  const t = COPY[locale]
  const year = new Date().getFullYear()

  // Primeros 9 servicios para el footer, con link a su landing
  const serviceLinks = getServices(locale)
    .slice(0, 9)
    .map((s) => ({
      label: s.title,
      href: `/servicios/${s.slug}`,
    }))

  // Solo redes con URL configurada
  const activeSocials = SOCIAL_PLATFORMS.filter((p) => socials?.[p.key]).map((p) => ({
    ...p,
    href: socials![p.key] as string,
  }))

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
              {t.tagline}
            </p>
            {activeSocials.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {activeSocials.map((s) => (
                  <a
                    key={s.key}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 border border-white/15 hover:border-gold flex items-center justify-center text-white/35 hover:text-gold transition-all duration-200"
                  >
                    <SocialIcon platform={s.key} size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-outfit text-white/80 font-semibold uppercase tracking-widest text-xs mb-6">
              {t.servicesHeading}
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
              {t.clinicHeading}
            </h4>
            <ul className="space-y-2.5">
              {t.clinicLinks.map((link) => (
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
              {t.contactHeading}
            </h4>
            <div className="space-y-5">
              <a href="tel:+59372846666" className="flex items-start gap-3 group">
                <Phone className="text-gold flex-shrink-0 mt-0.5" size={15} />
                <div>
                  <div className="font-outfit text-white/60 group-hover:text-gold text-sm transition-colors">+593 72 846-666</div>
                  <div className="font-outfit text-white/25 text-xs mt-0.5">{t.emergency}</div>
                </div>
              </a>
              <a
                href="https://maps.google.com/?q=Clínica+Latino+Cuenca+Ecuador"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MapPin className="text-gold flex-shrink-0 mt-0.5" size={15} />
                <div className="font-outfit text-white/60 group-hover:text-gold text-sm transition-colors">{t.location}</div>
              </a>
              <div className="flex items-start gap-3">
                <Clock className="text-gold flex-shrink-0 mt-0.5" size={15} />
                <div>
                  <div className="font-outfit text-white/60 text-sm">{t.daysRange}</div>
                  <div className="font-outfit text-gold text-sm font-semibold">{t.hours}</div>
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
            {t.copyright(year)}
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-outfit text-white/20 hover:text-white/40 text-xs transition-colors">
              {t.privacy}
            </a>
            <a href="#" className="font-outfit text-white/20 hover:text-white/40 text-xs transition-colors">
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
