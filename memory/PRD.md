# RenovaLife Dialysis Center — PRD

## Original Problem Statement
A full website concept for "RenovaLife Dialysis Center" — a fictional private, community-focused dialysis center in Angeles City, Pampanga, Philippines. Brand: "Renewing Lives. Restoring Hope. Delivering Quality Care." Concept: Renewal • Hope • Quality Care. Required sections: hero, services (5 categories), why-us, mission/vision/values, patient resources + FAQ, facility, team, testimonials, contact/appointment form. Design brief called for an Awwwards-level art direction: kinetic masked hero reveal, numbered manifesto chapters, slow editorial marquee, parallax/3D hero moment, framer-motion scroll reveals, Lenis smooth scrolling.

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind CSS, framer-motion, lenis, lucide-react, sonner. Single-page immersive site at `/` with anchored sections.
- Backend: FastAPI (`server.py`), routes prefixed `/api`. Motor (async MongoDB) with `PyObjectId`/`BaseDocument` pattern.
- DB: MongoDB via `MONGO_URL`/`DB_NAME` env. Collection: `enquiries`.

## User Personas
- CKD/dialysis patients researching a center
- Families & caregivers seeking info and support
- Referring physicians/healthcare professionals

## Implemented (2026-07-21... build date: session 1)
- Kinetic hero: masked line-by-line reveal, VitalFlow canvas ring animation, parallax clipped-arch photo, floating trust badges
- Slow editorial marquee band (CSS animation, pause on hover)
- Numbered manifesto chapters (dark section, sticky heading, outlined numbers)
- 5-card bento services grid (hemodialysis, renal support, family support, referral, quality & safety)
- Why RenovaLife (sticky image + numbered differentiators)
- About: animated Mission/Vision/Core Values tabs
- Facility showcase: 4 spotlight image cards + spec chips
- Team: leadership cards (Dr. Adrian M. Reyes, Dr. Daniel Rafael Navarro) + 3 care-team photo cards
- Testimonials (clearly marked fictional placeholders)
- FAQ accordion (6 Q&A) + "Talk to our care team" callout
- Appointment/enquiry form → POST /api/enquiries (validated), sonner toast with reference ID
- GET /api/enquiries (list, newest first), GET /api/health
- Footer: emergency banner, contact/hours, quick links, fictional-concept disclaimer
- Lenis momentum scrolling, grain overlay, custom fonts (Cormorant Garamond / Plus Jakarta Sans / JetBrains Mono)

## Implemented (session 2 — deployment portability)
- Contact form functional on GitHub Pages: REACT_APP_BACKEND_URL baked at build time → posts to VPS-hosted API; when unset (static-only), form falls back to a pre-filled email to the center
- GitHub Pages readiness: `homepage: "."` in package.json (relative asset paths), `.github/workflows/deploy-pages.yml` (build + deploy via Actions, REACT_APP_BACKEND_URL as repo secret)
- Platform decoupling: PostHog/emergent-main.js removed from index.html, injected at runtime only on Emergent-hosted domains; built HTML verified tracker-free
- VPS readiness: `python server.py` entrypoint (HOST/PORT env), backend/frontend `.env.example` files, full README with local dev, Pages, and VPS (uvicorn/nginx/TLS/CORS) instructions
- Verified: `yarn build` passes (42s), build/index.html uses `./static/...` relative paths, backend restart + POST /api/enquiries OK, preview form submit OK

## Verification Done
- curl: /api/health OK; POST /api/enquiries 201 with id; GET /api/enquiries lists stored entries (incl. browser-submitted entry)
- Screenshots: hero, services, facility, team, footer, FAQ open state, form submit with success toast — all pass; no app console errors

## Backlog
- P1: Admin view page for enquiries (currently API-only at /api/enquiries)
- P1: Email notification on new enquiry (e.g., Resend)
- P1: News & Health Resources section (kidney health articles)
- P2: Embedded map for the location
- P2: Downloadable patient handbook PDF
- P2: Replace fictional testimonials/photos with real, consented content
- P2: Multi-page routing (separate About/Services pages) if SEO depth needed
