-- ====================================================
-- Clínica Latino — Schema Inicial
-- Ejecutar en Supabase SQL Editor
-- ====================================================

-- Appointments (solicitudes de cita)
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  patient_name text not null,
  patient_email text not null,
  patient_phone text not null,
  specialty text not null,
  preferred_date date not null,
  preferred_time text not null,
  notes text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled'))
);

-- Doctors
create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  specialty text not null,
  bio text,
  photo_url text,
  schedule text,
  active boolean not null default true
);

-- Services
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  category text not null,
  icon text,
  active boolean not null default true
);

-- Blog Posts
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  cover_url text,
  author text not null,
  published boolean not null default false
);

-- ====================================================
-- Row Level Security
-- ====================================================

-- Appointments: solo el service role puede leer; cualquiera puede insertar (solicitar cita)
alter table public.appointments enable row level security;

create policy "Allow public insert on appointments"
  on public.appointments for insert
  to anon
  with check (true);

create policy "Allow service role full access on appointments"
  on public.appointments for all
  to service_role
  using (true);

-- Doctors: lectura pública
alter table public.doctors enable row level security;

create policy "Allow public read on doctors"
  on public.doctors for select
  to anon
  using (active = true);

-- Services: lectura pública
alter table public.services enable row level security;

create policy "Allow public read on services"
  on public.services for select
  to anon
  using (active = true);

-- Blog: lectura pública de posts publicados
alter table public.blog_posts enable row level security;

create policy "Allow public read on published posts"
  on public.blog_posts for select
  to anon
  using (published = true);

-- ====================================================
-- Seed Data — Servicios
-- ====================================================

insert into public.services (name, description, category, icon) values
  ('Quirófano', 'Cirugía general, bariátrica y endoscópica con especialistas certificados.', 'Cirugía', 'scissors'),
  ('Cardio Latino', 'Cirugía cardíaca y tratamiento cardiovascular de alta complejidad.', 'Cardiología', 'heart'),
  ('Neonatología', 'Unidad de neonatología con tecnología de punta para el recién nacido.', 'Pediatría', 'baby'),
  ('Cuidados Intensivos', 'UCI con monitoreo continuo y equipo médico especializado 24/7.', 'UCI', 'activity'),
  ('Cirugía Estética', 'Rinoplastia, otoplastia y remodelación facial por especialistas.', 'Estética', 'sparkles'),
  ('Ginecología', 'Ginecología, obstetricia y reproducción humana integral.', 'Ginecología', 'stethoscope'),
  ('Centro de Imágenes', 'Rayos X, tomografía y ecografía de última generación.', 'Diagnóstico', 'scan'),
  ('Laboratorio', 'Análisis clínicos con resultados precisos y ágiles.', 'Laboratorio', 'flask'),
  ('Hospitalización', 'Habitaciones confortables con enfermería especializada.', 'Hospitalización', 'bed'),
  ('Emergencia 24/7', 'Urgencias y emergencias atendidas en todo momento.', 'Emergencia', 'siren'),
  ('Farmacia', 'Farmacia interna con amplio inventario de medicamentos.', 'Adicionales', 'pill'),
  ('Biología Molecular', 'Análisis genéticos y moleculares avanzados.', 'Especializado', 'microscope');
