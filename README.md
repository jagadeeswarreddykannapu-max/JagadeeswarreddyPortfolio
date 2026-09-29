# Jagadeeswar Reddy: Portfolio

Personal portfolio for **Jagadeeswar Reddy, Supply Chain Analyst**. Built with Next.js 16 (App Router),
React 19, TypeScript, Tailwind CSS 4, Motion and Lenis. Every page is prerendered as static HTML.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start            # http://localhost:3000
```

Checks: `npm run lint` and `npm run typecheck`.

## Pages

| Route | Content |
| --- | --- |
| `/` | Landing screen: the container sky scene; Explore (or Menu) opens the full-screen menu into every page |
| `/about` | Editorial portrait collage, the five links of the chain, narrative, "Why choose me?" |
| `/experience` | Warehouse landing (the supplied design), Wipro and ICodeTest timeline with company logos and KPI tiles, key project cards |
| `/projects` | Crane landing (orange container), category filter and case-study cards |
| `/projects/control-tower` · `/projects/novexai` · `/projects/inventory-optimization` | Case studies with working demonstrations |
| `/projects/supplier-risk` | The Power BI Supplier Performance & Risk Intelligence Center report |
| `/skills` | Skills landscape, five interactive capability areas, certifications and languages |
| `/education` | MBS campus with its programme notes, qualifications timeline, modules, thesis and journey map |
| `/contact` | Contact details and message form |
| `/resume` | The single resume PDF |

Navigation: the landing screen leads in through the full-screen menu; inside, a header bar (desktop),
the menu (all sizes), a "Next" link at the end of each page and the footer. Page changes cross-fade
using the View Transitions API where supported.

## Editing content

All text lives in typed files under `src/content/`:

- `site.ts` — name, contact details, LinkedIn, résumé metadata, navigation
- `about.ts`, `experience.ts`, `projects.ts`, `education.ts`, `skills.ts`, `credentials.ts`
- `demo/` — demonstration data used by the interactive dashboards (always labelled on screen)

**Updating the résumé:** replace `public/resume/Jagadeeswar-Reddy-Supply-Chain-Analyst-CV.pdf`
(keep the name, or update `resume.href` in `src/content/site.ts`), then update `pages`, `size`
and `updated` in the same object, and regenerate the preview image `public/images/ui/cv-page.jpg`.

## Configuration

Copy these into `.env.local` (or your host's environment settings) as needed:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for canonical/Open Graph metadata |
| `RESEND_API_KEY` | Enables direct sending from the contact form via [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Inbox that receives form messages |
| `CONTACT_FROM_EMAIL` | Sender address on a domain verified in Resend |

Without the Resend variables the form does not pretend to send: its button reads **Open email draft**
and it opens a pre-filled message in the visitor's email app, stating that nothing has been sent yet.
`/api/contact` needs a Node server (for example Vercel or `npm start`); on a purely static host the
form automatically uses the email-draft path.

## Motion and accessibility

- Each section follows the motion table in the master document (durations, distances, staggers and
  order), for example: the hero's line-by-line headline, the About collage sequence, the container
  lowered on its cables in "Why choose me?", the crane swinging in on Projects before the title, the
  campus settling on Education before its notes and connector lines, the résumé card rising 36px.
  Shared timings live in `src/app/globals.css` (reveal system); section choreography sits next to
  each component.
- Smooth inertial scrolling (Lenis, frame-based easing) on mouse/trackpad devices; touch devices keep
  native scrolling. A smooth cursor (a precise dot and a gliding ring) appears on mouse/trackpad
  devices only.
- Everything that moves on the menu, header and page change animates transform or opacity only, so it
  runs on the GPU: the menu slides in as one layer, a single white highlight glides between its rows,
  and pages cross-fade without a white flash. The menu's panel and rows animate `transform` itself
  (not Motion's `x`/`y`), which Motion hands to the compositor, so the slide stays smooth while the
  page underneath is busy.
- The menu is loaded once the browser is idle and then stays mounted (closed), with its previews
  fetched and decoded, so it opens on the next frame. It is not loaded through `next/dynamic`,
  because React holds back a suspended component for about 300 ms and the first opening lagged.
  Opening makes one style pass: reads happen before writes, the scrollbar is compensated with an
  inline `padding-right` on `body` (not an inherited custom property on `html`), and the page is made
  `inert` only once the panel covers it.
- Reveal animations are CSS-driven and progressive: without JavaScript nothing is hidden. The `js`
  class that arms them is set by a plain inline script in `<head>`, so it is in place before the first
  paint (`next/script`'s `beforeInteractive` is queued until the Next.js runtime loads, which made
  content paint visible, fade out, then reveal).
- `prefers-reduced-motion` removes parallax, reveals, floating and smooth scrolling.
- One `h1` per page, labelled landmarks, focus moved to the page heading after navigation,
  full keyboard support in the menu (Escape, arrow keys, focus trap), tabs and dashboards,
  44 × 44 px touch targets, and a table view for every chart.

## Phones and tablets

Many visitors open the link on a phone first, so the phone layout carries the same content, images and
interactions as desktop, rearranged rather than removed:

- Every image, card, note and data label on desktop appears on phones and tablets. The only
  differences are deliberate: fewer month labels on one chart axis, decorative rings in the
  Experience hero, and the Skills side panel shown inside each card instead.
- Demo-data and simulated-result labels are never hidden at any size.
- Reveals fire as content enters the screen (92% line below 1024px, 80% on desktop). Content that
  arrives by scrolling on a narrow screen runs its desktop choreography delays at 30% (at most
  360ms); a page's opening screen keeps its full sequence (`.rv-scroll`, `RevealObserver`).
- Hover effects are for mouse and trackpad only (`@media (hover: hover)`), so nothing stays
  "stuck" after a tap; taps get a short press instead of the browser's grey flash. Controls that
  open on hover also open on the first tap (keyboard focus opens them too; a tap's focus does not).
- Swipeable filter row on Projects, a four-column segmented control for the Control Tower views, and
  at least 24px tap circles on the NovexAI map.
- The menu fits phones held sideways (it scrolls, rows never overlap its footer), and its quick links
  move to its footer below 1024px.
- Checked at 360, 375, 390 and 430px wide, 844 × 390 landscape and 768 × 1024: no page scrolls
  sideways, and images stay at 2× density or better (the sky photographs are at their full size).

## Quality checks (development only)

With the site running, and Google Chrome installed at the default path:

```bash
node scripts/qa/interactions.mjs --url http://localhost:3000   # functional, accessibility, phone and tablet checks
node scripts/qa/pages.mjs --vp desktop --out qa-shots           # first-screen captures of every page
```

`npm run generate:maps` rebuilds the map geometry (`src/content/geo/`, `public/images/geo/`).

## Content decisions

The CV (`Jagadeeswar Reddy___CV.pdf`) is the factual source; the briefs set the visual direction.

- **Résumé card:** shows the actual file — 1 page, 555 KB, updated September 2026 — rather than the
  brief's placeholder "2 pages, updated 2025".
- **Not published (not in the CV):** the "Why choose me" sector expertise (aviation, maritime,
  agriculture), "3+ years", and the draft portfolio totals (10+ projects, 25%+ efficiency, 100K+
  records). Callouts instead describe CV-backed work along the chain: plan, source, stock, move, measure.
- **Results are labelled by type:** "built and delivered", "model performance" (84% accuracy),
  "simulated outcome" (18% fewer late deliveries) and "modelled outcome" (22% lower holding cost).
- **"Why choose me?":** the reference's layout, container and stats row, with CV-backed reasons
  (reporting automation, supplier analytics, inventory optimization, predictive logistics, process
  automation) and CV-backed numbers (2+ years, 15+ KPIs, 100+ vendors).
- **Dashboards:** the Shipment Control Tower, Detail View and Inventory Analytics screenshots show
  third-party products (project44, C3 AI and a BI tool), so they appear as rebuilt working interfaces
  with labelled demonstration data. The Power BI Supplier Performance & Risk Intelligence Center is
  Jagadeeswar's own report and is shown as supplied, with its figures described as sample data.
- **Education visual:** the supplied MBS School of Business photograph, as in the Education reference;
  the journey map sits beside the qualifications.
- **Experience landing:** built from the design supplied in chat (warehouse photo, diagonal blue band,
  "2 Years Turning Supply Chain Data Into Better Decisions"); the type, marks and button are live.
- **Footer container:** the sector labels painted on the reference's container door are replaced by
  the five links of the chain used on the About page (Plan, Source, Stock, Move, Measure).
- **Contact reference:** the reference footer's placeholder name ("GIREESH") is replaced with
  Jagadeeswar Reddy; no GitHub or Instagram links are shown because none were provided.
- **Typography:** one family, Inter (variable, with optical sizes), used everywhere.

## Image sources

All photographs of Jagadeeswar were cut out from the supplied reference images (no faces were
generated or altered). Every other image is also taken from the master document's references:
the hero sky and container layers; the MBS campus; the Wipro and ICodeTest logos and the three
project thumbnails (Experience reference); the crane, orange container and sky, separated into layers
(Projects reference); the blue container and its sky and container yard (Why Choose Me reference);
the open container full of cartons (footer reference); the pallet, truck, scanner, warehouse rack
and clipboard (Skills references); and the Power BI supplier report, plus the warehouse photograph from the supplied Experience
design. Type baked into the references was removed so that all copy on the site is live text.

**HD pass:** every photograph and cut-out was upscaled 2x from its original crop with EDSR
(OpenCV `dnn_superres`), a faithful super-resolution model: it sharpens edges and texture without
generating new detail, and no face-restoration model was used, so faces are unchanged. Cut-outs keep
their original soft edge; the HD detail is used inside it.
