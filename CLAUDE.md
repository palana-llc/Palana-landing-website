# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
```

There are no tests in this project.

## Architecture

This is a **Next.js 16 App Router** site for Palana, a campus safety platform. The app is built with TypeScript, Tailwind CSS v4, and uses **Sanity CMS** as the content backend.

### Pages

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/about/team` | `app/about/team/page.tsx` |
| `/about/news` | `app/about/news/page.tsx` |
| `/impact` | `app/impact/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/getstarted` | `app/getstarted/page.tsx` |
| `/studio` | `app/studio/[[...index]]/page.tsx` — embedded Sanity Studio |

### Sanity CMS

Sanity is used for all dynamic content. The studio is embedded at `/studio`.

**Schemas** (`sanity/schemaTypes/documents/`):
- `news` — title, description, image, link (url), date
- `people` — name, image, role, team (`"Founder" | "Mobile Dev" | "UI/UX" | "Web Dev"`), founder (bool), current (bool), linkedin
- `pastContributors` — name, role, cohort (e.g. `"SP25"`, `"AU25"`)

**Fetching data**: Use `sanityFetch()` from `sanity/lib/live.ts` for simple queries, or `client.fetch()` from `sanity/lib/client.ts` directly for parallel queries (see `app/about/team/page.tsx`). All data fetching happens in server components via GROQ queries.

### Styling

Components use **dedicated CSS files** in `app/css/` (e.g. `navbar.css`, `hero.css`, `team.css`) imported globally in `app/layout.tsx`. Tailwind utility classes are used alongside these CSS files. Do not use CSS Modules.

### Component conventions

- `app/components/` — shared/global components (Navbar, Footer, Hero, etc.)
- `app/<page>/components/` — page-specific components
- All page components are `async` server components when they need data from Sanity
