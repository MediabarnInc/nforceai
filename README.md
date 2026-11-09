# nforceai.com

The nForce AI website, rebuilt in Astro. Code lives on GitHub and deploys to Vercel.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static pages + serverless contact function in .vercel/output/
```

Node 22 (Vercel uses the version pinned in `package.json`).

## How it's built

- **Astro 7** with the Vercel adapter. Every page is prerendered to static HTML. The contact form endpoint (`src/pages/api/contact.ts`) is the only route that runs on the server, as a Vercel function.
- **URLs match the old Webflow site** slug for slug. The three lorem ipsum `/blog/*` pages redirect to `/resources/our-favorite-ai-tools` (`astro.config.mjs`).
- **Design system:** `DESIGN.md` is the source of truth for colour, type, spacing, shapes and motion. Tokens live in `src/styles/global.css`.
- **Sora** is self-hosted through `@fontsource-variable/sora`.
- **No frameworks or UI libraries.** Interactivity (menus, anomaly explorer, training chooser, tool filter, contact form, hero field) is small vanilla scripts inside each component. Every page works without JavaScript.

```
src/
  components/   Header, Footer, CloseBand, PageHero, Shape, Mosaic,
                HeroGraphic, AnomalyExplorer, UseCases, ResourceLinks
  lib/shapes.ts Rounded shape kit used by every graphic
  data/site.ts  Navigation, NAICS codes, certifications, article links, stat sources
  layouts/      Base (head, header, footer), Article (resources, case studies, legal)
  pages/        One file per URL. Articles are Markdown.
public/         favicon.svg, og.jpg (link preview card), team/ (founder photos)
design/         og-card.html, the source for og.jpg (render at 1200 × 630)
```

## Contact form

The form posts to `/api/contact`, which emails the enquiry through [Resend](https://resend.com) and stores nothing (this matches the privacy policy). Set these environment variables in Vercel (Project → Settings → Environment Variables), then redeploy:

| Variable | Example |
| --- | --- |
| `RESEND_API_KEY` | `re_...` |
| `CONTACT_TO` | `contact@nforceai.com` |
| `CONTACT_FROM` | `nForce AI website <website@nforceai.com>` (domain must be verified in Resend) |

Until those are set, the form shows people a clear message asking them to email contact@nforceai.com instead. To use a different email service, replace `sendEmail()` in `src/pages/api/contact.ts`.

## Analytics, HubSpot and cookie consent

Google Analytics 4 and the HubSpot tracking code are built in but switched off until their IDs are set in Vercel (Project → Settings → Environment Variables), followed by a redeploy:

| Variable | Where to find it |
| --- | --- |
| `PUBLIC_GA_MEASUREMENT_ID` | Google Analytics → Admin → Data streams → your web stream (`G-...`) |
| `PUBLIC_HUBSPOT_PORTAL_ID` | HubSpot → Settings → Account defaults → Hub ID |
| `HUBSPOT_FORM_ID` (optional) | HubSpot → Marketing → Forms → a form's ID. Contact form enquiries are then also sent to HubSpot as contacts. The form needs the fields `firstname`, `lastname`, `email`, `company` and `message`. |

- Once either ID is set, a cookie banner appears (`src/components/Consent.astro`) and a "Cookie settings" link appears in the footer.
- Neither script loads, and no cookies are set, until a visitor chooses Accept. Declining later removes their cookies. Browsers sending Global Privacy Control are treated as Decline.
- In HubSpot, turn off HubSpot's own cookie banner (Settings → Privacy and consent) so visitors don't see two. Also turn off "Collected forms" for this site if `HUBSPOT_FORM_ID` is set, or each enquiry is recorded twice.
- The contact form still emails through Resend. An enquiry counts as sent if either email or HubSpot succeeds.

## SEO

- `robots.txt` is generated (`src/pages/robots.txt.ts`) and points at the sitemap on the production domain.
- `@astrojs/sitemap` writes `sitemap-index.xml` with every page except the 404, which is `noindex`.
- Every page has a unique title and a meta description of 160 characters or fewer, one H1, a canonical URL without a trailing slash, Open Graph and X tags, and schema.org data (Organization on every page, WebSite on the home page, Article and BreadcrumbList on resources and case studies).
- Titles take the " | nForce AI" suffix only when the result stays within 60 characters.

## Quality checks

```bash
npm run check:slop                                  # Impeccable, source files
npx impeccable detect http://localhost:4321/        # Impeccable, a rendered page
```

Run Impeccable on every pull request. Every page passed with zero anti-patterns at handover.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo. Vercel detects Astro; keep the defaults (build command `npm run build`, no output directory override). The `@astrojs/vercel` adapter writes everything to `.vercel/output`.
3. Add the contact form variables above.
4. Add the domains `www.nforceai.com` and `nforceai.com` (set the apex to redirect to www), then point DNS at Vercel when ready to switch off Webflow.

Canonical URLs and the link preview image use Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), so Slack and text previews work on the `.vercel.app` address before launch and switch to www.nforceai.com once it is the production domain. Make www (not the apex) the primary domain.

Redirects for the old `/blog/*` URLs and trailing slashes are generated by the adapter, so there is no `vercel.json`.

## Before launch

- [x] Founder photos are self-hosted in `public/team/`.
- [ ] Fill in the governing-law location in `src/pages/terms-of-use.md` (it still says "[Insert Location]", carried over from the current site).
- [ ] Add the Google Analytics and HubSpot IDs in Vercel (see above).
- [ ] Update the privacy policy before turning on analytics or HubSpot. It currently says no cookies other than Google Analytics, that contact form data isn't stored and that nothing is shared with third parties. HubSpot changes all three.
- [ ] Confirm the wording of each certification in `src/data/site.ts` (for example "FedRAMP Ready").
- [ ] Set up Resend (or another email service) for the contact form.
