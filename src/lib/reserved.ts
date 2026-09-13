/**
 * Slugs that belong to hand-built pages.
 *
 * Landing pages live at the root (/my-campaign/), so if an editor happened to
 * name one "services" it would collide with the real Services page. Those
 * slugs are skipped when generating landing-page routes — the hand-built page
 * always wins.
 */
export const RESERVED_SLUGS = new Set([
  '',
  'ar',
  'services',
  'benefits',
  'about',
  'contact',
  'blog',
  'social-media',
  'white-papers',
  'og',
  'robots.txt',
  'sitemap.xml',
  'sitemap-index.xml',
  '404',
]);

export function isReserved(slug: string | undefined | null): boolean {
  if (!slug) return true;
  return RESERVED_SLUGS.has(slug.replace(/^\/+|\/+$/g, ''));
}
