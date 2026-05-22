-- ====================================================
-- Clínica Latino — Admin de Médicos
-- Ejecutar DESPUÉS de 001_initial_schema.sql en Supabase SQL Editor
-- ====================================================

-- Re-crear la tabla doctors con esquema completo
drop table if exists public.doctors cascade;

create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null unique,
  full_name text not null,
  specialty text not null,            -- slug: 'cardiologia', 'neonatologia', etc.
  specialty_label text not null,      -- legible: 'Cardiología'
  subspecialty text not null,
  bio text not null,
  experience text not null,
  education text[] not null default '{}',
  schedule text not null,
  languages text[] not null default '{}',
  photo_url text,
  display_order int not null default 0,
  active boolean not null default true
);

create index if not exists doctors_specialty_idx on public.doctors (specialty);
create index if not exists doctors_active_idx on public.doctors (active);
create index if not exists doctors_display_order_idx on public.doctors (display_order);

-- Trigger para updated_at
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists doctors_set_updated_at on public.doctors;
create trigger doctors_set_updated_at
  before update on public.doctors
  for each row execute function public.set_updated_at();

-- ====================================================
-- Row Level Security
-- ====================================================
alter table public.doctors enable row level security;

-- Lectura pública (solo activos)
drop policy if exists "Public read active doctors" on public.doctors;
create policy "Public read active doctors"
  on public.doctors for select
  to anon
  using (active = true);

-- Usuarios autenticados (admins) tienen acceso total
drop policy if exists "Authenticated full access doctors" on public.doctors;
create policy "Authenticated full access doctors"
  on public.doctors for all
  to authenticated
  using (true)
  with check (true);

-- ====================================================
-- Storage bucket para fotos de médicos
-- ====================================================
insert into storage.buckets (id, name, public)
values ('doctor-photos', 'doctor-photos', true)
on conflict (id) do nothing;

-- Lectura pública del bucket
drop policy if exists "Public read doctor photos" on storage.objects;
create policy "Public read doctor photos"
  on storage.objects for select
  to anon
  using (bucket_id = 'doctor-photos');

-- Solo autenticados pueden subir/modificar/borrar
drop policy if exists "Authenticated upload doctor photos" on storage.objects;
create policy "Authenticated upload doctor photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'doctor-photos');

drop policy if exists "Authenticated update doctor photos" on storage.objects;
create policy "Authenticated update doctor photos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'doctor-photos');

drop policy if exists "Authenticated delete doctor photos" on storage.objects;
create policy "Authenticated delete doctor photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'doctor-photos');

