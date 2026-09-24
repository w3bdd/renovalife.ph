# RenovaLife Dialysis Center

Immersive single-page website for RenovaLife Dialysis Center — *Renewing Lives. Restoring Hope. Delivering Quality Care.* React + FastAPI + MongoDB.

```
frontend/   React 19, Tailwind, framer-motion, lenis  (static, deploys anywhere)
backend/    FastAPI + MongoDB                         (appointment enquiries API)
```

## Local development

```bash
# backend (http://localhost:8001)
cd backend
pip install -r requirements.txt
cp .env.example .env          # set MONGO_URL, DB_NAME
python server.py

# frontend (http://localhost:3000)
cd frontend
yarn install
cp .env.example .env          # set REACT_APP_BACKEND_URL=http://localhost:8001
yarn start
```

## How the appointment form works per hosting target

| Deployment | Behavior |
|---|---|
| Full-stack (VPS / Emergent) | `REACT_APP_BACKEND_URL` is set at build time → form POSTs to `/api/enquiries`, stored in MongoDB, visitor gets a reference number |
| Static-only (GitHub Pages, no backend) | env var left empty → form opens the visitor's email app with a pre-filled message to the center |

Because GitHub Pages is HTTPS-only, a backend used with it must also be served over **HTTPS**, and `CORS_ORIGINS` must include the Pages origin.

## Deploy: GitHub Pages (frontend)

The build is static-host ready (`homepage: "."` in `package.json`, no client-side routing, no platform trackers outside Emergent domains).

**Automated** — a ready workflow lives at `.github/workflows/deploy-pages.yml` (it auto-detects whether your repo root is the app root with `frontend/` inside, or the frontend files directly):

1. Push the repo to GitHub — make sure the hidden `.github/` folder is included.
2. Repo → **Settings → Pages → Source: GitHub Actions** (required, or the deploy job fails).
3. Optional: add secret `REACT_APP_BACKEND_URL` (your VPS API URL) under **Settings → Secrets and variables → Actions**. Leave it unset for the email-fallback mode.
4. Push to `main` or `master` — the site publishes to `https://<user>.github.io/<repo>/`.

**Manual**:

```bash
cd frontend
REACT_APP_BACKEND_URL="https://api.your-domain.com" yarn build
# publish frontend/build/ to any static host (gh-pages branch, Netlify, S3, …)
```

## Deploy: VPS (backend)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt uvicorn
cp .env.example .env   # MONGO_URL, DB_NAME, CORS_ORIGINS=https://<user>.github.io
python server.py       # or: uvicorn server:app --host 0.0.0.0 --port 8001
```

Recommended production setup:

- **Process manager**: `uvicorn server:app` behind systemd (or `gunicorn -k uvicorn.workers.UvicornWorker server:app`).
- **Reverse proxy**: nginx or Caddy terminating TLS (Let's Encrypt) → `http://127.0.0.1:8001`.
- **CORS**: set `CORS_ORIGINS` to your exact frontend origin(s), comma-separated, instead of `*`.
- **MongoDB**: local `mongod` or a managed cluster; only `MONGO_URL` / `DB_NAME` are required.

API surface: `GET /api/health`, `POST /api/enquiries`, `GET /api/enquiries`.
