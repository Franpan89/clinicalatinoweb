import Link from 'next/link'
import { Plus, Pencil, ShieldCheck } from 'lucide-react'
import { getAllInsuranceLogos } from '@/lib/data/insurance'
import DeleteInsuranceLogoButton from './_components/DeleteInsuranceLogoButton'
import ToggleInsuranceLogoActive from './_components/ToggleInsuranceLogoActive'

export const dynamic = 'force-dynamic'

export default async function InsuranceLogosAdminPage() {
  const logos = await getAllInsuranceLogos()

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">
            Aseguradoras
          </h1>
          <p className="font-lato text-brand-gray">
            Logos de las aseguradoras aliadas que aparecen en el slider del home.
          </p>
        </div>
        <Link
          href="/admin/aseguradoras/nuevo"
          className="inline-flex items-center gap-2 bg-brand-gradient text-white font-lato font-bold px-5 py-3 text-sm tracking-wide hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
        >
          <Plus size={16} />
          Agregar aseguradora
        </Link>
      </div>

      <div className="bg-white border border-brand-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-surface border-b border-brand-dark/5">
              <th className="text-left px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Aseguradora
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
            {logos.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-16 text-center">
                  <p className="font-lato text-brand-gray mb-4">
                    No hay aseguradoras registradas.
                  </p>
                  <Link
                    href="/admin/aseguradoras/nuevo"
                    className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-blue font-lato text-sm font-bold underline underline-offset-2"
                  >
                    <Plus size={14} /> Agregar la primera aseguradora
                  </Link>
                </td>
              </tr>
            )}
            {logos.map((l) => (
              <tr
                key={l.id}
                className="border-b border-brand-surface last:border-b-0 hover:bg-brand-surface/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-10 bg-brand-surface border border-brand-dark/5 flex items-center justify-center flex-shrink-0">
                      {l.logo_url ? (
                        <img src={l.logo_url} alt={l.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <ShieldCheck className="text-brand-gray" size={16} />
                      )}
                    </div>
                    <div className="font-lato font-semibold text-brand-dark text-sm">
                      {l.name}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-lato text-brand-dark/70 text-sm">
                    {l.display_order}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <ToggleInsuranceLogoActive id={l.id} active={l.active} />
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/admin/aseguradoras/${l.id}`}
                      className="inline-flex items-center gap-1.5 text-brand-blue hover:text-brand-dark font-lato text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Pencil size={12} />
                      Editar
                    </Link>
                    <DeleteInsuranceLogoButton id={l.id} name={l.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {logos.length > 0 && (
        <div className="mt-4 font-lato text-xs text-brand-gray">
          Mostrando {logos.length} {logos.length === 1 ? 'aseguradora' : 'aseguradoras'}
        </div>
      )}
    </div>
  )
}
