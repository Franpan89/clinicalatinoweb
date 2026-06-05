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
