# nforceai.com

The nForce AI website, rebuilt in Astro. Code lives on GitHub and deploys to Railway.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static pages + Node server in dist/
npm start         # serve the build (Railway uses this)
```

Node 22 or newer.

## How it's built

- **Astro 7** with the Node adapter. Every page is prerendered to static HTML. The contact form endpoint (`src/pages/api/contact.ts`) is the only route that runs on the server.
- **URLs match the old Webflow site** slug for slug. The three lorem ipsum `/blog/*` pages redirect to `/resources/our-favorite-ai-tools` (`astro.config.mjs`).
- **Design system:** `DESIGN.md` is the source of truth for colour, type, spacing, shapes and motion. Tokens live in `src/styles/global.css`.
- **Sora** is self-hosted through `@fontsource-variable/sora`.
- **No frameworks or UI libraries.** Interactivity (menus, anomaly explorer, training chooser, tool filter, contact form, hero field) is small vanilla scripts inside each component. Every page works without JavaScript.

```
src/
  components/   Header, Footer, CloseBand, PageHero, Shape, ShapeTiles,
                AnomalyField (hero visual), AnomalyExplorer, UseCases, ResourceLinks
  data/site.ts  Navigation, NAICS codes, certifications, article links, stat sources
  layouts/      Base (head, header, footer), Article (resources, case studies, legal)
  pages/        One file per URL. Articles are Markdown.
public/         favicon.svg, og.png
```

## Contact form

The form posts to `/api/contact`, which emails the enquiry through [Resend](https://resend.com) and stores nothing (this matches the privacy policy). Set these Railway variables:

| Variable | Example |
| --- | --- |
| `RESEND_API_KEY` | `re_...` |
| `CONTACT_TO` | `contact@nforceai.com` |
| `CONTACT_FROM` | `nForce AI website <website@nforceai.com>` (domain must be verified in Resend) |

Until those are set, the form shows people a clear message asking them to email contact@nforceai.com instead. To use a different email service, replace `sendEmail()` in `src/pages/api/contact.ts`.

## Quality checks

```bash
npm run check:slop                                  # Impeccable, source files
npx impeccable detect http://localhost:4321/        # Impeccable, a rendered page
```

Run Impeccable on every pull request. Every page passed with zero anti-patterns at handover.

## Deploy to Railway

1. Push this repo to GitHub.
2. In Railway, create a project from the GitHub repo. `railway.json` sets the build and start commands; Railway provides `PORT`.
3. Add the contact form variables above.
4. Add the custom domain `www.nforceai.com` (and redirect the apex domain), then point DNS at Railway when ready to switch off Webflow.

## Before launch

- [x] Founder photos are self-hosted in `public/team/`.
- [ ] Fill in the governing-law location in `src/pages/terms-of-use.md` (it still says "[Insert Location]", carried over from the current site).
- [ ] Choose analytics. The privacy policy says Google Analytics, but no analytics script is installed yet. Add one, or update the policy.
- [ ] Confirm the wording of each certification in `src/data/site.ts` (for example "FedRAMP Ready").
- [ ] Set up Resend (or another email service) for the contact form.
