# Configuración del Panel de Administración

Guía paso a paso para activar el panel de administración de médicos.

## 1 · Variables de entorno

Crea `.env.local` en la raíz del proyecto (copia desde `.env.example`):

```bash
cp .env.example .env.local
```

Llena con las credenciales de tu proyecto Supabase. Las encuentras en
**Dashboard → Settings → API**:

| Variable | Dónde está en Supabase |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project API keys → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | Project API keys → `service_role` `secret` |

## 2 · Aplicar las migraciones SQL

En el SQL Editor de Supabase, ejecuta **en orden**:

1. `supabase/migrations/001_initial_schema.sql` — tablas y políticas iniciales
2. `supabase/migrations/002_doctors_admin.sql` — schema final de doctores + Storage + seed de 14 médicos

> Si ya corriste 001, puedes correr 002 directo (recrea la tabla `doctors` con DROP TABLE CASCADE).

## 3 · Crear el primer usuario admin

En Supabase Dashboard:

1. Ve a **Authentication → Users**
2. Click **"Add user"** → **"Create new user"**
3. Email: `admin@clinicalatino.med.ec` (o el que prefieras)
4. Password: una contraseña fuerte
5. **Marca "Auto Confirm User"** para no requerir verificación por email

> Para agregar más admins en el futuro: simplemente crea más usuarios desde el Dashboard.
> No hay diferenciación de roles — cualquier usuario autenticado tiene acceso completo
> al panel. Si quieres restringir más, ajusta las RLS policies en `002_doctors_admin.sql`.

## 4 · Reinicia el servidor

```bash
npm run dev
```

## 5 · Accede al panel

- **Sitio público:** http://localhost:3000
- **Panel admin:** http://localhost:3000/admin/login
- Ingresa con el email y contraseña creados en el paso 3

## Rutas del admin

| Ruta | Función |
|---|---|
| `/admin/login` | Login |
| `/admin` | Dashboard con stats |
| `/admin/doctores` | Listado, búsqueda, filtro por especialidad, toggle activo, eliminar |
| `/admin/doctores/nuevo` | Crear médico nuevo |
| `/admin/doctores/[id]` | Editar médico existente |

## Permisos / RLS

- **Lectura pública:** anónimos solo ven médicos con `active = true`
- **Escritura:** solo usuarios autenticados pueden crear, editar, eliminar
- **Fotos en Storage:** lectura pública, escritura autenticada

## Cómo funciona el flujo de fotos

1. El admin sube una foto desde el form (drag & drop o click)
2. Se valida (máx. 5MB · JPG/PNG/WebP)
3. Server Action sube a Supabase Storage bucket `doctor-photos`
4. La URL pública se guarda en `doctors.photo_url`
5. La sección pública renderiza la foto; si no hay, usa avatar con iniciales sobre el gradiente de marca

## Solución de problemas

**`Error: Your project's URL and Key are required`**
→ Falta `.env.local` o las variables están vacías. Verifica el paso 1.

**`Credenciales inválidas`**
→ Usuario no existe o contraseña incorrecta. Crea uno desde Authentication → Users.

**`No se pudo subir la foto`**
→ El bucket `doctor-photos` no existe o no tiene las políticas correctas. Re-ejecuta `002_doctors_admin.sql`.

**El sitio público muestra "No hay médicos"**
→ La tabla `doctors` está vacía o las credenciales `NEXT_PUBLIC_*` están mal. Verifica RLS y env vars.
