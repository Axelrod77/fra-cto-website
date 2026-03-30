# fra-cto.com Marketing Website

## Overview
Public marketing site for FraCTO at **fra-cto.com**. Separate from the assessment portal.

## Tech Stack
- Next.js 16 static export (`output: "export"`)
- Tailwind v4, shadcn/ui components, Inter + JetBrains Mono fonts
- **Midnight Executive** design system: Navy (#0D1B2A) + Teal (#0097A7) — matches LSEG pitch decks
- **Custom spring physics engine** — zero-dependency, ~2KB, inspired by chenglou.me
- **Dark-first design** — editorial layout inspired by dany.works
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
1. **Home** (`/`) — Dark-first editorial layout. Branded loader (`initializing_` with blinking cursor, 800ms, session-skipped). Split hero (Turk video + 1770 storytelling, spring entrance animations). "The enterprise AI challenge" section (left-aligned editorial, staggered reveals). How-it-works (horizontal stepper with teal connecting line). Founders section (spring-physics cards: magnetic cursor follow, 2° tilt, lift shadow). Services cards (spring hover, light background contrast break). Express interest form (navy-mid card). All sections use 10px uppercase monospace section labels.
2. **Quick Scan** (`/quick-scan`) — Light-page override. Mode selection (Solo vs Team), 14 MCQ questions across 12 dimensions, instant scoring with maturity badges and dimension breakdown bars, CTA to express interest after results. Score + maturity level passed to Express Interest via query params.
3. **Team Dashboard** (`/quick-scan/team?code=X7K2P9`) — Light-page override. Composite score from all respondents, per-dimension variance with spread indicator (warning on spread > 1.0), individual responses table, Express Interest CTA with composite data.
4. **Express Interest** (`/express-interest`) — Light-page override. Standalone form page. Shows score banner when arriving from Quick Scan (solo or team). Team composite context (response count, team code) included in Web3Forms email.

## Key Files
```
website/
├── next.config.ts                 # output: "export", images unoptimized
├── public/logo.svg                # Logo mark (teal/dark geometric triangle)
├── src/app/
│   ├── globals.css                # Dark-first CSS vars, Midnight Executive tokens, .light-page override
│   ├── layout.tsx                 # Inter + JetBrains Mono fonts, Loader component, SEO metadata
│   ├── icon.svg                   # Favicon (auto-served by Next.js App Router)
│   ├── page.tsx                   # Landing page (imports section components)
│   ├── quick-scan/page.tsx        # Solo/Team mode selection + questionnaire (light-page)
│   ├── quick-scan/team/page.tsx   # Team dashboard (light-page)
│   └── express-interest/page.tsx  # Standalone form page (light-page)
├── src/components/
│   ├── sections/                  # Homepage section components
│   │   ├── hero.tsx               # Turk video + storytelling + spring entrance
│   │   ├── challenge.tsx          # 3 numbered items, staggered reveals
│   │   ├── how-it-works.tsx       # 3-step horizontal stepper
│   │   ├── founders.tsx           # 3 spring-physics cards with magnetic hover
│   │   ├── services.tsx           # 3 spring-physics cards on light background
│   │   └── express-interest.tsx   # Form section with navy-mid card
│   ├── site-header.tsx            # Sticky dark header with backdrop-blur, white text, teal accents
│   ├── site-footer.tsx            # Single-line footer with teal top border
│   ├── express-interest-form.tsx  # Reusable form component (used on home + standalone)
│   ├── loader.tsx                 # Branded intro (initializing_ cursor, 800ms, session-skip)
│   ├── section-label.tsx          # 10px uppercase monospace label (teal or navy)
│   ├── spring-card.tsx            # Card with spring tilt/magnetic/entrance
│   ├── spring-button.tsx          # Button with spring scale on hover
│   ├── stagger-group.tsx          # IntersectionObserver + staggered spring entrances
│   └── ui/                        # shadcn: button, card, input, label, radio-group, textarea
├── src/hooks/
│   ├── use-spring.ts              # useSyncExternalStore wrapper for single spring value
│   └── use-spring-transform.ts    # Higher-level: hover, entrance, magnetic via direct DOM writes
├── src/lib/
│   ├── spring.ts                  # Spring physics solver (createSpring, springStep, springIsSettled)
│   ├── spring-manager.ts          # Singleton RAF loop, batched writes, auto-stop, reduced-motion
│   ├── scoring.ts                 # computeScores() — MCQ lookup, dimension avg, overall avg
│   ├── api.ts                     # Typed fetch client for Team Scan API (4 endpoints)
│   └── utils.ts                   # cn() helper
├── src/data/
│   └── questionnaire.ts           # 14 quick scan modules + maturity levels
├── functions/api/                 # Cloudflare Pages Functions (D1 backend)
│   ├── _helpers.ts                # Shared types, validation, invite code generation
│   ├── sessions.ts                # POST: create team session
│   ├── sessions/[code].ts         # GET: session + responses + composite
│   ├── sessions/[code]/join.ts    # POST: validate invite code
│   └── sessions/[code]/respond.ts # POST: submit team member answers
├── schema.sql                     # D1 migration (team_sessions + team_responses)
└── wrangler.toml                  # D1 binding config
```

## Spring Physics Engine
Custom zero-dependency spring animation system inspired by chenglou.me's game-engine approach:

- **`spring.ts`**: Semi-implicit Euler solver (stiffness=170, damping=26, mass=1). Softer than chenglou's k=290 for corporate feel.
- **`spring-manager.ts`**: Singleton RAF loop. Auto-starts when springs register, auto-stops when all settled. Respects `prefers-reduced-motion` — snaps to target instantly. Caps dt at 64ms to prevent spiral-of-death after tab suspension.
- **`use-spring-transform.ts`**: Attaches pointer events for magnetic/tilt hover, IntersectionObserver for entrance animations. Writes directly to `element.style.transform` (bypasses React render for performance). Desktop-only hover via `matchMedia('(pointer: fine)')`.

Card interactions: magnetic cursor follow (3px), subtle tilt (2°), scale (1.02), lift shadow. Entrance: 24px translateY + opacity spring, staggered by index.

## Design System — Dark-First Editorial (March 2026 v2)

### Design Inspirations
- **dany.works**: Dark-first design, 10px uppercase monospace section labels, staggered entrance animations, branded loading state, minimal chrome
- **chenglou.me**: Spring physics for all animations, magnetic cursor hover, interruptible transitions, zero-dependency approach, RAF render loop

### Color Tokens (Dark-First)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-navy` | #0D1B2A | Primary background (homepage) |
| `--color-navy-mid` | #1B2A3D | Card backgrounds on dark sections |
| `--color-navy-light` | #243447 | Hover states on dark sections |
| `--color-teal` | #0097A7 | Accent, CTAs, section labels |
| `--color-teal-dark` | #00796B | CTA hover states |
| `--color-text-primary` | #E0E7EE | Primary text on dark backgrounds |
| `--color-text-secondary` | #8B9DAF | Body text on dark backgrounds |
| `--color-text-muted` | #5A6F82 | Subtle text, timestamps |
| `--color-light-bg` | #F7F9FB | Light section backgrounds |
| `--color-light-text` | #0D1B2A | Text on light sections |
| `--color-light-muted` | #4A6274 | Body text on light sections |

### Light Page Override
Quick Scan, Team Dashboard, and Express Interest pages use `.light-page` CSS class which resets `--background`, `--foreground`, `--card`, `--border`, `--input` to light values. This preserves existing page styling while the homepage goes dark-first.

### Typography
- **Body:** Inter (via next/font/google, variable `--font-geist-sans`)
- **Accents:** JetBrains Mono (via next/font/google, variable `--font-mono`) — used for section labels, step numbers, credentials, loader text
- **Section labels:** 10px, uppercase, tracking-[0.2em], font-mono, font-medium

### Animation Patterns
- **Loader:** Logo + `initializing_` blinking cursor, 800ms (500ms mobile), spring fade-out, sessionStorage skip on revisit
- **Entrance:** Spring fade-up (24px translateY + opacity), triggered by IntersectionObserver at 10% threshold
- **Stagger:** Children animated sequentially (100ms desktop, 60ms mobile) via StaggerGroup component
- **Card hover:** Magnetic cursor follow + tilt + scale, desktop only (pointer: fine)
- **Button hover:** Spring scale 1.0→1.04
- **Reduced motion:** All springs snap to target instantly, no animation

### Legacy Aliases
CSS vars `--color-plum` / `--color-periwinkle` still map to navy/teal so existing Quick Scan page code doesn't need rewriting.

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

## Security Posture
- **Rate limiting:** Cloudflare CDN provides DDoS protection. Web3Forms rate-limits on their end (250/mo free tier). D1 endpoints have no explicit rate limiting (low traffic expected).
- **Input validation:** HTML `required` + `type="email"` + `maxLength` on all form fields. Server-side `validateString()` on all Pages Function inputs. React JSX auto-escapes output (no XSS surface). No `dangerouslySetInnerHTML` anywhere.
- **API keys:** Only `NEXT_PUBLIC_WEB3FORMS_KEY` — intentionally public. D1 binding is server-side only (not exposed to client). No hardcoded secrets in source. OWASP compliant.

## Design Decisions
- No pricing shown on website (removed per founder request)
- No founder names — only roles (Senior IT Leader, Serial Entrepreneur, AI-Native Technologist) + credentials
- Logo: `brand/logo-mark.svg`
- **Copy tone:** neutral/positive — no "getting stuck", no finger-pointing. Problem section = "The enterprise AI challenge" (misaligned incentives, strategy-execution gap, organizational complexity)
- **Dark-first rationale:** Homepage is dark (navy) by default, with light sections as contrast breaks. Conveys technical sophistication appropriate for a tech consultancy. Light-page override preserves UX for interactive pages (Quick Scan, forms).

## Cloudflare Pages Gotcha
Do NOT select "Next.js" as the framework preset — it triggers OpenNext/Wrangler Workers deployment which fails with `output: "export"` (missing `pages-manifest.json`). Use preset "None" instead.
