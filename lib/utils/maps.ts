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
