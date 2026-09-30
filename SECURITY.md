# Security & Privacy

CinemaScope is a static site: there is no server and no account system.

## What is stored, and where

| Data | Where | Shared? |
| --- | --- | --- |
| Reviews (name, rating, text) | Your browser's `localStorage` | No. Never leaves your device |
| Film data | Requested from TMDB | TMDB sees the request, as with any website |

No cookies, analytics or trackers are used. Clearing your browser data deletes your reviews.

## The TMDB API key

A website that calls an API directly from the browser **cannot fully hide its key**: anyone can read it in
DevTools. What this project does about it:

1. **Not in the repository.** `.env` is git-ignored. The key for deployment is stored as the GitHub Actions
   secret `VITE_TMDB_API_KEY`.
2. **Optional proxy (recommended for real privacy).** [`worker/tmdb-proxy.js`](worker/tmdb-proxy.js) is a small
   Cloudflare Worker that holds the key server-side and only answers requests from this site. Set the repo
   *variable* `VITE_TMDB_PROXY_URL` to the worker URL and leave the secret empty, and the built site contains no key.
3. **Rotate if exposed.** If a key was ever published, generate a new one at
   <https://www.themoviedb.org/settings/api> and revoke the old one. TMDB keys are read-only, so the worst case
   is someone using up your rate limit.

## Hardening in the build

- A strict **Content Security Policy** limits scripts, styles, images and network calls to this site, TMDB and
  Google Fonts.
- `Referrer-Policy` is set so full page URLs are not sent to other sites.
- Source maps are off in production.
- Review text is rendered by React (escaped), inputs are length-limited, and stored data is validated when read.
- Unused dependencies (Firebase) were removed to shrink the attack surface.

## Reporting a problem

Open a private security advisory on the GitHub repository.
