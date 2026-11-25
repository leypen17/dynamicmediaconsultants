# Dynamic Media Consultants website

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4. Fully static pages plus one API route for the lead form.

The full audit, strategy, design system, SEO plan and test results are in [`docs/DELIVERABLES.md`](docs/DELIVERABLES.md).

## Run locally

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Production check:

```bash
npm run build && npm start
npm run typecheck && npm run lint
BASE_URL=http://localhost:3000 npm run test:e2e   # needs Playwright + Chromium installed
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Canonical URLs, sitemap, Open Graph. Defaults to `https://dynamicmediaconsultants.com`. |
| `CONTACT_WEBHOOK_URL` | To receive leads | Form submissions are POSTed here as JSON. Without it the form tells visitors to call or email. |
| `CONTACT_WEBHOOK_SECRET` | Optional | Sent as `X-Webhook-Secret` header. |
| `NEXT_PUBLIC_BOOKING_URL` | Optional | Calendly/Google booking link; adds a "Pick a time" button on `/get-started/`. |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 measurement ID. |

### Lead payload

```json
{ "name": "", "email": "", "phone": "", "company": "", "website": "", "service": "", "message": "", "source": "service:email-marketing", "submittedAt": "ISO date" }
```

Easiest setup: create a Zapier or Make "Catch Hook", paste its URL into `CONTACT_WEBHOOK_URL`, then route to Keap/Infusionsoft, HubSpot, Gmail, Slack, etc.

## Deploy (Vercel, recommended)

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected automatically.
3. Add the environment variables above (Production + Preview).
4. Deploy, check the preview URL, then add `dynamicmediaconsultants.com` under **Settings → Domains** and update DNS as Vercel instructs.
5. After go-live: submit `https://dynamicmediaconsultants.com/sitemap.xml` in Google Search Console, update the website link on the Google Business Profile and Facebook page.

Other hosts: any Node 18.18+ server can run `npm run build && npm start`. Netlify and Cloudflare also support Next.js.

## Editing content

| What | File |
|---|---|
| Company facts (NAP, phone, email, social, hours) | `src/lib/site.ts` |
| AI services copy | `src/lib/aiServices.ts` |
| Lead generation services copy, service groups | `src/lib/services.ts` |
| Logo files | `public/brand/` |
| Home FAQ | `src/lib/faqs.ts` |
| Testimonials | `src/components/ProofSection.tsx` |
| Colors, fonts, spacing tokens | `src/app/globals.css` (`@theme`) |
| Redirects and security headers | `next.config.ts` |

Search for `PLACEHOLDER` to find content that still needs real client information.

## Structure

```
src/app/          routes, metadata, sitemap, robots, OG image, API route
src/components/   Header, Footer, Button, ServiceCard, LeadForm, FaqList, CtaSection, ProofSection, PageHero, ...
src/lib/          site facts, service content, schema builders, validation
scripts/qa.mjs    Playwright + axe end-to-end checks
```
