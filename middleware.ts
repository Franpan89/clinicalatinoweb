import { updateSession } from './lib/supabase/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // /admin/:path* → sesión de admin. El resto (excepto assets estáticos) pasa
  // por el chequeo de modo mantenimiento — ver lib/supabase/middleware.ts.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)'],
}
