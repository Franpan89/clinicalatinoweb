import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getAllSpecialties } from '@/lib/data/specialties'
import DeleteSpecialtyButton from './_components/DeleteSpecialtyButton'
import ToggleSpecialtyActive from './_components/ToggleSpecialtyActive'
import SpecialtyIcon from './_components/SpecialtyIcon'

export const dynamic = 'force-dynamic'

export default async function SpecialtiesAdminPage() {
  const supabase = createClient()
  const specialties = await getAllSpecialties()

  // Conteo de médicos por especialidad
  const { data: counts } = await supabase
    .from('doctors')
    .select('specialty')

  const doctorCounts: Record<string, number> = {}
  for (const d of counts ?? []) {
    doctorCounts[d.specialty] = (doctorCounts[d.specialty] ?? 0) + 1
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
            Especialidades
          </h1>
          <p className="font-lato text-brand-gray">
            Define las áreas médicas que aparecen en el sitio y se usan para clasificar
            a los médicos.
          </p>
        </div>
        <Link
          href="/admin/especialidades/nuevo"
          className="inline-flex items-center gap-2 bg-brand-gradient text-white font-lato font-bold px-5 py-3 text-sm tracking-wide hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
        >
          <Plus size={16} />
          Agregar especialidad
        </Link>
      </div>

      <div className="bg-white border border-brand-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-surface border-b border-brand-dark/5">
              <th className="text-left px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Especialidad
              </th>
              <th className="text-left px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray hidden lg:table-cell">
                Slug
              </th>
              <th className="text-center px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Médicos
              </th>
              <th className="text-center px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Orden
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
            {specialties.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <p className="font-lato text-brand-gray mb-4">
                    No hay especialidades registradas.
                  </p>
                  <Link
                    href="/admin/especialidades/nuevo"
                    className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-blue font-lato text-sm font-bold underline underline-offset-2"
                  >
                    <Plus size={14} /> Agregar la primera especialidad
                  </Link>
                </td>
              </tr>
            )}
            {specialties.map((s) => {
              const count = doctorCounts[s.slug] ?? 0
              return (
                <tr
                  key={s.id}
                  className="border-b border-brand-surface last:border-b-0 hover:bg-brand-surface/30 transition-colors"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${s.color_class} flex items-center justify-center flex-shrink-0`}
                      >
                        <SpecialtyIcon name={s.icon} className="text-white" size={18} />
                      </div>
                      <div>
                        <div className="font-lato font-semibold text-brand-dark text-sm">
                          {s.label}
                        </div>
                        <div className="font-lato text-brand-gray text-xs line-clamp-1 max-w-md">
                          {s.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <code className="font-lato text-xs text-brand-gray bg-brand-surface px-2 py-0.5">
                      {s.slug}
                    </code>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-block font-lato text-xs font-bold px-2 py-1 ${
                        count > 0
                          ? 'bg-brand-teal/10 text-brand-teal'
                          : 'bg-brand-surface text-brand-gray'
                      }`}
                    >
                      {count}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-lato text-brand-dark/70 text-sm">
                      {s.display_order}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <ToggleSpecialtyActive id={s.id} active={s.active} />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/especialidades/${s.id}`}
                        className="inline-flex items-center gap-1.5 text-brand-blue hover:text-brand-dark font-lato text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <Pencil size={12} />
                        Editar
                      </Link>
                      <DeleteSpecialtyButton
                        id={s.id}
                        name={s.label}
                        doctorCount={count}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {specialties.length > 0 && (
        <div className="mt-4 font-lato text-xs text-brand-gray">
          Mostrando {specialties.length}{' '}
          {specialties.length === 1 ? 'especialidad' : 'especialidades'}
        </div>
      )}
    </div>
  )
}
