import Link from 'next/link'
import { Plus, Pencil, Image as ImageIcon } from 'lucide-react'
import { getAllPackages } from '@/lib/data/packages'
import DeletePackageButton from './_components/DeletePackageButton'
import ToggleActivePackage from './_components/ToggleActivePackage'

export const dynamic = 'force-dynamic'

export default async function PackagesAdminPage() {
  const packages = await getAllPackages()

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">Paquetes</h1>
          <p className="font-lato text-brand-gray">
            Gestiona los combos y promociones que aparecen en /paquetes.
          </p>
        </div>
        <Link
          href="/admin/paquetes/nuevo"
          className="inline-flex items-center gap-2 bg-brand-gradient text-white font-lato font-bold px-5 py-3 text-sm tracking-wide hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
        >
          <Plus size={16} />
          Agregar paquete
        </Link>
      </div>

      <div className="bg-white border border-brand-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-surface border-b border-brand-dark/5">
              <th className="text-left px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Paquete
              </th>
              <th className="text-center px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Precio
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
            {packages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center">
                  <p className="font-lato text-brand-gray mb-4">No hay paquetes registrados.</p>
                  <Link
                    href="/admin/paquetes/nuevo"
                    className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-blue font-lato text-sm font-bold underline underline-offset-2"
                  >
                    <Plus size={14} /> Agregar el primer paquete
                  </Link>
                </td>
              </tr>
            )}
            {packages.map((p) => (
              <tr
                key={p.id}
                className="border-b border-brand-surface last:border-b-0 hover:bg-brand-surface/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-brand-surface border border-brand-dark/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="text-brand-gray" size={16} />
                      )}
                    </div>
                    <div>
                      <div className="font-lato font-semibold text-brand-dark text-sm">{p.title}</div>
                      <div className="font-lato text-brand-gray text-xs line-clamp-1 max-w-md">
                        {p.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-lato text-brand-dark/70 text-sm">{p.price || '—'}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-lato text-brand-dark/70 text-sm">{p.display_order}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <ToggleActivePackage id={p.id} active={p.active} />
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/admin/paquetes/${p.id}`}
                      className="inline-flex items-center gap-1.5 text-brand-blue hover:text-brand-dark font-lato text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Pencil size={12} />
                      Editar
                    </Link>
                    <DeletePackageButton id={p.id} title={p.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {packages.length > 0 && (
        <div className="mt-4 font-lato text-xs text-brand-gray">
          Mostrando {packages.length} {packages.length === 1 ? 'paquete' : 'paquetes'}
        </div>
      )}
    </div>
  )
}
