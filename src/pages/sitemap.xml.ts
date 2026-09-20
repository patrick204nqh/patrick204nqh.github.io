import type { APIRoute } from 'astro';

const site = 'https://patrick204nqh.com';
const paths = ['/', '/projects', '/blog'];

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${site}${p}</loc></url>`).join('\n')}
</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );