import Link from 'next/link'
import { Plus, Pencil, Image as ImageIcon } from 'lucide-react'
import { getAllNews } from '@/lib/data/news'
import DeleteNewsButton from './_components/DeleteNewsButton'
import ToggleNewsActive from './_components/ToggleNewsActive'

export const dynamic = 'force-dynamic'

export default async function NewsAdminPage() {
  const news = await getAllNews()

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-lato text-brand-dark text-3xl font-bold mb-2">Noticias</h1>
          <p className="font-lato text-brand-gray">
            Gestiona las noticias y novedades que aparecen en /noticias.
          </p>
        </div>
        <Link
          href="/admin/noticias/nuevo"
          className="inline-flex items-center gap-2 bg-brand-gradient text-white font-lato font-bold px-5 py-3 text-sm tracking-wide hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
        >
          <Plus size={16} />
          Agregar noticia
        </Link>
      </div>

      <div className="bg-white border border-brand-surface overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-surface border-b border-brand-dark/5">
              <th className="text-left px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Noticia
              </th>
              <th className="text-center px-4 py-3 font-lato text-[11px] uppercase tracking-wider font-bold text-brand-gray">
                Publicación
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
            {news.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-16 text-center">
                  <p className="font-lato text-brand-gray mb-4">No hay noticias registradas.</p>
                  <Link
                    href="/admin/noticias/nuevo"
                    className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-blue font-lato text-sm font-bold underline underline-offset-2"
                  >
                    <Plus size={14} /> Agregar la primera noticia
                  </Link>
                </td>
              </tr>
            )}
            {news.map((n) => (
              <tr
                key={n.id}
                className="border-b border-brand-surface last:border-b-0 hover:bg-brand-surface/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 bg-brand-surface border border-brand-dark/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {n.cover_image_url ? (
                        <img src={n.cover_image_url} alt={n.title} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="text-brand-gray" size={16} />
                      )}
                    </div>
                    <div>
                      <div className="font-lato font-semibold text-brand-dark text-sm">{n.title}</div>
                      <div className="font-lato text-brand-gray text-xs line-clamp-1 max-w-md">
                        {n.excerpt}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="font-lato text-brand-dark/70 text-sm">
                    {new Date(n.published_at + 'T00:00:00').toLocaleDateString('es-EC')}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <ToggleNewsActive id={n.id} active={n.active} />
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link
                      href={`/admin/noticias/${n.id}`}
                      className="inline-flex items-center gap-1.5 text-brand-blue hover:text-brand-dark font-lato text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <Pencil size={12} />
                      Editar
                    </Link>
                    <DeleteNewsButton id={n.id} title={n.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {news.length > 0 && (
        <div className="mt-4 font-lato text-xs text-brand-gray">
          Mostrando {news.length} {news.length === 1 ? 'noticia' : 'noticias'}
        </div>
      )}
    </div>
  )
}
