import { updateSession } from './lib/supabase/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Solo ejecuta el middleware en rutas /admin — el sitio público no necesita
  // refresco de sesión y así evitamos crashes en Edge para todas las páginas.
  matcher: ['/admin/:path*'],
}
