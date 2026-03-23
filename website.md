# fra-cto.com Marketing Website

## Overview
Public marketing site for FraCTO at **fra-cto.com**. Separate from the assessment portal.

## Tech Stack
- Next.js 16 static export (`output: "export"`)
- Tailwind v4, shadcn/ui components, Inter font
- **Midnight Executive** design system: Navy (#0D1B2A) + Teal (#0097A7) — matches LSEG pitch decks
- No backend — pure static HTML

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

## Pages (3)
1. **Home** (`/`) — hero ("It looks like AI. It works because of the human inside."), problem statement, how-it-works (3 steps), founders section (roles + credentials, no names), comparison table (FraCTO vs MBB vs Big IT), services cards (no pricing), inline express interest form
2. **Quick Scan** (`/quick-scan`) — 14 MCQ questions across 12 dimensions, instant scoring with maturity badges and dimension breakdown bars, CTA to express interest after results
3. **Express Interest** (`/express-interest`) — standalone form page

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
│   ├── quick-scan/page.tsx     # Embedded quick scan with scoring
│   └── express-interest/page.tsx
├── src/components/
│   ├── site-header.tsx         # Sticky header with logo, nav (Quick Scan + Express Interest)
│   ├── site-footer.tsx         # Logo, nav links, copyright
│   ├── express-interest-form.tsx  # Reusable form component (used on home + standalone)
│   └── ui/                     # shadcn: button, card, input, label, radio-group, textarea
├── src/data/
│   └── questionnaire.ts        # 14 quick scan modules + maturity levels (copied from portal)
└── src/lib/
    ├── scoring.ts              # computeScores() — MCQ lookup, dimension avg, overall avg
    └── utils.ts                # cn() helper
```

## Express Interest Form
- **Service:** Web3Forms (free, 250 emails/mo)
- **Env var:** `NEXT_PUBLIC_WEB3FORMS_KEY` (set in Cloudflare Pages env vars)
- **Fields:** Name*, Email*, Company*, Role/Title, Message
- Shows success checkmark on submit, error message on failure
- Gracefully handles missing key (shows note instead of breaking)

## Quick Scan Details
- 14 questions (not 10 like portal originally had — expanded to 12 dimensions)
- Dimensions: Software Robustness, Data Readiness, Process Standardization, Automation Scale, Digital Culture, Security & Compliance, Vendor Ecosystem, AI/ML Current State, Business Model, Technology Landscape, Spends, Value
- Scoring: MCQ option score (1-5) → average per dimension → overall average
- 5 maturity bands: Foundational (red), Emerging (orange), Developing (yellow), Advanced (teal), Leading (navy)
- Progress bar at top during questions
- Self-contained — no Supabase dependency

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
- **Dark navy hero** section (matches deck title slides)
- **Dark navy footer** (matches deck footer bars)
- **Teal CTA buttons** and accent badges
- **Teal left-border** on problem cards (deck motif)
- **Teal top-border** on founder cards
- **Teal step circles** in How It Works
- **Dark navy Express Interest section** at bottom of home page
- CSS vars use legacy `--color-plum` / `--color-periwinkle` aliases pointing to new values so existing component code doesn't need rewriting

## Design Decisions
- No pricing shown on website (removed per founder request)
- No founder names — only roles (Senior IT Leader, Serial Entrepreneur, AI-Native Technologist) + credentials
- Logo: `brand/logo-mark.svg` — teal/dark geometric triangle with gradient faces

## Cloudflare Pages Gotcha
Do NOT select "Next.js" as the framework preset — it triggers OpenNext/Wrangler Workers deployment which fails with `output: "export"` (missing `pages-manifest.json`). Use preset "None" instead.
