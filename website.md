# fra-cto.com Marketing Website

## Overview
Public marketing site for FraCTO at **fra-cto.com**. Separate from the assessment portal.

## Tech Stack
- Next.js 16 static export (`output: "export"`)
- Tailwind v4, shadcn/ui components, Inter font
- **Midnight Executive** design system: Navy (#0D1B2A) + Teal (#0097A7) — matches LSEG pitch decks
- **Backend:** Cloudflare D1 (SQLite on edge) + Pages Functions for Team Quick Scan API

## Repository & Deployment
- **Code:** `website/` directory in fraCTO project
- **GitHub repo:** Axelrod77/fra-cto-website (repo root = website/ contents)
- **Hosting:** Cloudflare Pages (free tier)
  - Framework preset: **None** (NOT "Next.js" — that triggers Workers/OpenNext which fails with static export)
  - Build command: `npm run build`
  - Build output directory: `out`
- **Domain:** fra-cto.com (bought on Cloudflare, DNS auto-configured)
- **Custom domain:** www.fra-cto.com added
- **Live URLs:** fra-cto.com, fra-cto-website.pages.dev

## Pages (4)
1. **Home** (`/`) — split hero (Turk video left + 1770 storytelling right, CTAs inline), "The enterprise AI challenge" section (neutral framing: misaligned incentives / strategy-execution gap / organizational complexity), how-it-works (3 steps), founders section (roles + credentials, no names), services cards (no pricing), inline express interest form
2. **Quick Scan** (`/quick-scan`) — mode selection (Solo vs Team), 14 MCQ questions across 12 dimensions, instant scoring with maturity badges and dimension breakdown bars, CTA to express interest after results. Score + maturity level passed to Express Interest via query params.
3. **Team Dashboard** (`/quick-scan/team?code=X7K2P9`) — composite score from all respondents, per-dimension variance with spread indicator (warning on spread > 1.0), individual responses table, Express Interest CTA with composite data
4. **Express Interest** (`/express-interest`) — standalone form page. Shows score banner when arriving from Quick Scan (solo or team). Team composite context (response count, team code) included in Web3Forms email.

## Key Files
```
website/
├── next.config.ts              # output: "export", images unoptimized
├── public/logo.svg             # Logo mark (teal/dark geometric triangle)
├── src/app/
│   ├── globals.css             # Midnight Executive CSS vars (navy/teal) + Tailwind theme
│   ├── layout.tsx              # Inter font, SEO metadata, og tags
│   ├── icon.svg                # Favicon (auto-served by Next.js App Router)
│   ├── page.tsx                # Landing page (all sections)
│   ├── quick-scan/page.tsx     # Solo/Team mode selection + questionnaire
│   ├── quick-scan/team/page.tsx # Team dashboard (composite + variance)
│   └── express-interest/page.tsx
├── src/components/
│   ├── site-header.tsx         # Sticky header with logo, nav (Quick Scan + Express Interest)
│   ├── site-footer.tsx         # Logo, nav links, copyright
│   ├── express-interest-form.tsx  # Reusable form component (used on home + standalone)
│   └── ui/                     # shadcn: button, card, input, label, radio-group, textarea
├── src/data/
│   └── questionnaire.ts        # 14 quick scan modules + maturity levels (copied from portal)
├── src/lib/
│   ├── scoring.ts              # computeScores() — MCQ lookup, dimension avg, overall avg
│   ├── api.ts                  # Typed fetch client for Team Scan API (4 endpoints)
│   └── utils.ts                # cn() helper
├── functions/api/              # Cloudflare Pages Functions (D1 backend)
│   ├── _helpers.ts             # Shared types, validation, invite code generation
│   ├── sessions.ts             # POST: create team session
│   ├── sessions/[code].ts      # GET: session + responses + composite
│   ├── sessions/[code]/join.ts # POST: validate invite code
│   └── sessions/[code]/respond.ts # POST: submit team member answers
├── schema.sql                  # D1 migration (team_sessions + team_responses)
└── wrangler.toml               # D1 binding config
```

## Express Interest Form
- **Service:** Web3Forms (free, 250 emails/mo)
- **Env var:** `NEXT_PUBLIC_WEB3FORMS_KEY` (set in Cloudflare Pages env vars)
- **Fields:** Name* (100), Email* (254), Company* (200), Role/Title (100), Message (2000) — all have `maxLength` limits
- Shows success checkmark on submit, error message on failure
- Gracefully handles missing key (shows note instead of breaking)
- `NEXT_PUBLIC_WEB3FORMS_KEY` is intentionally client-side (public form key, like Firebase config — security via domain allowlisting, not key secrecy)

## Quick Scan Details
- 14 questions (not 10 like portal originally had — expanded to 12 dimensions)
- Dimensions: Software Robustness, Data Readiness, Process Standardization, Automation Scale, Digital Culture, Security & Compliance, Vendor Ecosystem, AI/ML Current State, Business Model, Technology Landscape, Spends, Value
- Scoring: MCQ option score (1-5) → average per dimension → overall average
- 5 maturity bands: Foundational (red), Emerging (orange), Developing (yellow), Advanced (teal), Leading (navy)
- Progress bar at top during questions
- **Solo mode:** client-side only, instant results, no backend
- **Team mode:** Cloudflare D1 backend, invite code system (6-char alphanumeric, excludes I/O/0/1)
  - Create session → get invite code → share with team → each fills independently → composite dashboard
  - Composite = average of all respondents' dimension scores
  - Spread = max - min per dimension (warning icon on spread > 1.0 = team disagrees)
  - Individual responses table with name, role, overall score, time submitted
  - "Copy Results" button on solo results page

## Team Scan D1 Setup (one-time)
```
npx wrangler d1 create fracto-team-scans
# paste database_id into wrangler.toml
npx wrangler d1 execute fracto-team-scans --remote --file=schema.sql
```
Then in Cloudflare Dashboard → Pages → Settings → Functions → D1 bindings: variable `DB` → database `fracto-team-scans`

## Design System — Midnight Executive (March 2026 Rebrand)
Previously used Plum (#3D1F3E) + Periwinkle (#8B8FCF) — warm, purple-leaning. Rebranded to match LSEG pitch deck palette for brand consistency across all client-facing collaterals.

| Token | Old (Plum/Periwinkle) | New (Midnight Executive) |
|-------|----------------------|--------------------------|
| Primary | #3D1F3E (plum) | #0D1B2A (midnight navy) |
| Accent | #8B8FCF (periwinkle) | #0097A7 (teal) |
| Background | #FAFAFE (warm white) | #F7F9FB (cool white) |
| Muted sections | #F0F0F8 (lavender) | #EDF2F7 (slate-tinted) |
| Body text | #3D1F3E (plum) | #263238 (charcoal) |
| Muted text | #6B5A6C (purple-grey) | #78909C (blue-grey) |
| Borders | #D4D5E8 (lavender) | #CFD8DC (slate) |

Key visual changes:
- **Split hero** section: Turk video left, 1770 storytelling right (dark navy bg, matches deck title slides)
- **Dark navy footer** (matches deck footer bars)
- **Teal CTA buttons** and accent badges
- **Teal left-border** on problem cards (deck motif)
- **Teal top-border** on founder cards
- **Teal step circles** in How It Works
- **Dark navy Express Interest section** at bottom of home page
- CSS vars use legacy `--color-plum` / `--color-periwinkle` aliases pointing to new values so existing component code doesn't need rewriting
- **Outline buttons on dark sections** need explicit `bg-transparent` — shadcn's `outline` variant applies `bg-background` (white) which makes white text invisible on navy backgrounds

## Security Posture
- **Rate limiting:** Cloudflare CDN provides DDoS protection. Web3Forms rate-limits on their end (250/mo free tier). D1 endpoints have no explicit rate limiting (low traffic expected).
- **Input validation:** HTML `required` + `type="email"` + `maxLength` on all form fields. Server-side `validateString()` on all Pages Function inputs. React JSX auto-escapes output (no XSS surface). No `dangerouslySetInnerHTML` anywhere.
- **API keys:** Only `NEXT_PUBLIC_WEB3FORMS_KEY` — intentionally public. D1 binding is server-side only (not exposed to client). No hardcoded secrets in source. OWASP compliant.

## Design Decisions
- No pricing shown on website (removed per founder request)
- No founder names — only roles (Senior IT Leader, Serial Entrepreneur, AI-Native Technologist) + credentials
- Logo: `brand/logo-mark.svg`
- **Copy tone:** neutral/positive — no "getting stuck", no finger-pointing. Problem section = "The enterprise AI challenge" (misaligned incentives, strategy-execution gap, organizational complexity) — teal/dark geometric triangle with gradient faces

## Cloudflare Pages Gotcha
Do NOT select "Next.js" as the framework preset — it triggers OpenNext/Wrangler Workers deployment which fails with `output: "export"` (missing `pages-manifest.json`). Use preset "None" instead.
