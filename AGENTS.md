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
- Photography lives in `public/images/` with descriptive filenames and is referenced by
  root-relative paths (`/images/...`). Nothing loads from an external image CDN, so the site
  renders on networks that block third-party hosts. The hero image is eager; everything else
  is lazy-loaded.

## Cinematic scroll film

- The hero film is the client-supplied villa video, stored locally in `public/media/`:
  `villa-scroll.mp4` (1920×1080, ~6 MB, audio stripped), `villa-scroll-mobile.mp4` (960 px
  wide, ~0.9 MB, used below 820 px viewport) and `villa-poster.jpg` (frame 0, also preloaded
  from `index.html`). All three were produced from the same source with
  `-movflags +faststart`; without that flag the `moov` atom trails the media data and
  `loadedmetadata` waits for the whole download.
- The film is **never played**. `src/hooks/useScrollVideo.ts` maps the scroll progress of the
  tall pinned hero (`h-[460vh] lg:h-[520vh]` in `Hero.tsx`) onto `video.currentTime` on every
  animation frame, easing towards the target so a fast flick never leaves the decoder behind.
  Scrolling up reverses the film. Keep the element `muted`/`playsInline` and never call
  `play()`; seeking is what advances it.
- Overlay copy (headline plus the three chapters) is driven by the same per-frame callback and
  written straight to element styles — no React state per frame, so scrolling stays at 60 fps.
- `prefers-reduced-motion` swaps the film for the poster and drops the pinning; the loading
  curtain (`Preloader`) only appears for the scrubbed path.
- To regenerate the assets from a new upload (ffmpeg is not installed on the sandbox host, so
  run it in a container):
  `docker run --rm -v "$PWD/public/media:/m" mwader/static-ffmpeg:latest -i /m/source.mp4 -c copy -an -movflags +faststart /m/villa-scroll.mp4`

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
