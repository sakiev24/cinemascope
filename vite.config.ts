import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Locks the production page down to the origins it actually needs.
// Build-only: the dev server needs inline scripts for hot reload.
const contentSecurityPolicy = (proxyUrl?: string): Plugin => ({
  name: 'csp',
  apply: 'build',
  transformIndexHtml() {
    const connect = ["'self'", 'https://api.themoviedb.org']
    if (proxyUrl) connect.push(new URL(proxyUrl).origin)

    const policy = [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' https://fonts.googleapis.com",
      "font-src https://fonts.gstatic.com",
      "img-src 'self' data: https://image.tmdb.org",
      `connect-src ${connect.join(' ')}`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')

    return [{ tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: policy }, injectTo: 'head-prepend' }]
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), contentSecurityPolicy(env.VITE_TMDB_PROXY_URL)],
    base: '/cinemascope/', // Must match your GitHub repo name
    build: { sourcemap: false },
  }
})
