import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The sandbox preview reaches the dev server through a proxy whose Host header is
// `<port>-<sandbox id>.<sandbox host domain>`. The sandbox id rotates, so we allow the
// whole domain as a wildcard while running in preview mode, and leave Vite's default
// host checking untouched everywhere else.
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN
const allowedHosts =
  process.env.BASE44_PREVIEW_MODE === '1' && sandboxHostDomain ? [`.${sandboxHostDomain}`] : []

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    ...(allowedHosts.length > 0 ? { allowedHosts } : {}),
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET ?? 'http://api:8000',
        changeOrigin: true,
      },
    },
  },
})
