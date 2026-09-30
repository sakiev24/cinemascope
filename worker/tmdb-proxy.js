// Optional Cloudflare Worker that keeps the TMDB key server-side.
// Deploy it, add TMDB_API_KEY as a Worker secret, then set the repo variable
// VITE_TMDB_PROXY_URL to the worker URL and remove VITE_TMDB_API_KEY from the build.
const ALLOWED_ORIGIN = 'https://sakiev24.github.io';

export default {
    async fetch(request, env) {
        const origin = request.headers.get('Origin');
        const cors = {
            'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
            'Access-Control-Allow-Methods': 'GET',
            Vary: 'Origin',
        };

        if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
        if (request.method !== 'GET' || origin !== ALLOWED_ORIGIN) {
            return new Response('Forbidden', { status: 403 });
        }

        const url = new URL(request.url);
        const upstream = new URL(`https://api.themoviedb.org/3${url.pathname}`);
        url.searchParams.forEach((value, key) => {
            if (key !== 'api_key') upstream.searchParams.set(key, value);
        });
        upstream.searchParams.set('api_key', env.TMDB_API_KEY);

        const res = await fetch(upstream, { cf: { cacheTtl: 300, cacheEverything: true } });
        return new Response(res.body, {
            status: res.status,
            headers: { ...cors, 'Content-Type': res.headers.get('Content-Type') ?? 'application/json' },
        });
    },
};
