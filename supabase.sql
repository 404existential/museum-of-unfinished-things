-- Museum of Unfinished Things: database schema
-- Run this once in Supabase SQL Editor.
-- IMPORTANT: In Supabase Auth settings, turn OFF "Confirm email" because this project intentionally uses username-only accounts.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.artifacts (
  id uuid primary key default gen_random_uuid(),
  accession text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  category text not null,
  year text,
  last_worked_on date,
  status text not null default 'Published',
  reason text,
  visual text not null default 'paper',
  description text not null,
  contributor_note text,
  contributor_name text not null default 'Anonymous',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.artifacts enable row level security;

drop policy if exists "Public profiles are not exposed" on public.profiles;
drop policy if exists "Users can read their own profile" on public.profiles;
drop policy if exists "Users can create their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;

create policy "Users can read their own profile" on public.profiles
for select to authenticated using (id = auth.uid());

create policy "Users can create their own profile" on public.profiles
for insert to authenticated with check (id = auth.uid());

create policy "Users can update their own profile" on public.profiles
for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "Everyone can read public artifacts" on public.artifacts;
drop policy if exists "Signed in users can publish artifacts" on public.artifacts;
drop policy if exists "Users can edit their own artifacts" on public.artifacts;
drop policy if exists "Users can delete their own artifacts" on public.artifacts;

create policy "Everyone can read public artifacts" on public.artifacts
for select to anon, authenticated using (true);

create policy "Signed in users can publish artifacts" on public.artifacts
for insert to authenticated with check (user_id = auth.uid());

create policy "Users can edit their own artifacts" on public.artifacts
for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Users can delete their own artifacts" on public.artifacts
for delete to authenticated using (user_id = auth.uid());

-- Automatically create the profile row when a new auth account is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create index if not exists artifacts_created_at_idx on public.artifacts(created_at desc);
create index if not exists artifacts_category_idx on public.artifacts(category);
create index if not exists artifacts_user_id_idx on public.artifacts(user_id);
