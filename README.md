# illumios-website

Public marketing site for `illumios.com`, centered on the `Illumios Academia`
founding-cohort / priority-list flow.

## Current Setup

- `index.html`, `privacy.html`, and `tos.html` remain the GitHub Pages static
  site.
- `src/` contains the newer Vercel-hosted Next.js app and the server-side
  `/api/apply` route.
- Public lead capture should go through the Vercel API route, which syncs
  directly to GoHighLevel via the REST API.
- Production storage decision is currently `GHL only`. Supabase backup remains
  optional and is not enabled by default.

## Environment Variables

Required for live GHL capture:

```bash
ILLUMIOS_GHL_API_TOKEN=
ILLUMIOS_GHL_LOCATION_ID=
```

Optional:

```bash
ILLUMIOS_GHL_API_BASE_URL=https://services.leadconnectorhq.com
ILLUMIOS_GHL_OFFER_SLUG=illumios-academia
ILLUMIOS_QUIZ_URL=https://quiz.illumios.com
SUPABASE_URL=
SUPABASE_SECRET_KEY=
SUPABASE_APPLICATIONS_TABLE=website_applications
```

## Local Development

Run the Next.js app locally:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployment Notes

- Vercel project: `illumios/illumios-website`
- GitHub Pages still serves `illumios.com` until the domain is cut over.
- If the public domain stays on GitHub Pages, the static form should keep
  posting to the Vercel `/api/apply` endpoint so live leads still flow into
  GHL.
