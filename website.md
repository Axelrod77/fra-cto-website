# fra-cto.com Marketing Website

## Stack & Deployment
- Next.js 16 static export, Tailwind v4, shadcn/ui, Montserrat (single family, weights 300-800, used for both sans and mono slots)
- Custom spring physics engine (~2KB, zero deps) for all animations
- Cloudflare Pages (preset **None**, not "Next.js"), build output: `out`
- Repo: Axelrod77/fra-cto-website (repo root = `website/` contents)
- Domain: fra-cto.com, www.fra-cto.com, fra-cto-website.pages.dev
- Backend: Cloudflare D1 for Team Quick Scan API

## Pages
1. **Home** (`/`) — White-first, full-viewport scroll snap, branded loader, Turk video hero (1/1 square aspect on desktop, 4/5 mobile), editorial image split on Challenge (landscape 4/3 image), 4-step "How It Works" (Quick Scan → Assess 2wk → Align 2–4wk → A'xecute ~6mo), Founders journey arrow (IT Leader → AI-Native → Entrepreneur), spring-physics cards, fixed right-side `ScrollIndicator` (lg+ only, to avoid overlap at tablet widths) tracking active section
2. **Quick Scan** (`/quick-scan`) — Light page. Solo (client-side) or Team (D1 backend) mode, 14 MCQs across 12 dimensions
3. **Team Dashboard** (`/quick-scan/team?code=X`) — Light page. Composite scores, per-dimension variance, individual responses
4. **Express Interest** (`/express-interest`) — Light page. Web3Forms submission, shows score banner from Quick Scan

## Design System
- **White-first** (#FFFFFF bg, navy #0D1B2A text) with teal #0097A7 as the splash accent (buttons, numerals, highlights)
- **Header + footer**: solid teal (#0097A7) background with white text. Logo inverted to white (`brightness-0 invert`). Express Interest button is white with teal text (inverted contrast). Tagline separator is `·` (middle dot), not an em dash.
- `.light-page` CSS class is now a no-op alias of root (kept so existing Quick Scan / Express Interest pages keep compiling)
- `.dark-section` opt-in helper available for any future navy-splash section (inverse tokens, navy bg)
- Legacy aliases retained: `--color-plum` → navy, `--color-periwinkle` → teal
- Scroll snap: `scroll-snap-type: y mandatory`, sections sized `calc(100vh - 65px)`
- Spring animations: entrance fade-up, magnetic hover, tilt, stagger. Reduced-motion: snap to target.
- Typography: Montserrat everywhere. `--font-geist-sans` + `--font-mono` both map to Montserrat (mono slot kept for `.font-mono` class usage on labels/accents — tabular feel without a second font load).
- Editorial image split (PA-Consulting-inspired): Challenge section uses 2-col `grid` with copy + 3-pillar "18 × 12 × E2E" stats vs landscape photo (`public/1.png`, `aspect-[4/3]`). Founders now uses a 3-col journey arrow instead of a photo split. Keep editorial sections under the snap-section height (≤ viewport) or they clip.
- Hero section has no eyebrow SectionLabel — heading starts directly with "In 1770…". Video is `aspect-[1/1]` on desktop (square crop).
- Challenge stat boxes (18/12/E2E) use `flex flex-col h-full` with `flex-1` on the description to ensure equal box heights.
- `SectionLabel` eyebrow labels are `text-xs font-mono font-bold` with `tracking-[0.24em]`; section h2s use `font-bold` for stronger hierarchy.
- `ScrollIndicator` (`src/components/scroll-indicator.tsx`): fixed right-edge dots, listens to `.snap-scroll` scroll, active section = `round(scrollTop / clientHeight)`. Only visible at `lg` breakpoint (≥1024px) to prevent overlap at tablet widths. Update `CHAPTERS` array when adding/removing home sections. Current chapters: Intro, Challenge, How it works, Founders, Services, Contact (6).
- **Copy tone**: no em dashes anywhere in body copy. Anti-AI writing rules apply: no "delve/landscape/robust/leverage/utilize/straightforward/game-changer/crucial/realm/foster/embark" and no "moreover/furthermore/additionally/in conclusion" transitions.

## Express Interest Form
- Web3Forms (free, 250/mo). Env var: `NEXT_PUBLIC_WEB3FORMS_KEY` (intentionally client-side)
- Fields: Name*, Email*, Company*, Role/Title, Message

## Quick Scan
- 12 dimensions, 5 maturity bands (Foundational → Leading), MCQ scoring (1-5 avg)
- Team mode: D1 backend, 6-char invite codes, composite dashboard with spread warnings

## Gotchas
- Cloudflare Pages preset must be "None" (not "Next.js" — that triggers OpenNext which fails with static export)
- D1 binding: variable `DB` → database `fracto-team-scans` (set in Pages → Settings → Functions)
- No pricing on website (founder request). No founder names — roles + credentials only.
- Copy tone: neutral/positive, no finger-pointing. Audience is **dual** (startups + GCCs + enterprises) — avoid "enterprise"-only framing in headlines.
- Challenge section is partner-friendly on purpose: names MS/AWS/TCS/Databricks/Snowflake/OpenAI/Anthropic as collaborators ("not in competition, but in orchestration"). Source of truth for this narrative + the 3 phases is the LSEG pitch deck (slides 3, 4, 11). Canonical phase timings: Assess 2 wk, Align 2–4 wk, A'xecute ~6 mo.
- `src/app/sitemap.ts` requires `export const dynamic = "force-static"` (Next 16 + `output: "export"` — omission causes CF Pages build failure)

## Security & Discoverability
- **security.txt** served by Cloudflare native tool (Security Center → Configurations → Security.txt) — overrides `public/.well-known/security.txt` at the edge
- **DMARC** `p=quarantine` on `fra-cto.com` and `send.fra-cto.com` (Cloudflare DNS TXT `_dmarc`, `_dmarc.send`)
- **Bot Fight Mode OFF** — intentional, preserves LLM crawler access (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot)
- **Cloudflare "Block AI Scrapers" OFF** — required for robots.txt allow-list to take effect
- `public/robots.txt` + `src/app/sitemap.ts` opt-in for search + LLM indexing
