'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import Logo from './Logo'
import LanguageToggle from './LanguageToggle'
import { useLocale } from './LocaleProvider'
import { getServices } from '@/lib/services'

type ChildLink = { label: string; href: string }

type NavItem = {
  label: string
  href: string
  children?: ChildLink[]
}

const es = {
  home: 'Inicio',
  doctors: 'Nuestros Médicos',
  services: 'Servicios',
  about: 'Quiénes Somos',
  packages: 'Paquetes',
  news: 'Noticias',
  contact: 'Contacto',
  menu: 'Menú',
  emergencies: 'Emergencias:',
}

const en: typeof es = {
  home: 'Home',
  doctors: 'Our Doctors',
  services: 'Services',
  about: 'About Us',
  packages: 'Packages',
  news: 'News',
  contact: 'Contact',
  menu: 'Menu',
  emergencies: 'Emergencies:',
}

const COPY = { es, en }

export default function Navigation({ logoUrl }: { logoUrl?: string | null } = {}) {
  const locale = useLocale()
  const t = COPY[locale]

  const navLinks: NavItem[] = [
    { label: t.home, href: '/' },
    { label: t.doctors, href: '/medicos' },
    {
      label: t.services,
      href: '/servicios',
      children: getServices(locale).map((s) => ({
        label: s.title,
        href: `/servicios/${s.slug}`,
      })),
    },
    { label: t.about, href: '/nosotros' },
    { label: t.packages, href: '/paquetes' },
    { label: t.news, href: '/noticias' },
    { label: t.contact, href: '/contacto' },
  ]

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-white/90 backdrop-blur-md py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <Logo size={52} src={logoUrl} />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className="flex items-center gap-1 text-brand-dark/75 hover:text-brand-blue font-lato text-sm font-medium tracking-wide transition-colors py-2"
              >
                {link.label}
                {link.children && <ChevronDown size={14} className="opacity-60" />}
              </a>

              {link.children && activeDropdown === link.label && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 bg-white border border-brand-surface shadow-xl py-2 min-w-[260px]"
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-5 py-2.5 text-brand-dark/70 hover:text-brand-blue hover:bg-brand-surface font-lato text-sm transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Language + Emergency CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageToggle />
          <a
            href="tel:+59372846666"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 font-lato text-sm font-bold transition-all duration-200 hover:shadow-lg rounded-sm"
          >
            <Phone size={15} />
            <span>072 846-666</span>
            <span className="text-red-200 text-xs font-normal">24/7</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-brand-dark p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t.menu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-brand-surface overflow-hidden"
          >
            <div className="container mx-auto py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-brand-dark/80 hover:text-brand-blue font-lato text-sm py-3 border-b border-brand-surface last:border-0 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <LanguageToggle className="mt-4" />
              <a
                href="tel:+59372846666"
                className="flex items-center gap-2 text-red-600 font-lato text-sm py-4 font-bold"
              >
                <Phone size={16} />
                {t.emergencies} +593 72 846-666
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
