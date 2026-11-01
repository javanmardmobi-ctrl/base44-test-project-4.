# Horizon Properties

A premium real estate website for a luxury property brand — React, TypeScript, Vite and
Tailwind CSS, with a small Express service that stores contact enquiries.

## Run it locally

```bash
docker compose -f docker-compose.base44.yml up -d
```

- Site: http://localhost:3000
- API health: `GET /api/health` on the API service (proxied at http://localhost:3000/api/health)

Without Docker:

```bash
npm install
npm run dev     # Vite on http://localhost:5173, proxies /api to http://localhost:8000
npm run api     # Express API on http://localhost:8000
```

## Structure

```
src/
  components/layout/    Header, Footer
  components/sections/  Hero, About, FeaturedProperties, CtaBanner, Services,
                        WhyChooseUs, Team, Testimonials, Contact
  components/ui/        Reveal, SectionHeading, PropertyCard, PropertyDialog,
                        CarouselControls, StatCounter, LegalDialog, Logo, ViewCursor
  context/              EnquiryContext (pre-selects a property interest)
  data/                 properties, agents, services, site details, legal copy
  hooks/                useActiveSection, useScrolled
  lib/                  contact submission client, form validation
server/index.mjs        contact submission API (JSON line storage)
```

Properties, agents, services and testimonials are typed data modules, so they can be swapped
for an API or CMS without touching the components.

## Scripts

- `npm run dev` — dev server
- `npm run build` — type check + production build
- `npm run typecheck` — TypeScript only
- `npm run api` — API service
