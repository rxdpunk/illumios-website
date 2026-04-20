create extension if not exists pgcrypto;

create table if not exists public.website_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  offer_slug text not null default 'illumios-academia',
  status text not null default 'submitted',
  first_name text not null,
  email text not null,
  phone text,
  source text not null default 'website-academia',
  page_url text,
  quiz_redirect_url text,
  referrer_url text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  raw_payload jsonb not null default '{}'::jsonb,
  constraint website_applications_status_check
    check (status in ('submitted', 'qualified', 'disqualified', 'enrolled', 'archived')),
  constraint website_applications_first_name_check
    check (char_length(btrim(first_name)) between 1 and 80),
  constraint website_applications_email_check
    check (position('@' in email) > 1)
);

create index if not exists website_applications_created_at_idx
  on public.website_applications (created_at desc);

create index if not exists website_applications_offer_slug_created_at_idx
  on public.website_applications (offer_slug, created_at desc);

create index if not exists website_applications_email_idx
  on public.website_applications (lower(email));

create index if not exists website_applications_source_idx
  on public.website_applications (source);

alter table public.website_applications enable row level security;

comment on table public.website_applications is
  'Server-side website applications for Illumios Academia and future front-door offers.';

comment on column public.website_applications.metadata is
  'Structured request metadata such as utm parameters, campaign info, or internal processing notes.';

comment on column public.website_applications.raw_payload is
  'Original normalized application payload captured by the website before downstream processing.';

