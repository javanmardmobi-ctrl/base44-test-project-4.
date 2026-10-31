# Base44 sandbox notes

## What this repo is
A single static page: `index.html` at the repo root. No build step, no dependencies,
no backend, no database. `README.md` is just a title.

## How it runs here
`docker-compose.base44.yml` runs `python -m http.server 3000 --bind 0.0.0.0`
from the `python:3.12-slim` image with the repo bind-mounted at `/site`.

- Edits to `index.html` are served immediately (files are read per request), so no
  rebuild or restart is needed after changing the page.
- Host port 3000 is the preview entry point.
- There is no application code/config to gate on `BASE44_PREVIEW_MODE`; the variable
  is passed through untouched for parity with other Base44 setups.

## Verify it works
```sh
docker compose -f docker-compose.base44.yml up -d
curl -s http://localhost:3000/ | head -5   # should return the Hello Base44 page
docker compose -f docker-compose.base44.yml ps  # web should be (healthy)
```
