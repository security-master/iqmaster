-- IQMaster schema — run in Supabase SQL Editor once.
-- Safe to re-run: uses IF NOT EXISTS.

create extension if not exists pgcrypto;

create table if not exists public.assessment_results (
  id uuid primary key default gen_random_uuid(),
  test_id text not null unique,
  security_code text not null,
  track text not null default 'adult',
  profile jsonb not null default '{}'::jsonb,
  result jsonb not null default '{}'::jsonb,
  completion_mode text,
  elapsed_seconds integer default 0,
  paid boolean not null default false,
  portable_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists assessment_results_credentials_idx
  on public.assessment_results (test_id, security_code);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.org_invites (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  organization_name text not null,
  audience text not null default 'general',
  created_by text,
  max_uses integer default 50,
  use_count integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.org_participants (
  id uuid primary key default gen_random_uuid(),
  invite_token text not null,
  organization_name text not null,
  member_name text not null,
  test_id text,
  status text not null default 'joined',
  created_at timestamptz not null default now()
);

alter table public.assessment_results enable row level security;
alter table public.contact_messages enable row level security;
alter table public.org_invites enable row level security;
alter table public.org_participants enable row level security;

-- Public anon access for demo product (tighten before production scale).
drop policy if exists "anon insert results" on public.assessment_results;
create policy "anon insert results" on public.assessment_results
  for insert to anon with check (true);

drop policy if exists "anon update results" on public.assessment_results;
create policy "anon update results" on public.assessment_results
  for update to anon using (true) with check (true);

drop policy if exists "anon select results by credentials" on public.assessment_results;
create policy "anon select results by credentials" on public.assessment_results
  for select to anon using (true);

drop policy if exists "anon insert contact" on public.contact_messages;
create policy "anon insert contact" on public.contact_messages
  for insert to anon, authenticated with check (true);

drop policy if exists "anon select contact" on public.contact_messages;
create policy "anon select contact" on public.contact_messages
  for select to anon, authenticated using (true);

drop policy if exists "anon insert invites" on public.org_invites;
create policy "anon insert invites" on public.org_invites
  for insert to anon with check (true);

drop policy if exists "anon select invites" on public.org_invites;
create policy "anon select invites" on public.org_invites
  for select to anon using (true);

drop policy if exists "anon update invites" on public.org_invites;
create policy "anon update invites" on public.org_invites
  for update to anon using (true) with check (true);

drop policy if exists "anon insert participants" on public.org_participants;
create policy "anon insert participants" on public.org_participants
  for insert to anon with check (true);

drop policy if exists "anon select participants" on public.org_participants;
create policy "anon select participants" on public.org_participants
  for select to anon using (true);
