/**
 * robots.txt
 *
 * Generated rather than hand-written so the sitemap URL always matches
 * whatever domain the site is built for (PUBLIC_SITE_URL). Allows all
 * crawlers, as requested.
 *
 * Ends up at /robots.txt in the built site.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() ?? 'https://www.tariki360.ae').replace(/\/+$/, '');

  const body = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${base}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
