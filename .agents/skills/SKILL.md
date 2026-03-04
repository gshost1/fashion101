---
name: Fashion101 Discovery
description: Context and conventions for the Fashion101 independent fashion discovery platform
---

# Fashion101 Discovery

## Project Overview
A high-end, minimalist discovery feed for independent fashion. Users take a style quiz and get a personalized product feed.

**Live URL:** `fashion101-git-main-gshost1s-projects.vercel.app`

## Tech Stack
- **Frontend:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (via GitHub integration from `gshost1/fashion101`)
- **Env vars:** `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Database Schema
```
brands: id, name, created_at
products: id, title, price, image_url, buy_url, brand_id (FK→brands), style, social_url, created_at
```
- `style` is one of: `gorpcore`, `streetwear`, `classic`
- `social_url` is the brand's Instagram profile URL
- Currently 34 products across 7 brands

## Key Files
| File | Purpose |
|---|---|
| `utils/supabase.ts` | ONLY Supabase client entry point |
| `app/page.tsx` | Main page — quiz or filtered feed based on cookie/URL param |
| `components/StyleQuiz.tsx` | Client-side 3-question quiz, saves result to cookie |
| `app/product/[id]/page.tsx` | Product detail: image, price, buy link, social link |
| `app/retake/route.ts` | Route handler — deletes cookie, redirects to `/` |
| `app/loading.tsx` | Dark-themed loading spinner |
| `mission.md` | Project goals and agent protocol |

## User Flow
1. First visit → Style Quiz (3 questions)
2. Result saved to `user_style` cookie → redirect to `/?style=<result>`
3. Feed shows filtered products for that style
4. Click card → `/product/[id]` detail page with price + buy link + Instagram
5. "Retake Quiz" → `/retake` clears cookie → back to quiz

## Design Conventions
- Dark theme: `bg-[#0a0a0a]`
- Font: Geist (loaded in `layout.tsx`)
- Neutral color palette (neutral-500, neutral-800, white)
- Cards: `rounded-2xl`, `border border-neutral-800`, hover scale on images
- Premium, editorial feel — no bright colors, no clutter

## Agent Protocol
1. **Gemini:** Architect — defines logic and schema changes
2. **Claude:** Developer — implements UI and TypeScript
3. **Antigravity:** Operator — scrapes data and runs deployments

## Important Notes
- The anon key CANNOT run DDL SQL (ALTER TABLE, CREATE TABLE). Schema changes must be done in the Supabase SQL Editor manually.
- Patagonia images are hotlink-protected. Use Unsplash fallbacks if scraping their CDN.
- Always push to `main` to trigger Vercel deployment.
- Database writes take effect immediately on the live site (no deploy needed).
