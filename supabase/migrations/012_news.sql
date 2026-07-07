-- ====================================================
-- Clínica Latino — Noticias
-- Ejecutar DESPUÉS de la última migración existente
-- ====================================================

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image_url text,
  published_at date not null default current_date,
  display_order int not null default 0,
  active boolean not null default true
);

create index if not exists news_active_idx on public.news (active);
create index if not exists news_display_order_idx on public.news (display_order);
create index if not exists news_published_at_idx on public.news (published_at desc);

drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at
  before update on public.news
  for each row execute function public.set_updated_at();

alter table public.news enable row level security;

drop policy if exists "Public read active news" on public.news;
create policy "Public read active news"
  on public.news for select
  to anon
  using (active = true);

drop policy if exists "Authenticated full access news" on public.news;
create policy "Authenticated full access news"
  on public.news for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket
insert into storage.buckets (id, name, public)
values ('news-images', 'news-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read news images" on storage.objects;
create policy "Public read news images"
  on storage.objects for select
  to anon
  using (bucket_id = 'news-images');

drop policy if exists "Authenticated upload news images" on storage.objects;
create policy "Authenticated upload news images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'news-images');

drop policy if exists "Authenticated update news images" on storage.objects;
create policy "Authenticated update news images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'news-images');

drop policy if exists "Authenticated delete news images" on storage.objects;
create policy "Authenticated delete news images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'news-images');
