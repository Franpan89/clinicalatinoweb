import Link from 'next/link'
import { LogOut, Users, Calendar, Home as HomeIcon, Layers, Settings, Image as ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getSiteSettings } from '@/lib/data/settings'
import { signOut } from './actions'
import Logo from '@/components/Logo'

export const metadata = {
  title: 'Admin · Clínica Latino',
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const [{ data: { user } }, settings] = await Promise.all([
    supabase.auth.getUser(),
    getSiteSettings(),
  ])

  // El middleware ya redirige si no hay sesión, pero por defensa:
  // si estamos en /admin/login, no mostramos sidebar
  return (
    <div className="min-h-screen bg-brand-surface">
      {user && (
        <header className="bg-white border-b border-brand-surface sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between py-4">
            <Link href="/admin" className="flex items-center gap-3">
              <Logo size={36} src={settings.logo_url} />
              <div>
                <div className="font-lato font-bold text-brand-dark text-sm">
                  Clínica Latino
                </div>
                <div className="font-lato text-[10px] tracking-[0.25em] uppercase text-brand-gray">
                  Panel de Administración
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/admin" icon={<HomeIcon size={15} />} label="Dashboard" />
              <NavLink
                href="/admin/doctores"
                icon={<Users size={15} />}
                label="Médicos"
              />
              <NavLink
                href="/admin/especialidades"
                icon={<Layers size={15} />}
                label="Especialidades"
              />
              <NavLink
                href="/admin/medios"
                icon={<ImageIcon size={15} />}
                label="Medios"
              />
              <NavLink
                href="/admin/configuracion"
                icon={<Settings size={15} />}
                label="Configuración"
              />
              <NavLink
                href="/"
                icon={<Calendar size={15} />}
                label="Ver sitio"
                external
              />
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="font-lato text-xs text-brand-gray">Sesión activa</div>
                <div className="font-lato text-sm text-brand-dark font-semibold">
                  {user.email}
                </div>
              </div>
              <form action={signOut}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-brand-gray hover:text-red-600 transition-colors p-2"
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline font-lato text-sm">Salir</span>
                </button>
              </form>
            </div>
          </div>
        </header>
      )}

      <main>{children}</main>
    </div>
  )
}

function NavLink({
  href,
  icon,
  label,
  external = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  external?: boolean
}) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className="inline-flex items-center gap-2 px-4 py-2 font-lato text-sm font-medium text-brand-dark/70 hover:text-brand-blue hover:bg-brand-surface transition-colors"
    >
      {icon}
      {label}
    </Link>
  )
}
