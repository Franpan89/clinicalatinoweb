import Link from 'next/link'
import { Users, Plus, ArrowRight, Activity, Layers, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = createClient()

  const [
    { count: totalDoctors },
    { count: activeDoctors },
    { count: totalSpecialties },
    { count: totalAppointments },
    { count: pendingAppointments },
  ] = await Promise.all([
    supabase.from('doctors').select('*', { count: 'exact', head: true }),
    supabase.from('doctors').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('specialties').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('appointments').select('*', { count: 'exact', head: true }),
    supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending'),
  ])

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">Dashboard</h1>
        <p className="font-lato text-brand-gray">
          Resumen general del contenido del sitio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        <StatCard
          label="Médicos activos"
          value={activeDoctors ?? 0}
          total={totalDoctors ?? 0}
          icon={<Users size={20} />}
          accent
        />
        <StatCard
          label="Especialidades"
          value={totalSpecialties ?? 0}
          icon={<Layers size={20} />}
        />
        <StatCard
          label="Citas totales"
          value={totalAppointments ?? 0}
          icon={<Activity size={20} />}
        />
        <StatCard
          label="Citas pendientes"
          value={pendingAppointments ?? 0}
          icon={<Activity size={20} />}
          warning={Boolean(pendingAppointments && pendingAppointments > 0)}
        />
      </div>

      <h2 className="font-lato text-brand-dark text-xl font-bold mb-4">
        Acciones rápidas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <QuickAction
          href="/admin/doctores"
          title="Gestionar Médicos"
          desc="Agregar, editar o eliminar médicos del equipo. Subir fotos y actualizar credenciales."
        />
        <QuickAction
          href="/admin/doctores/nuevo"
          title="Agregar Nuevo Médico"
          desc="Crear el perfil de un nuevo especialista con toda su información profesional."
          icon={<Plus size={18} />}
        />
        <QuickAction
          href="/admin/especialidades"
          title="Gestionar Especialidades"
          desc="Crear, editar o desactivar especialidades médicas. Personalizar íconos y colores."
          icon={<Layers size={18} />}
        />
        <QuickAction
          href="/admin/especialidades/nuevo"
          title="Nueva Especialidad"
          desc="Agregar una nueva área médica al catálogo del sitio."
          icon={<Plus size={18} />}
        />
        <QuickAction
          href="/admin/configuracion"
          title="Configuración del sitio"
          desc="Mapa de Google, dirección textual y otros ajustes generales del sitio público."
          icon={<Settings size={18} />}
        />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  total,
  icon,
  accent = false,
  warning = false,
}: {
  label: string
  value: number
  total?: number
  icon: React.ReactNode
  accent?: boolean
  warning?: boolean
}) {
  return (
    <div className="bg-white p-6 border border-brand-surface">
      <div className="flex items-start justify-between mb-3">
        <span className="font-lato text-xs font-bold text-brand-gray uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`w-9 h-9 flex items-center justify-center ${
            accent
              ? 'bg-brand-teal/10 text-brand-teal'
              : warning
                ? 'bg-amber-100 text-amber-700'
                : 'bg-brand-surface text-brand-blue'
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <div
          className={`font-lato font-semibold text-4xl ${
            accent ? 'text-brand-gradient' : 'text-brand-dark'
          }`}
        >
          {value}
        </div>
        {total !== undefined && total !== value && (
          <div className="font-lato text-sm text-brand-gray">/ {total}</div>
        )}
      </div>
    </div>
  )
}

function QuickAction({
  href,
  title,
  desc,
  icon,
}: {
  href: string
  title: string
  desc: string
  icon?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="group bg-white p-6 border border-brand-surface hover:border-brand-teal/40 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 flex items-start gap-4"
    >
      <div className="w-10 h-10 bg-brand-gradient flex items-center justify-center text-white flex-shrink-0">
        {icon ?? <Users size={18} />}
      </div>
      <div className="flex-1">
        <h3 className="font-lato text-brand-dark font-bold text-lg mb-1">{title}</h3>
        <p className="font-lato text-brand-gray text-sm leading-relaxed">{desc}</p>
      </div>
      <ArrowRight
        size={18}
        className="text-brand-teal mt-1 flex-shrink-0 transition-transform group-hover:translate-x-1"
      />
    </Link>
  )
}
