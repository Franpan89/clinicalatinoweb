-- ====================================================
-- Clínica Latino — Storage bucket + claves para todas las imágenes/videos del sitio
-- Ejecutar DESPUÉS de 005_site_settings.sql
-- ====================================================

-- Bucket para todos los medios del sitio (no doctores — esos van en doctor-photos)
insert into storage.buckets (id, name, public, file_size_limit)
values ('site-media', 'site-media', true, 52428800) -- 50MB
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit;

-- Lectura pública
drop policy if exists "Public read site-media" on storage.objects;
create policy "Public read site-media"
  on storage.objects for select
  to anon
  using (bucket_id = 'site-media');

-- Solo autenticados pueden modificar
drop policy if exists "Auth upload site-media" on storage.objects;
create policy "Auth upload site-media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-media');

drop policy if exists "Auth update site-media" on storage.objects;
create policy "Auth update site-media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-media');

drop policy if exists "Auth delete site-media" on storage.objects;
create policy "Auth delete site-media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-media');

-- ── Claves de configuración para medios del sitio ──
-- Cada clave es null por defecto. Si null, el componente público usa el placeholder local.
insert into public.site_settings (key, value) values
  -- Home
  ('hero_image_url', null),
  ('services_banner_url', null),
  -- Gallery (5 imágenes + 1 video institucional)
  ('gallery_video_url', null),
  ('gallery_1_url', null),
  ('gallery_2_url', null),
  ('gallery_3_url', null),
  ('gallery_4_url', null),
  ('gallery_5_url', null),
  -- Quiénes somos — puede ser image o video
  ('about_media_url', null),
  ('about_media_type', 'image'),  -- 'image' | 'video'
  -- 11 landings de servicios
  ('service_image_quirofano', null),
  ('service_image_ginecologia', null),
  ('service_image_neonatologia', null),
  ('service_image_cuidados-intensivos', null),
  ('service_image_laboratorio', null),
  ('service_image_centro-imagenes', null),
  ('service_image_emergencia', null),
  ('service_image_hospitalizacion', null),
  ('service_image_farmacia', null),
  ('service_image_biologia-molecular', null),
  ('service_image_cafeteria', null)
on conflict (key) do nothing;
