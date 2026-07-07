-- ====================================================
-- Clínica Latino — Paquetes / Combos
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null unique,
  title text not null,
  description text not null,
  price text not null default '',        -- texto libre: "Desde $120", "Consultar"
  image_url text,
  items text[] not null default '{}',    -- lista de lo incluido
  display_order int not null default 0,
  active boolean not null default true
);

create index if not exists packages_active_idx on public.packages (active);
create index if not exists packages_display_order_idx on public.packages (display_order);

drop trigger if exists packages_set_updated_at on public.packages;
create trigger packages_set_updated_at
  before update on public.packages
  for each row execute function public.set_updated_at();

alter table public.packages enable row level security;

drop policy if exists "Public read active packages" on public.packages;
create policy "Public read active packages"
  on public.packages for select
  to anon
  using (active = true);

drop policy if exists "Authenticated full access packages" on public.packages;
create policy "Authenticated full access packages"
  on public.packages for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('package-images', 'package-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read package images" on storage.objects;
create policy "Public read package images"
  on storage.objects for select
  to anon
  using (bucket_id = 'package-images');

drop policy if exists "Authenticated upload package images" on storage.objects;
create policy "Authenticated upload package images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'package-images');

drop policy if exists "Authenticated update package images" on storage.objects;
create policy "Authenticated update package images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'package-images');

drop policy if exists "Authenticated delete package images" on storage.objects;
create policy "Authenticated delete package images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'package-images');
