/**
 * Detecta si una URL apunta a un video o a una imagen.
 * - .mp4, .webm, .mov, .ogg → video file
 * - youtube.com, youtu.be, vimeo.com → video embed
 * - todo lo demás → image
 */
export function inferMediaType(url: string | null | undefined): 'image' | 'video' {
  if (!url) return 'image'
  if (/\.(mp4|webm|mov|ogg)(\?|$)/i.test(url)) return 'video'
  if (/youtube\.com|youtu\.be|vimeo\.com/i.test(url)) return 'video'
  return 'image'
}

/**
 * Determina si una URL es un embed iframe (YouTube/Vimeo) o un archivo de video directo.
 */
export function isVideoEmbed(url: string | null | undefined): boolean {
  if (!url) return false
  return /youtube\.com|youtu\.be|vimeo\.com/i.test(url)
}

/**
 * Convierte cualquier URL de YouTube o Vimeo al formato embed que permite iframe.
 * - youtube.com/watch?v=ID → youtube.com/embed/ID
 * - youtu.be/ID            → youtube.com/embed/ID
 * - vimeo.com/ID           → player.vimeo.com/video/ID
 * - ya es embed            → sin cambios
 */
export function toEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null

  // YouTube watch URL
  const ytWatch = url.match(/youtube\.com\/watch\?(?:.*&)?v=([\w-]+)/i)
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`

  // YouTube short URL
  const ytShort = url.match(/youtu\.be\/([\w-]+)/i)
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`

  // Vimeo
  const vimeo = url.match(/vimeo\.com\/(\d+)/i)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

  // Ya es embed u otra URL → devuelve tal cual
  return url
}

/**
 * Acepta un iframe HTML completo o solo la URL y devuelve la URL limpia.
 * Si el input no parece una URL válida de Google Maps, devuelve null.
 *
 * Helper puro (sin imports server-only) — seguro para client components.
 */
export function extractMapUrl(input: string | null | undefined): string | null {
  if (!input) return null
  const trimmed = input.trim()
  if (!trimmed) return null

  // Si es iframe HTML, extrae el src
  if (trimmed.startsWith('<')) {
    const match = trimmed.match(/src=["']([^"']+)["']/i)
    if (!match) return null
    return match[1].trim()
  }

  // Si ya parece una URL
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  return null
}
