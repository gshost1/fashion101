# MISSION: Fashion101 Discovery
**Objective:** A high-end, minimalist discovery feed for independent fashion — personalized by style, filterable by category, and designed for editorial curation at scale.

**Live:** `fashion101-git-main-gshost1s-projects.vercel.app`

---

## System Architecture
- **Frontend:** Next.js 15 (App Router), Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel (auto-deploy on push to `main`)
- **Icons:** lucide-react
- **Design:** Dark theme (`bg-[#0a0a0a]`), Geist font, neutral palette, editorial feel

## Database Schema
```
brands (id, name, created_at)
products (id, title, price, image_url, buy_url, brand_id→brands, style, category, social_url, created_at)
```
- `style`: gorpcore | streetwear | classic
- `category`: outerwear | tops | bottoms | footwear | accessories
- `social_url`: brand Instagram profile URL

## Current Inventory
37 products across 7 brands:
- **Gorpcore:** Patagonia, Story mfg., Online Ceramics
- **Streetwear:** Stussy, Pleasures, Story mfg., Online Ceramics
- **Classic:** Brain Dead (Brooks Brothers collab), A.P.C.

## Key Files
| File | Role |
|---|---|
| `utils/supabase.ts` | ONLY Supabase client entry point |
| `app/page.tsx` | Server component — quiz routing + data fetch |
| `components/StyleQuiz.tsx` | 3-question style quiz with cookie persistence |
| `components/DiscoveryFeed.tsx` | Client component — filter drawer + product grid |
| `app/product/[id]/page.tsx` | Product detail: image, price, buy link, social |
| `app/retake/route.ts` | Route handler — clears cookie, redirects to quiz |
| `app/loading.tsx` | Dark-themed loading spinner |

## User Flow
1. **Quiz** → 3 questions determine style (or "Skip → Browse All")
2. **Cookie** → `user_style` persists result for return visits
3. **Feed** → Filtered product grid with slide-out Filter/Sort drawer
4. **Product** → Detail page with price, Shop Now, Instagram link
5. **Retake** → `/retake` clears cookie, restarts quiz

## Filter/Sort Drawer
- **Sort By:** Newest, Price Low→High, Price High→Low, A-Z
- **Style:** Multi-select (only in "Browse All" mode)
- **Category:** Multi-select (Outerwear, Tops, Bottoms, Footwear, Accessories)
- Expandable architecture — adding new filters = new `AccordionSection` + state

## Skills & Automation
| Skill | Purpose |
|---|---|
| `.agents/skills/SKILL.md` | Full project context for any AI agent |
| `.agents/skills/fashion-curator.yaml` | Strict product scraping → SQL generation (human-reviewed) |

## The "Agent" Protocol
1. **Gemini:** Architect. Defines logic, schema, and data strategy.
2. **Claude:** Developer. Implements UI, TypeScript, and component architecture.
3. **Antigravity:** Operator. Scrapes data, runs deployments, manages database.

## Important Constraints
- Supabase anon key **cannot** run DDL SQL — schema changes require the SQL Editor
- Patagonia CDN is hotlink-protected — use Unsplash fallbacks if scraping
- Database writes take effect immediately (no deploy needed)
- Push to `main` triggers Vercel deployment automatically
