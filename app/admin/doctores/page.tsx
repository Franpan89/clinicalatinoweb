import Link from 'next/link'
import { Plus, Pencil, Search } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getInitials } from '@/lib/doctors'
import { getAllSpecialties } from '@/lib/data/specialties'
import DeleteDoctorButton from './_components/DeleteDoctorButton'
import ToggleActiveButton from './_components/ToggleActiveButton'

export const dynamic = 'force-dynamic'

export default async function DoctorsAdminPage({
  searchParams,
}: {
  searchParams: { q?: string; specialty?: string }
}) {
  const supabase = createClient()

  let query = supabase
    .from('doctors')
    .select('*')
    .order('display_order', { ascending: true })

  if (searchParams.specialty) {
    query = query.eq('specialty', searchParams.specialty)
  }
  if (searchParams.q) {
    query = query.ilike('full_name', `%${searchParams.q}%`)
  }

  const [{ data }, specialties] = await Promise.all([query, getAllSpecialties()])
  const doctors = data ?? []

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">Médicos</h1>
          <p className="font-lato text-brand-gray">
            Gestiona el equipo médico que aparece en el sitio público.
          </p>
        </div>
        <Link
          href="/admin/doctores/nuevo"
          className="inline-flex items-center gap-2 bg-brand-gradient text-white font-lato font-bold px-5 py-3 text-sm tracking-wide hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
        >
          <Plus size={16} />
          Agregar médico
        </Link>
      </div>

      <form className="bg-white p-4 mb-6 border border-brand-surface flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray"
          />
          <input
            type="search"
            name="q"
            defaultValue={searchParams.q ?? ''}
            placeholder="Buscar por nombre..."
            className="w-full border border-brand-dark/10 focus:border-brand-teal focus:outline-none pl-10 pr-4 py-2.5 font-lato text-sm transition-colors"
          />
        </div>
        <select
          name="specialty"
          defaultValue={searchParams.specialty ?? ''}
          className="border border-brand-dark/10 focus:border-brand-teal focus:outline-none px-4 py-2.5 font-lato text-sm bg-white"
        >
          <option value="">Todas las especialidades</option>
          {specialties.map((s) => (
            <option key={s.id} value={s.slug}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-brand-dark text-white font-lato font-bold px-5 py-2.5 text-sm tracking-wide hover:bg-brand-blue transition-colors"
        >
          Filtrar
        </button>
        {(searchParams.q || searchParams.specialty) && (
          <Link
            href="/admin/doctores"
            className="text-brand-gray hover:text-brand-dark font-lato text-sm transition-colors px-2"
          >
            Limpiar
          </Link>
        )}
      </form>

      <div className="bg-white border border-brand-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-surface border-b border-brand-dark/5">
              <th className="text-left px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Médico
              </th>
              <th className="text-left px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray hidden md:table-cell">
                Especialidad
              </th>
              <th className="text-left px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray hidden lg:table-cell">
                Experiencia
              </th>
              <th className="text-center px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Estado
              </th>
              <th className="text-right px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center">
                  <p className="font-lato text-brand-gray mb-4">
                    No hay médicos registrados todavía.
                  </p>
                  <Link
                    href="/admin/doctores/nuevo"
                    className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-blue font-lato text-sm font-bold underline underline-offset-2"
                  >
                    <Plus size={14} /> Agregar el primer médico
                  </Link>
                </td>
              </tr>
            )}
            {doctors.map((d) => (
              <tr
                key={d.id}
                className="border-b border-brand-surface last:border-b-0 hover:bg-brand-surface/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {d.photo_url ? (
                      <img
                        src={d.photo_url}
                        alt={d.full_name}
                        className="w-10 h-10 object-cover rounded-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-brand-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {getInitials(d.full_name)}
                      </div>
                    )}
                    <div>
                      <div className="font-lato font-semibold text-brand-dark text-sm">
                        {d.full_name}
                      </div>
                      <div className="font-lato text-brand-gray text-xs">
                        {d.subspecialty}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="inline-block bg-brand-teal/10 text-brand-teal font-lato text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                    {d.specialty_label}
                  </span>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <span className="font-lato text-brand-dark/70 text-sm">
                    {d.experience}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <ToggleActiveButton id={d.id} active={d.active} />
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/admin/doctores/${d.id}`}
                      className="inline-flex items-center gap-1.5 text-brand-blue hover:text-brand-dark font-lato text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Pencil size={12} />
                      Editar
                    </Link>
                    <DeleteDoctorButton id={d.id} name={d.full_name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {doctors.length > 0 && (
        <div className="mt-4 font-lato text-xs text-brand-gray">
          Mostrando {doctors.length} {doctors.length === 1 ? 'médico' : 'médicos'}
        </div>
      )}
    </div>
  )
}
