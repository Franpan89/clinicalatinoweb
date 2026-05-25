import { updateSession } from './lib/supabase/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // Coincide con todo excepto:
    // - _next/static, _next/image, favicon, archivos estáticos públicos
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|logo-icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
