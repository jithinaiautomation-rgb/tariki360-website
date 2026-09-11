/**
 * Language + URL helpers.
 *
 * The site is built twice: English at the root (/services/) and Arabic under
 * an /ar/ prefix (/ar/services/). Both are real files on disk, so search
 * engines can read and rank the Arabic pages — which is the whole reason we
 * moved off the old in-browser language toggle.
 */

export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';

/** Text direction for a language — drives the `dir` attribute on <html>. */
export function dirFor(lang: Lang): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/** The BCP-47 tag used in <html lang> and in hreflang links. */
export function htmlLang(lang: Lang): string {
  return lang === 'ar' ? 'ar' : 'en';
}

/**
 * Build a site-relative path for a language.
 *   localePath('en', 'services') -> '/services/'
 *   localePath('ar', 'services') -> '/ar/services/'
 *   localePath('ar', '')         -> '/ar/'
 */
export function localePath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  return clean ? `${prefix}/${clean}/` : `${prefix}/`;
}

/**
 * Turn a site-relative path into a full absolute URL.
 * Canonical tags, Open Graph tags and JSON-LD all require absolute URLs.
 */
export function absoluteUrl(path: string, site: URL | string | undefined): string {
  const base = (site ? site.toString() : 'https://www.tariki360.ae').replace(/\/+$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/**
 * Given the current language and page path, produce the hreflang alternates
 * pointing at the same page in every other language.
 */
export function alternates(path: string): Array<{ lang: Lang; path: string }> {
  return LANGS.map((lang) => ({ lang, path: localePath(lang, path) }));
}

/** Reads the language out of a URL pathname — used by the language switcher. */
export function langFromPath(pathname: string): Lang {
  return pathname.startsWith('/ar/') || pathname === '/ar' ? 'ar' : 'en';
}

/**
 * Strip the language prefix off a pathname, leaving the bare page path.
 *   '/ar/services/' -> 'services'
 *   '/services/'    -> 'services'
 */
export function stripLang(pathname: string): string {
  return pathname.replace(/^\/ar(?=\/|$)/, '').replace(/^\/+|\/+$/g, '');
}
