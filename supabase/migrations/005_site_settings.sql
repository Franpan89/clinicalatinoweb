-- ====================================================
-- Clínica Latino — Configuración general del sitio
-- Tabla key/value para settings que el admin puede editar
-- Ejecutar DESPUÉS de 004_doctor_location.sql
-- ====================================================

create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- RLS
alter table public.site_settings enable row level security;

drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings"
  on public.site_settings for select
  to anon
  using (true);

drop policy if exists "Authenticated write site settings" on public.site_settings;
create policy "Authenticated write site settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

-- Seed defaults
insert into public.site_settings (key, value) values
  ('map_embed_url', null),
  ('map_address', 'Cuenca, Ecuador')
on conflict (key) do nothing;
