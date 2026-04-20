# Supabase Setup

This folder holds the minimal database setup for the native Illumios lead-capture path.

## Current migration

- `migrations/20260417094438_create_website_applications.sql`

It creates `public.website_applications`, intended for server-side inserts from the website application flow.

## Table intent

The table stores the current application fields:

- `first_name`
- `email`
- `phone`
- `source`
- `page_url`

It also leaves room for operational metadata without forcing more schema churn right away:

- `offer_slug`
- `status`
- `quiz_redirect_url`
- `referrer_url`
- `user_agent`
- `metadata`
- `raw_payload`

## Notes

- The table is append-friendly and indexed for common operational views by `created_at`, `offer_slug`, `email`, and `source`.
- Row Level Security is enabled so access can be tightened intentionally once the app-side Supabase integration is wired up.
- This migration is intentionally simple and does not assume GoHighLevel is part of the long-term path.
