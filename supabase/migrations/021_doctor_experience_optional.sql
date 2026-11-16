-- ====================================================
-- Clínica Latino — Se quita "Experiencia" de la ficha del médico
-- El admin y el sitio público dejan de usar doctors.experience (y experience_en).
-- La columna era NOT NULL, así que sin este cambio no se podrían crear médicos
-- desde el admin. Se vuelve opcional y NO se borra ningún dato: los valores
-- existentes quedan guardados por si se quieren recuperar.
-- Ejecutar DESPUÉS de 020_doctor_name_parts.sql.
-- ====================================================

alter table public.doctors
  alter column experience drop not null;

-- Opcional, más adelante y solo si ya no se necesitan los datos (irreversible):
--   alter table public.doctors drop column experience, drop column experience_en;
