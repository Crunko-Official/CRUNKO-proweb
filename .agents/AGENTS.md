# CRUNKO Developer Agent Rules & Guidelines

Welcome, developer agent! This project, **CRUNKO**, is a modern web application for an eco-friendly organic snack brand specializing in modernizing traditional Indonesian "Yangko" sweets (plant-based, organic, waste-free, and highlighting local flavors).

This document serves as the ground-truth guide for the architecture, directories, styling patterns, database integration, and key workflows in this codebase. Refer to it whenever you add features, refactor components, or debug.

---

## 🏗️ Project Architecture & Tech Stack

This project is built using:
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (inline theme definitions in CSS, modern grid structures)
- **Database & Auth**: Supabase (via `@supabase/ssr` and `@supabase/supabase-js`)
- **Runtime & Deployment**: Node.js/npm

---

## 📁 Codebase Directory Structure

Here is a breakdown of the key directories in the project:

- **/app**: Next.js pages and layouts.
  - [app/layout.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/app/layout.tsx): Root application layout wrapping the app with [LayoutShell.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/components/LayoutShell.tsx).
  - [app/globals.css](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/app/globals.css): Tailwind CSS v4 styling rules, custom theme colors, and animations.
  - [app/page.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/app/page.tsx): Main landing hero page showcasing Crunko values and CTA.
  - **/admin**: The admin dashboard workspace.
    - [app/admin/page.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/app/admin/page.tsx): Redirects users directly to the login portal.
    - [app/admin/login/page.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/app/admin/login/page.tsx): Interactive administrative login interface using Supabase Auth.
    - [app/admin/dashboard/page.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/app/admin/dashboard/page.tsx): Protected dashboard panel.
  - **/products**, **/impact**, **/story**, **/artikel**, **/ide-daur-ulang**, **/contact**: Public customer-facing sections (many contain placeholders to be developed).
- **/components**: Shared visual components.
  - [components/Sidebar.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/components/Sidebar.tsx): Global sidebar navigation for all customer-facing routes.
  - [components/LayoutShell.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/components/LayoutShell.tsx): Layout wrapper that manages sidebar visibility (hides sidebar on `/admin` pages).
  - [components/index.tsx](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/components/index.tsx): Exposes reusable layout components like `SectionHeading`, `ProductCard`, `MetricCard`, `StatBar`, `TimelineItem`, and form components.
- **/lib**: Configuration adapters.
  - [lib/supabaseClient.ts](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/lib/supabaseClient.ts): Browser client builder for client components.
  - [lib/supabaseServerClient.ts](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/lib/supabaseServerClient.ts): Async Server client builder reading/writing secure cookies.
  - [lib/supabaseMiddlewareClient.ts](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/lib/supabaseMiddlewareClient.ts): Context client builder for middleware-based session handling.
- **/scripts**: Server-side initialization utilities.
  - [scripts/seed-admin.ts](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/scripts/seed-admin.ts): Seeding utility for initializing administrative users directly in Supabase Auth.

---

## 🎨 Design System & Custom Styling

The styling system relies on **Tailwind CSS v4** with a custom inline theme.

### 🎨 Curated Colors (Defined in `app/globals.css`)
Make sure to use the brand colors below instead of generic Tailwind defaults:
* **Background & Warmth**: `bg-brand-cream` (`#FCF9F2`), `bg-brand-warm` (`#F5EDE0`), `bg-brand-sand` (`#E8DDCE`)
* **Beiges**: `bg-brand-beige` (`#F0E6D3`), `bg-brand-beige-dark` (`#E0D0B5`)
* **Primary Greens**: `bg-brand-green` (`#5B8C5A`), `bg-brand-green-light` (`#E8F4E8`), `bg-brand-green-dark` (`#3D6B3C`)
* **Typography & Accents**: `text-brand-dark` (`#2D3A2D`), `bg-brand-accent` (`#8FB996`)

### ⚡ Built-in Animations & Transitions
Avoid using static layouts where possible; use the custom animation classes:
* `animate-float`: Subtle up-and-down hovering for product mockups and illustrations.
* `animate-blob`: Morphing circular organic shapes (perfect for decorative blurs).
* `animate-fade-in-up`: Smooth upward fade-in transitions.
* `animate-scale-in`: Soft scale entry effect.

---

## 🔐 Authentication & Supabase Conventions

To keep sessions synchronized between client components, server components, and middleware, use the appropriate client builders:

1. **Client Components (`"use client"`)**:
   ```typescript
   import { createClient } from "@/lib/supabaseClient";
   const supabase = createClient();
   ```
2. **Server Components (`async` layouts/pages/actions)**:
   ```typescript
   import { createServerSupabaseClient } from "@/lib/supabaseServerClient";
   const supabase = await createServerSupabaseClient();
   ```
3. **Middleware**:
   Use [lib/supabaseMiddlewareClient.ts](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/lib/supabaseMiddlewareClient.ts) if creating a root `middleware.ts` to refresh expired tokens and manage path guards dynamically.

---

## 🛠️ Scripts & Commands

Manage the application server and development using these scripts defined in [package.json](file:///Users/haidaralifawwaz/Documents/CRUNKO-proweb/package.json):

* **Run Development Server**:
  ```bash
  npm run dev
  ```
* **Seed Administrator Credentials**:
  Before running, make sure the environment file `.env` has all values populated (specifically `SUPABASE_SERVICE_ROLE_KEY`).
  ```bash
  npm run seed-admin
  ```
* **Build Application Bundle**:
  ```bash
  npm run build
  ```
* **Lint Files**:
  ```bash
  npm run lint
  ```
