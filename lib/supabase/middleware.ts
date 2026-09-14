import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAdminPath = path.startsWith('/admin')

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Sin env vars: /admin redirige al home con mensaje, el resto del sitio sigue público
  if (!url || !anonKey) {
    if (isAdminPath && path !== '/admin/login') {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'
      redirectUrl.searchParams.set('error', 'supabase-not-configured')
      return NextResponse.redirect(redirectUrl)
    }
    return NextResponse.next({ request })
  }

  if (!isAdminPath) {
    return await checkMaintenance(request, url, anonKey)
  }

  let supabaseResponse = NextResponse.next({ request })

  try {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          supabaseResponse = NextResponse.next({ request })
          supabaseResponse.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          supabaseResponse = NextResponse.next({ request })
          supabaseResponse.cookies.set({ name, value: '', ...options })
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Proteger /admin/* (excepto /admin/login) si no hay sesión
    if (path !== '/admin/login' && !user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      redirectUrl.searchParams.set('redirect', path)
      return NextResponse.redirect(redirectUrl)
    }

    // Si está logueado y entra a /admin/login, mandarlo al dashboard
    if (path === '/admin/login' && user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin'
      redirectUrl.search = ''
      return NextResponse.redirect(redirectUrl)
    }

    return supabaseResponse
  } catch (err) {
    // Si Supabase falla (red, env vars inválidas, etc.), no crashees:
    // permite continuar para que el usuario vea su error en la página
    console.error('[middleware] Supabase error:', err)
    return NextResponse.next({ request })
  }
}

/** Gatekeeper del sitio público: si maintenance_mode está activo, reescribe a /mantenimiento. */
async function checkMaintenance(request: NextRequest, url: string, anonKey: string) {
  const path = request.nextUrl.pathname

  // Nunca bloquear la propia página de mantenimiento (evita un bucle de rewrite)
  if (path === '/mantenimiento') {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({ request })

  try {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          supabaseResponse = NextResponse.next({ request })
          supabaseResponse.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          supabaseResponse = NextResponse.next({ request })
          supabaseResponse.cookies.set({ name, value: '', ...options })
        },
      },
    })

    // Un admin con sesión iniciada sigue viendo el sitio real, para poder
    // revisar sus cambios antes de desactivar el mantenimiento.
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) return supabaseResponse

    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'maintenance_mode')
      .maybeSingle()

    if (data?.value === 'true') {
      const maintenanceUrl = request.nextUrl.clone()
      maintenanceUrl.pathname = '/mantenimiento'
      return NextResponse.rewrite(maintenanceUrl)
    }

    return supabaseResponse
  } catch (err) {
    // Si falla la consulta, dejamos pasar: preferible un sitio activo
    // a uno bloqueado por un error de red/BD.
    console.error('[middleware] Maintenance check failed:', err)
    return NextResponse.next({ request })
  }
}