-- ====================================================
-- Seed: 14 médicos iniciales
-- ====================================================
insert into public.doctors (slug, full_name, specialty, specialty_label, subspecialty, bio, experience, education, schedule, languages, display_order, active) values
  ('eduardo-vasquez', 'Dr. Eduardo Vásquez Andrade', 'cardiologia', 'Cardiología',
   'Cardiología Intervencionista',
   'Especialista en hemodinamia, angioplastia coronaria y procedimientos cardíacos mínimamente invasivos. Líder del programa Cardio Latino.',
   '22 años',
   array['Universidad Central del Ecuador','Especialización en Cardiología — Cleveland Clinic'],
   'Lun · Mié · Vie · 09:00 – 17:00',
   array['Español','Inglés'], 10, true),

  ('maria-jose-carrasco', 'Dra. María José Carrasco', 'cardiologia', 'Cardiología',
   'Cirugía Cardiovascular',
   'Cardiocirujana con experiencia en revascularización miocárdica, cirugía valvular y procedimientos cardíacos complejos.',
   '18 años',
   array['Universidad de Cuenca','Fellowship Cirugía Cardiovascular — Buenos Aires'],
   'Mar · Jue · 08:00 – 16:00',
   array['Español','Inglés','Francés'], 20, true),

  ('patricia-cordero', 'Dra. Patricia Cordero', 'neonatologia', 'Neonatología',
   'Neonatología Crítica',
   'Especialista en cuidados intensivos neonatales, atención de prematuros extremos y seguimiento del desarrollo del recién nacido.',
   '20 años',
   array['Universidad Católica de Cuenca','Especialización Neonatología — Hospital Garrahan'],
   'Lun · Mar · Jue · 08:00 – 18:00',
   array['Español','Inglés'], 30, true),

  ('andres-mejia', 'Dr. Andrés Mejía', 'neonatologia', 'Neonatología',
   'Pediatría Intensiva',
   'Pediatra intensivista con enfoque en patología respiratoria neonatal y soporte vital avanzado en recién nacidos.',
   '15 años',
   array['Universidad de Cuenca','Fellowship Pediatría Intensiva — Boston'],
   'Mié · Vie · Sáb · 09:00 – 17:00',
   array['Español','Inglés'], 40, true),

  ('carolina-espinoza', 'Dra. Carolina Espinoza', 'ginecologia', 'Ginecología',
   'Ginecología y Obstetricia',
   'Especialista en embarazos de alto riesgo, ecografía obstétrica avanzada y atención integral de la salud femenina.',
   '17 años',
   array['Universidad de Cuenca','Especialización Ginecología — Hospital Clínico de Barcelona'],
   'Lun · Mié · Jue · 10:00 – 18:00',
   array['Español','Inglés'], 50, true),

  ('sofia-ramirez', 'Dra. Sofía Ramírez', 'ginecologia', 'Ginecología',
   'Reproducción Humana',
   'Especialista en medicina reproductiva, fertilización in vitro y tratamientos de infertilidad de pareja.',
   '14 años',
   array['Universidad San Francisco de Quito','Fellowship Medicina Reproductiva — IVI Madrid'],
   'Mar · Jue · Vie · 09:00 – 17:00',
   array['Español','Inglés'], 60, true),

  ('roberto-castillo', 'Dr. Roberto Castillo', 'cirugia-general', 'Cirugía General',
   'Cirugía Laparoscópica',
   'Cirujano general especializado en procedimientos mínimamente invasivos, hernias complejas y cirugía oncológica.',
   '25 años',
   array['Universidad Central del Ecuador','Fellowship Cirugía Laparoscópica — São Paulo'],
   'Lun · Mar · Jue · 08:00 – 17:00',
   array['Español','Inglés','Portugués'], 70, true),

  ('luis-fernando-pesantez', 'Dr. Luis Fernando Pesántez', 'cirugia-general', 'Cirugía General',
   'Cirugía Bariátrica',
   'Especialista en cirugía bariátrica y metabólica. Manga gástrica, bypass gástrico y seguimiento multidisciplinario.',
   '16 años',
   array['Universidad de Cuenca','Fellowship Cirugía Bariátrica — IFSO'],
   'Mié · Vie · 09:00 – 18:00',
   array['Español','Inglés'], 80, true),

  ('juan-pablo-carrion', 'Dr. Juan Pablo Carrión', 'cirugia-estetica', 'Cirugía Estética',
   'Cirugía Plástica y Reconstructiva',
   'Cirujano plástico con enfoque en rinoplastia, contorno corporal y procedimientos reconstructivos post-mastectomía.',
   '19 años',
   array['Universidad Central del Ecuador','Fellowship Cirugía Plástica — Brasil (Pitanguy)'],
   'Lun · Mié · Vie · 10:00 – 18:00',
   array['Español','Inglés','Portugués'], 90, true),

  ('andrea-vintimilla', 'Dra. Andrea Vintimilla', 'cirugia-estetica', 'Cirugía Estética',
   'Estética Facial',
   'Especialista en rejuvenecimiento facial, blefaroplastia, otoplastia y procedimientos estéticos mínimamente invasivos.',
   '12 años',
   array['Universidad de Cuenca','Fellowship Estética Facial — Miami'],
   'Mar · Jue · Sáb · 09:00 – 16:00',
   array['Español','Inglés'], 100, true),

  ('fernando-bravo', 'Dr. Fernando Bravo', 'cuidados-intensivos', 'Cuidados Intensivos',
   'Medicina Intensiva Adultos',
   'Intensivista con experiencia en soporte vital avanzado, ventilación mecánica y manejo de paciente crítico.',
   '21 años',
   array['Universidad Central del Ecuador','Fellowship UCI — Mount Sinai'],
   'Turnos rotativos · 24/7',
   array['Español','Inglés'], 110, true),

  ('veronica-siguenza', 'Dra. Verónica Sigüenza', 'cuidados-intensivos', 'Cuidados Intensivos',
   'Anestesiología y UCI',
   'Anestesióloga e intensivista. Manejo perioperatorio, sedación avanzada y cuidados críticos post-quirúrgicos.',
   '13 años',
   array['Universidad de Cuenca','Especialización Anestesiología — Hospital Italiano BA'],
   'Turnos rotativos · 24/7',
   array['Español','Inglés','Italiano'], 120, true),

  ('diego-alvarez', 'Dr. Diego Álvarez', 'biologia-molecular', 'Biología Molecular',
   'Genética Médica',
   'Genetista médico especializado en diagnóstico de enfermedades hereditarias, consejería genética y oncogenética.',
   '15 años',
   array['Universidad Central del Ecuador','PhD Genética Humana — Universidad de Barcelona'],
   'Lun · Mar · Jue · 09:00 – 16:00',
   array['Español','Inglés'], 130, true),

  ('lucia-mosquera', 'Dra. Lucía Mosquera', 'biologia-molecular', 'Biología Molecular',
   'Biología Molecular Clínica',
   'Bióloga molecular con experiencia en diagnóstico de enfermedades infecciosas, PCR cuantitativa y secuenciación genética.',
   '11 años',
   array['Universidad San Francisco de Quito','Maestría Biología Molecular — Karolinska'],
   'Mié · Vie · 08:00 – 15:00',
   array['Español','Inglés','Sueco'], 140, true)
on conflict (slug) do nothing;
