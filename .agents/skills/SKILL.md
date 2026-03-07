---
name: Fashion101 Discovery
description: Context and conventions for the Fashion101 independent fashion discovery platform
---

# Fashion101 Discovery

## Project Overview
A high-end, minimalist discovery feed for independent fashion. Users take a style quiz (or skip it) and get a personalized, filterable product feed.

**Live URL:** `fashion101-git-main-gshost1s-projects.vercel.app`

## Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Icons:** lucide-react
- **Deployment:** Vercel (auto-deploy on push to `main`)
- **Env vars:** `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Database Schema
```
brands: id, name, created_at
products: id, title, price, image_url, buy_url, brand_id (FK→brands), style, category, social_url, created_at
```
- `style`: gorpcore | streetwear | classic
- `category`: outerwear | tops | bottoms | footwear | accessories
- `social_url`: brand Instagram profile URL
- Currently 37 products across 7 brands

## Key Files
| File | Purpose |
|---|---|
| `utils/supabase.ts` | ONLY Supabase client entry point |
| `app/page.tsx` | Server component — quiz routing + data fetch |
| `components/StyleQuiz.tsx` | Client-side 3-question quiz with cookie persistence |
| `components/DiscoveryFeed.tsx` | Client component — filter drawer + product grid |
| `app/product/[id]/page.tsx` | Product detail: image, price, buy link, social link |
| `app/retake/route.ts` | Route handler — clears cookie, redirects to `/` |
| `app/loading.tsx` | Dark-themed loading spinner |
| `mission.md` | Project goals and agent protocol |

## User Flow
1. First visit → Style Quiz (3 questions) or "Skip → Browse All"
2. Result saved to `user_style` cookie → redirect to `/?style=<result>`
3. Feed shows products with slide-out Filter/Sort drawer (Sort By, Style, Category)
4. Click card → `/product/[id]` detail page with price + buy link + Instagram
5. "Retake Quiz" → `/retake` clears cookie → back to quiz

## Filter/Sort Drawer
- **Sort By:** Newest, Price Low→High, Price High→Low, A-Z
- **Style:** Multi-select accordion (only in "Browse All" mode)
- **Category:** Multi-select accordion (Outerwear, Tops, Bottoms, Footwear, Accessories)
- Expandable: new filters = new `AccordionSection` + `useState`

## Design Conventions
- Dark theme: `bg-[#0a0a0a]`
- Font: Geist (loaded in `layout.tsx`)
- Neutral color palette (neutral-500, neutral-800, white)
- Cards: `rounded-2xl`, `border border-neutral-800`, hover scale on images
- Drawer: slides in from right, backdrop blur, accordion sections with +/- icons

## Agent Protocol
1. **Gemini:** Architect — defines logic, schema, and data strategy
2. **Claude:** Developer — implements UI and TypeScript
3. **Antigravity:** Operator — scrapes data and runs deployments

## Important Constraints
- The anon key CANNOT run DDL SQL (ALTER TABLE, CREATE TABLE). Schema changes must be done in the Supabase SQL Editor manually.
- Patagonia images are hotlink-protected. Use Unsplash fallbacks if scraping their CDN.
- Always push to `main` to trigger Vercel deployment.
- Database writes take effect immediately on the live site (no deploy needed).
