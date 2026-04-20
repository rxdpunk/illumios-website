# AGENTS.md

## Repo Role

This repository is the public marketing site for `illumios.com`.

It currently contains two live delivery surfaces:

- the legacy static GitHub Pages site built from plain HTML, inline CSS, and small inline JavaScript helpers
- a Vercel-hosted Next.js app under `src/` that powers the server-side waitlist / application API

## Primary Goal

Lead with `Illumios Academia` as the current front-door offer.

Canonical subtitle:

`AI for Small Business Owners: Your First 30 Days`

The site should move qualified visitors into the application form and then into the quiz at `quiz.illumios.com`.

## Source Of Truth

For business and offer decisions, follow the sibling planning repo at:

- `/Users/sposato/Dev_Projects/illumios/planning/illumios-operating-directives.md`
- `/Users/sposato/Dev_Projects/illumios/planning/illumios-academia-prd.md`
- `/Users/sposato/Dev_Projects/illumios/TASKS.md`

If website copy conflicts with those files, update the website to match the planning repo unless the task is explicitly to change the source-of-truth docs first.

## Current Implementation Notes

- `index.html` is the main GitHub Pages landing page and contains most styling and behavior inline.
- `privacy.html` and `tos.html` are standalone legal pages and should stay visually consistent with the main site.
- `src/app/page.tsx` is the newer Vercel-hosted landing page version.
- `src/app/api/apply/route.ts` is the server-side lead-capture endpoint.
- Public lead capture should go through the Vercel API route, which syncs to GHL through the REST API.
- `ILLUMIOS_GHL_INBOUND_WEBHOOK_URL` is deprecated for production use.
- `ILLUMIOS_GHL_API_TOKEN` and `ILLUMIOS_GHL_LOCATION_ID` are the primary production GHL configuration.
- Production storage is currently `GHL only`; Supabase remains optional backup storage and should not be enabled by default without a clear reason.

## Working Rules

- Preserve the static-site approach on the GitHub Pages surface unless the user explicitly asks for a rebuild or migration.
- Do not introduce a framework, bundler, or dependency chain just to make small edits.
- Keep brand constants consistent:
  - Navy `#0D1B4B`
  - Orange `#F26522`
  - Font `Nunito`
- Keep messaging outcome-based, concrete, and small-business specific.
- Do not reposition Illumios as a generic done-for-you AI agency.
- Treat discovery calls as a supporting enrollment step, not the primary offer.
- Be careful with legal, privacy, and consent copy; do not casually weaken or remove it.
- If changing form or webhook behavior, verify the handoff still supports the website application -> fit quiz -> enrollment path.

## Deployment Context

- `illumios.com` currently resolves to GitHub Pages.
- The linked Vercel project is `illumios/illumios-website` and hosts the Next.js app plus the server-side capture endpoint.
- If the custom domain has not been cut over yet, the static site should submit to the Vercel API route so live leads still reach GHL.
- `CNAME` should be preserved unless the domain strategy explicitly changes.

## When In Doubt

- Prefer simple edits to existing files over adding new architecture.
- If a requested change impacts quiz qualification, CRM capture, or offer positioning, call out the dependency on `illumios-quiz` and GoHighLevel.
