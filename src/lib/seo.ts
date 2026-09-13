/**
 * JSON-LD structured-data builders.
 *
 * JSON-LD is a small block of JSON in the page's <head> that spells out, in a
 * format search engines understand, what the page *is* — an organisation, an
 * article, a breadcrumb trail. It's what powers rich results in Google.
 *
 * Each function here returns a plain object; the SEO component serialises it
 * into a <script type="application/ld+json"> tag.
 */
import type { Lang } from './i18n';

export type SocialLink = { platform?: string; url?: string };

/**
 * Organization — who runs this site. Belongs on the home page.
 * `sameAs` is the list of official profiles that represent the same entity;
 * it's how Google links your site to your social accounts.
 */
export function organizationSchema(opts: {
  name: string;
  legalName?: string;
  url: string;
  logo: string;
  socialLinks?: SocialLink[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: opts.name,
    ...(opts.legalName ? { legalName: opts.legalName } : {}),
    url: opts.url,
    logo: opts.logo,
    ...(opts.socialLinks?.length
      ? { sameAs: opts.socialLinks.map((s) => s.url).filter(Boolean) }
      : {}),
  };
}

/**
 * WebSite — describes the site itself. Belongs on the home page,
 * alongside Organization.
 */
export function webSiteSchema(opts: {
  name: string;
  url: string;
  description?: string;
  lang: Lang;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: opts.name,
    url: opts.url,
    ...(opts.description ? { description: opts.description } : {}),
    inLanguage: opts.lang,
  };
}

/**
 * Article — one blog post. This is what can earn a headline + image +
 * publish date in search results.
 */
export function articleSchema(opts: {
  headline: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  publisherName: string;
  publisherLogo: string;
  lang: Lang;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    ...(opts.description ? { description: opts.description } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    url: opts.url,
    ...(opts.image ? { image: [opts.image] } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ?? opts.datePublished
      ? { dateModified: opts.dateModified ?? opts.datePublished }
      : {}),
    ...(opts.authorName
      ? { author: { '@type': 'Person', name: opts.authorName } }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: opts.publisherName,
      logo: { '@type': 'ImageObject', url: opts.publisherLogo },
    },
    inLanguage: opts.lang,
  };
}

/**
 * BreadcrumbList — the Home › Blog › This Post trail.
 * Used on any page that sits below the top level.
 */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQPage — a list of questions and answers.
 *
 * Google's rule: only mark up questions that are visible on the page. This is
 * used on the home page, built from the same list the FAQ accordion renders.
 *
 * Since 2023 Google shows FAQ rich results only for well-known government and
 * health websites, so this is unlikely to change how the page looks in Google.
 * It is still valid markup that other search engines and AI answer tools read.
 */
export function faqPageSchema(items: unknown) {
  if (!Array.isArray(items)) return null;
  const mainEntity = items
    .filter(
      (pair): pair is [string, string] =>
        Array.isArray(pair) && typeof pair[0] === 'string' && typeof pair[1] === 'string',
    )
    .map(([q, a]) => [q.trim(), a.trim()] as const)
    .filter(([q, a]) => q.length > 0 && a.length > 0)
    .map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    }));
  if (mainEntity.length === 0) return null;
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
}
