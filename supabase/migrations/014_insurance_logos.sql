-- ====================================================
-- Clínica Latino — Aseguradoras (logos)
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

create table if not exists public.insurance_logos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  name text not null,
  logo_url text,
  display_order int not null default 0,
  active boolean not null default true
);

create index if not exists insurance_logos_active_idx on public.insurance_logos (active);
create index if not exists insurance_logos_display_order_idx on public.insurance_logos (display_order);

drop trigger if exists insurance_logos_set_updated_at on public.insurance_logos;
create trigger insurance_logos_set_updated_at
  before update on public.insurance_logos
  for each row execute function public.set_updated_at();

alter table public.insurance_logos enable row level security;

drop policy if exists "Public read active insurance logos" on public.insurance_logos;
create policy "Public read active insurance logos"
  on public.insurance_logos for select
  to anon
  using (active = true);

drop policy if exists "Authenticated full access insurance logos" on public.insurance_logos;
create policy "Authenticated full access insurance logos"
  on public.insurance_logos for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('insurance-logos', 'insurance-logos', true)
on conflict (id) do nothing;

drop policy if exists "Public read insurance logos bucket" on storage.objects;
create policy "Public read insurance logos bucket"
  on storage.objects for select
  to anon
  using (bucket_id = 'insurance-logos');

drop policy if exists "Authenticated upload insurance logos" on storage.objects;
create policy "Authenticated upload insurance logos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'insurance-logos');

drop policy if exists "Authenticated update insurance logos" on storage.objects;
create policy "Authenticated update insurance logos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'insurance-logos');

drop policy if exists "Authenticated delete insurance logos" on storage.objects;
create policy "Authenticated delete insurance logos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'insurance-logos');
