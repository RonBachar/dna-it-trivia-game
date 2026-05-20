create extension if not exists pgcrypto;

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  prompt text not null,
  options jsonb not null,
  correct_index integer not null check (correct_index >= 0 and correct_index <= 3),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint questions_options_array check (jsonb_typeof(options) = 'array'),
  constraint questions_options_count check (jsonb_array_length(options) = 4)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists questions_set_updated_at on public.questions;

create trigger questions_set_updated_at
before update on public.questions
for each row
execute function public.set_updated_at();

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text not null,
  normalized_full_name text not null,
  normalized_company text not null,
  participant_key text not null unique,
  quiz_question_ids uuid[] not null default '{}',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  score integer not null default 0 check (score >= 0),
  duration_ms integer check (duration_ms is null or duration_ms >= 0),
  created_at timestamptz not null default now()
);

create index if not exists participants_leaderboard_idx
  on public.participants (score desc, duration_ms asc, finished_at asc)
  where finished_at is not null;

create index if not exists participants_created_at_idx
  on public.participants (created_at desc);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references public.participants(id) on delete cascade,
  question_id uuid not null references public.questions(id),
  selected_index integer check (selected_index >= 0 and selected_index <= 3),
  is_correct boolean not null default false,
  answered_at timestamptz not null default now(),
  unique (participant_id, question_id)
);

create index if not exists answers_participant_idx
  on public.answers (participant_id);

alter table public.questions enable row level security;
alter table public.participants enable row level security;
alter table public.answers enable row level security;

drop policy if exists "Service role manages questions" on public.questions;
drop policy if exists "Service role manages participants" on public.participants;
drop policy if exists "Service role manages answers" on public.answers;

create policy "Service role manages questions"
  on public.questions
  for all
  to service_role
  using (true)
  with check (true);

create policy "Service role manages participants"
  on public.participants
  for all
  to service_role
  using (true)
  with check (true);

create policy "Service role manages answers"
  on public.answers
  for all
  to service_role
  using (true)
  with check (true);

grant select, insert, update, delete on table public.questions to service_role;
grant select, insert, update, delete on table public.participants to service_role;
grant select, insert, update, delete on table public.answers to service_role;
