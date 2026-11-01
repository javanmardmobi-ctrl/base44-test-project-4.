# Horizon Properties — repository notes

Two services run in the sandbox via `docker-compose.base44.yml`:

- `web` — Vite dev server (React + TypeScript + Tailwind), host port 3000 → container 5173.
- `api` — small Express service (`server/index.mjs`) on container port 8000, used only for
  `POST /api/contact`. Vite proxies `/api` to it, so the browser stays on a single origin.

## Non-obvious setup facts

- `package-lock.json` is committed and both services install with `npm ci` at container start
  (the `web` and `api` services keep separate `node_modules` volumes). The API installs with
  `--omit=dev`, so it only gets `express`.
- Contact submissions are appended to `contact-submissions.ndjson` in the `api_data` volume
  (`/var/lib/horizon`), never inside the repo.
- The Vite config adds a `.${BASE44_SANDBOX_HOST_DOMAIN}` allowed-host wildcard only when
  `BASE44_PREVIEW_MODE === '1'`; outside preview mode Vite's default host checking applies
  unchanged. The dev server binds `0.0.0.0` so the preview proxy can reach it.
- Photography is loaded from the Unsplash CDN. No image files are stored in the repo.

## Verifying

```bash
docker compose -f docker-compose.base44.yml up -d --build
curl -s http://localhost:3000/ | head
curl -s -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test Client","email":"test@example.com","phone":"(555) 111-2222","interest":"Luxury Villa","message":"Looking for a lakeside home."}'
```

Type check and production build run inside the web container:

```bash
docker compose -f docker-compose.base44.yml exec -T web npm run typecheck
docker compose -f docker-compose.base44.yml exec -T web npm run build
```
