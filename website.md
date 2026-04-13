# fra-cto.com Marketing Website

## Stack & Deployment
- Next.js 16 static export, Tailwind v4, shadcn/ui, Montserrat (single family, weights 300-800, used for both sans and mono slots)
- Custom spring physics engine (~2KB, zero deps) for all animations
- Cloudflare Pages (preset **None**, not "Next.js"), build output: `out`
- Repo: Axelrod77/fra-cto-website (repo root = `website/` contents)
- Domain: fra-cto.com, www.fra-cto.com, fra-cto-website.pages.dev
- Backend: Cloudflare D1 for Team Quick Scan API

## Pages
1. **Home** (`/`) — Dark navy, full-viewport scroll snap, branded loader, Turk video hero, spring-physics cards
2. **Quick Scan** (`/quick-scan`) — Light page. Solo (client-side) or Team (D1 backend) mode, 14 MCQs across 12 dimensions
3. **Team Dashboard** (`/quick-scan/team?code=X`) — Light page. Composite scores, per-dimension variance, individual responses
4. **Express Interest** (`/express-interest`) — Light page. Web3Forms submission, shows score banner from Quick Scan

## Design System
- **White-first** (#FFFFFF bg, navy #0D1B2A text) with teal #0097A7 as the splash accent (buttons, numerals, highlights)
- `.light-page` CSS class is now a no-op alias of root (kept so existing Quick Scan / Express Interest pages keep compiling)
- `.dark-section` opt-in helper available for any future navy-splash section (inverse tokens, navy bg)
- Legacy aliases retained: `--color-plum` → navy, `--color-periwinkle` → teal
- Scroll snap: `scroll-snap-type: y mandatory`, sections sized `calc(100vh - 65px)`
- Spring animations: entrance fade-up, magnetic hover, tilt, stagger. Reduced-motion: snap to target.
- Typography: Montserrat everywhere. `--font-geist-sans` + `--font-mono` both map to Montserrat (mono slot kept for `.font-mono` class usage on labels/accents — tabular feel without a second font load).

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
- `src/app/sitemap.ts` requires `export const dynamic = "force-static"` (Next 16 + `output: "export"` — omission causes CF Pages build failure)

## Security & Discoverability
- **security.txt** served by Cloudflare native tool (Security Center → Configurations → Security.txt) — overrides `public/.well-known/security.txt` at the edge
- **DMARC** `p=quarantine` on `fra-cto.com` and `send.fra-cto.com` (Cloudflare DNS TXT `_dmarc`, `_dmarc.send`)
- **Bot Fight Mode OFF** — intentional, preserves LLM crawler access (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot)
- **Cloudflare "Block AI Scrapers" OFF** — required for robots.txt allow-list to take effect
- `public/robots.txt` + `src/app/sitemap.ts` opt-in for search + LLM indexing
