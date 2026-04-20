# Daily Report - 2026-04-17

## Summary

Today focused on improving the Illumios marketing site so it feels more polished, more intentional, and better aligned with a pre-launch founding cohort strategy instead of a stalled "applications paused" experience.

## Completed

- Reviewed the current site for messaging clarity, CTA clarity, and overall design quality.
- Completed a tighter visual and messaging pass to make the homepage feel more professional and conversion-ready.
- Updated the legal pages so `Privacy` and `Terms` use the same current site shell instead of an older-looking header experience.
- Removed the repetitive paused-application messaging from the footer.
- Evaluated founder photo/video strategy and recommended using a strong photo first, with video added later only if polished.
- Attempted a LinkedIn-based headshot pull, identified it was the wrong image, and reverted the site back to the neutral founder initials treatment.
- Reframed the launch recommendation from `applications paused` to a `founding cohort / priority list` strategy.
- Converted the current Next.js site flow in code from a paused application state to a waitlist-style pre-launch flow.
- Updated homepage, header, footer, CTA, and form copy to support the pre-launch / founding cohort positioning.
- Changed the form behavior to collect `first name + email` for the priority list instead of pushing visitors directly into the quiz.
- Updated the API and lead-processing logic so waitlist submissions can:
  - return a confirmation state instead of redirecting
  - persist as `waitlist` leads
  - send a waitlist-specific payload to GHL
- Verified the updated code with:
  - `npm run lint`
  - `npm run build`

## Still Open

- Add Vercel environment variables for:
  - `ILLUMIOS_GHL_API_TOKEN`
  - `ILLUMIOS_GHL_API_BASE_URL`
  - `ILLUMIOS_GHL_LOCATION_ID`
  - optional Supabase credentials if backup storage is desired
- Decide whether waitlist leads should go to:
  - GHL only
  - GHL + Supabase backup storage
- Deploy the new pre-launch waitlist version once the GHL wiring is ready.
- Replace the temporary founder initials with the real headshot once the final image is available.

## Current Blocker

The code path is ready for a server-side GHL handoff, but the live waitlist integration is blocked until the Vercel project has the required GHL environment variables configured.

## Recommended Next Step

Add the private GHL API token and location wiring to Vercel, then test the live waitlist submission path through the website server route.
