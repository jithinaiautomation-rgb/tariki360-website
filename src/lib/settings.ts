/**
 * Site settings — the site name, default description, default share image and
 * social links that an editor manages in Sanity.
 *
 * Every page needs these, so the result is cached in memory for the duration
 * of the build. Sanity is queried once, not once per page.
 */
import { fetchSanity, urlFor } from './sanity';
import { SITE_SETTINGS_QUERY } from './queries';
import type { SanityImageSource } from './sanity';
import type { SocialLink } from './seo';

export type SiteSettings = {
  siteName: string;
  defaultDescription: string;
  defaultShareImage: SanityImageSource;
  organisationLegalName?: string;
  socialLinks?: SocialLink[];
};

/**
 * Used until the siteSettings document exists in Sanity, so the site is
 * never missing a title or description.
 */
const FALLBACK: SiteSettings = {
  siteName: 'Tariki 360',
  defaultDescription:
    "AI-driven career mapping for students across the UAE and the Middle East. Discover your child's strengths, ideal subjects and best-fit careers in 20–30 minutes.",
  defaultShareImage: null,
  organisationLegalName: 'NABD Consultancies & Training · CLAP Smart Learn',
  socialLinks: [],
};

let cache: SiteSettings | null = null;

export async function getSiteSettings(): Promise<SiteSettings> {
  if (cache) return cache;
  const data = await fetchSanity<SiteSettings>(SITE_SETTINGS_QUERY, {}, FALLBACK);
  cache = { ...FALLBACK, ...data };
  return cache;
}

/**
 * The absolute URL of the default share image.
 * Falls back to the logo in /public so there is always *something* for
 * Facebook and Twitter to show.
 */
export function defaultShareImageUrl(
  settings: SiteSettings,
  site: URL | string | undefined,
): string {
  const base = (site ? site.toString() : 'https://www.tariki360.ae').replace(/\/+$/, '');
  if (settings.defaultShareImage?.asset) {
    return urlFor(settings.defaultShareImage).width(1200).height(630).fit('crop').url();
  }
  return `${base}/logo.png`;
}
