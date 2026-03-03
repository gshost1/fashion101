# MISSION: Fashion101 Discovery
**Objective:** Create a high-end, minimalist discovery feed for independent fashion.

## System Architecture
- **Frontend:** Next.js 15 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Core Logic
- `app/page.tsx` handles the main feed.
- `utils/supabase.ts` is the ONLY entry point for DB queries.
- Schema: `brands` (id, name) -> `products` (id, title, price, image_url, buy_url, brand_id).

## The "Agent" Protocol
1. **Gemini:** Architect. Defines the logic and schema changes.
2. **Claude:** Developer. Implements the UI and TypeScript.
3. **Antigravity:** Operator. Scrapes data and runs Vercel deployments.
