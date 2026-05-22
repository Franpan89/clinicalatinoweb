-- ====================================================
-- Clínica Latino — Especialidades dinámicas + horario estructurado
-- Ejecutar DESPUÉS de 002_doctors_admin.sql en Supabase SQL Editor
-- ====================================================

-- ── Tabla de especialidades ─────────────────────────────
create table if not exists public.specialties (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null unique,
  label text not null,
  description text not null,
  icon text not null default 'stethoscope',
  color_class text not null default 'from-slate-900 to-slate-800',
  display_order int not null default 0,
  active boolean not null default true
);

create index if not exists specialties_slug_idx on public.specialties (slug);
create index if not exists specialties_active_idx on public.specialties (active);
create index if not exists specialties_display_order_idx on public.specialties (display_order);

-- updated_at trigger
drop trigger if exists specialties_set_updated_at on public.specialties;
create trigger specialties_set_updated_at
  before update on public.specialties
  for each row execute function public.set_updated_at();

-- ── RLS ─────────────────────────────────────────────────
alter table public.specialties enable row level security;

drop policy if exists "Public read active specialties" on public.specialties;
create policy "Public read active specialties"
  on public.specialties for select
  to anon
  using (active = true);

drop policy if exists "Authenticated full access specialties" on public.specialties;
create policy "Authenticated full access specialties"
  on public.specialties for all
  to authenticated
  using (true)
  with check (true);

-- ── Seed: 7 especialidades iniciales ────────────────────
insert into public.specialties (slug, label, description, icon, color_class, display_order, active) values
  ('cardiologia', 'Cardiología',
   'Diagnóstico y tratamiento de enfermedades cardíacas con cirugía cardiovascular de última generación.',
   'heart', 'from-red-950 to-red-900', 10, true),

  ('neonatologia', 'Neonatología',
   'Cuidado especializado del recién nacido. Unidad de alta complejidad con tecnología de punta.',
   'baby', 'from-sky-950 to-slate-900', 20, true),

  ('ginecologia', 'Ginecología',
   'Salud integral femenina, obstetricia, ginecología oncológica y reproducción asistida.',
   'stethoscope', 'from-rose-950 to-pink-950', 30, true),

  ('cirugia-general', 'Cirugía General',
   'Procedimientos de alta y mediana complejidad: laparoscópica, bariátrica y endoscópica.',
   'scissors', 'from-indigo-950 to-navy-dark', 40, true),

  ('cirugia-estetica', 'Cirugía Estética',
   'Rinoplastia, otoplastia, remodelación facial y procedimientos estéticos por especialistas certificados.',
   'sparkles', 'from-amber-950 to-yellow-950', 50, true),

  ('cuidados-intensivos', 'Cuidados Intensivos',
   'Unidad UCI con monitoreo continuo y manejo del paciente crítico, disponible 24/7.',
   'activity', 'from-slate-900 to-slate-800', 60, true),

  ('biologia-molecular', 'Biología Molecular',
   'Análisis genéticos y moleculares avanzados para diagnóstico preciso de enfermedades.',
   'dna', 'from-emerald-950 to-teal-950', 70, true)
on conflict (slug) do nothing;

-- ── Horario estructurado en doctors ─────────────────────
-- Formato: array de objetos { day, start, end }
-- Ej: [{"day":"mon","start":"09:00","end":"13:00"}, {"day":"mon","start":"15:00","end":"18:00"}]
alter table public.doctors
  add column if not exists schedule_days jsonb not null default '[]'::jsonb;
