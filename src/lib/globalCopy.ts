/**
 * Navigation, footer and sign-up-modal wording from Sanity.
 *
 * These live in the single `globalSettings` document, stored as three JSON
 * strings — `navJson`, `footerJson`, `modalJson` — each shaped
 * `{ en: {...}, ar: {...} }`.
 *
 * As with page copy, Sanity only wins where it actually has a non-empty value
 * for the language being built; anything missing keeps the built-in wording
 * from `src/content/site.ts`.
 *
 * One thing deliberately does NOT come from Sanity: the link targets. Sanity
 * holds the label ("Career Path Finder"), the code holds the path it points
 * at. An editor renaming a footer link should not be able to break routing.
 */
import type { Lang } from './i18n';
import { fetchSanity } from './sanity';
import { NAV_LABELS, NAV_TEXT, FOOTER, MODAL, type NavKey } from '~/content/site';

type GlobalSettingsDoc = {
  navJson?: string;
  footerJson?: string;
  modalJson?: string;
} | null;

/**
 * The menu order `navJson.labels` was written for. Labels are matched by
 * position, so this order is frozen: adding a menu item (such as Media) must
 * not shift which label lands on which link.
 */
const NAV_JSON_ORDER: NavKey[] = ['home', 'services', 'benefits', 'about', 'resources', 'blog', 'contact'];

/**
 * Menu items whose label can also be set on their own page document, in a
 * "Name in the top menu" field. That field wins over `navJson`: it is the
 * easy, clearly-labelled place to rename a menu item, while `navJson` is a
 * raw JSON text box.
 */
const PAGE_NAV_LABELS: Array<[NavKey, string]> = [
  ['about', 'pageAbout'],
  ['social', 'pageSocial'],
];

const QUERY = `*[_type == "globalSettings"][0]{ navJson, footerJson, modalJson }`;

const PAGE_NAV_QUERY = `{ ${PAGE_NAV_LABELS.map(
  ([key, id]) => `"${key}": *[_id == "${id}"][0].navLabel`,
).join(', ')} }`;

/** Parse one of the JSON string fields, returning null if it's unusable. */
function parseBlob(raw: unknown, lang: Lang, label: string): Record<string, any> | null {
  if (typeof raw !== 'string' || raw.trim() === '') return null;
  try {
    const parsed = JSON.parse(raw);
    const forLang = parsed?.[lang];
    return forLang && typeof forLang === 'object' ? forLang : null;
  } catch (err) {
    console.warn(
      `[sanity] globalSettings.${label} contains invalid JSON — keeping the built-in copy. ` +
        `(${(err as Error).message})`,
    );
    return null;
  }
}

const str = (v: unknown): string | null => {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
};

export type GlobalCopy = {
  navLabels: Record<NavKey, string>;
  navText: (typeof NAV_TEXT)['en'];
  footer: (typeof FOOTER)['en'];
  modal: (typeof MODAL)['en'];
};

/** Cached for the whole build — every page needs this. */
const cache = new Map<Lang, GlobalCopy>();

export async function getGlobalCopy(lang: Lang): Promise<GlobalCopy> {
  const hit = cache.get(lang);
  if (hit) return hit;

  const doc = await fetchSanity<GlobalSettingsDoc>(QUERY, {}, null);
  const pageNav = await fetchSanity<Record<string, unknown> | null>(PAGE_NAV_QUERY, {}, null);

  const result: GlobalCopy = {
    navLabels: { ...NAV_LABELS[lang] },
    navText: { ...NAV_TEXT[lang] },
    footer: {
      ...FOOTER[lang],
      cols: FOOTER[lang].cols.map((c) => ({ ...c, items: c.items.map((i) => ({ ...i })) })),
    },
    modal: { ...MODAL[lang] },
  };

  /** Apply "Name in the top menu" from page documents; runs last so it wins. */
  const finish = () => {
    for (const [key] of PAGE_NAV_LABELS) {
      const value = pageNav?.[key];
      const label =
        value && typeof value === 'object' ? str((value as Record<string, unknown>)[lang]) : null;
      if (label) result.navLabels[key] = label;
    }
    cache.set(lang, result);
    return result;
  };

  if (!doc) return finish();

  /* ---- nav ---- */
  const nav = parseBlob(doc.navJson, lang, 'navJson');
  if (nav) {
    // `labels` is a positional array in NAV_JSON_ORDER.
    if (Array.isArray(nav.labels)) {
      NAV_JSON_ORDER.forEach((key, i) => {
        const label = str(nav.labels[i]);
        if (label) result.navLabels[key] = label;
      });
    }
    const login = str(nav.text?.login);
    const menu = str(nav.text?.menu);
    if (login) result.navText.login = login;
    if (menu) result.navText.menu = menu;
  }

  /* ---- footer ---- */
  const footer = parseBlob(doc.footerJson, lang, 'footerJson');
  if (footer) {
    // cols: [["Platform", ["Career Path Finder", ...]], ...]
    if (Array.isArray(footer.cols)) {
      footer.cols.forEach((col: unknown, ci: number) => {
        if (!Array.isArray(col)) return;
        const target = result.footer.cols[ci];
        if (!target) return;

        const heading = str(col[0]);
        if (heading) target.heading = heading;

        if (Array.isArray(col[1])) {
          col[1].forEach((label: unknown, li: number) => {
            const text = str(label);
            // Keep the code's `path`; only the visible label comes from Sanity.
            if (text && target.items[li]) target.items[li].label = text;
          });
        }
      });
    }

    // `copy` is a single string with a <br /> between the two lines.
    const copy = str(footer.copy);
    if (copy) {
      const [line1, line2] = copy.split(/<br\s*\/?>/i);
      if (str(line1)) result.footer.copyLine1 = line1.trim();
      if (str(line2)) result.footer.copyLine2 = line2.trim();
    }

    const bottom = str(footer.bottom);
    if (bottom) result.footer.bottom = bottom;
  }

  /* ---- sign-up modal ---- */
  const modal = parseBlob(doc.modalJson, lang, 'modalJson');
  if (modal) {
    for (const key of ['tag', 'title', 'desc', 'nameLabel', 'namePh', 'emailLabel', 'emailPh', 'cta'] as const) {
      const value = str(modal[key]);
      if (value) result.modal[key] = value;
    }
    // `close` and `toast` are not in Sanity — `toast` is a function, so it
    // could not be stored there anyway. Both keep their code values.
  }

  return finish();
}
