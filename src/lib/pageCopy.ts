/**
 * Page copy from Sanity.
 *
 * Your Sanity project stores the wording for each page as one document —
 * `pageIndex`, `pageServices`, `pageAbout` and so on — and that copy is newer
 * than the text originally lifted out of the React app. This module reads
 * those documents at build time and lays them over the built-in dictionaries
 * in `src/content/`.
 *
 * Three shapes come back from Sanity, and all three are flattened to the plain
 * strings and arrays the page templates already expect:
 *
 *   heroTag      {_type:'localeString', en:'…', ar:'…'}     -> 'the right one'
 *   quotes       [{_type:'localeString', en, ar}, …]        -> ['…', '…']
 *   feats_json   '{"en":[[…]],"ar":[[…]]}'  (a JSON string) -> [[…], […]]
 *
 * The `_json` suffix is dropped, so `feats_json` in Sanity becomes `feats` in
 * the template — matching the code dictionaries exactly.
 *
 * ── The one rule that matters ──────────────────────────────────────────────
 * A Sanity value only wins if it is actually present and non-empty FOR THE
 * LANGUAGE BEING BUILT. Otherwise the code dictionary is kept.
 *
 * That is deliberate, not defensive padding. Several fields have an English
 * value and no Arabic one — `heroTitleLead` ("or just") is the clearest case,
 * because the Arabic headline is written without it. Falling back to English
 * would print "or just أم يسير مع التيار؟" on the Arabic homepage. Falling
 * back to the code dictionary prints the right thing.
 *
 * It also means a malformed field can't break a page. `topCareerList_json`
 * currently contains invalid JSON (a missing quote in the Arabic); that field
 * simply keeps its code value and logs a warning, rather than failing a build.
 */
import type { Lang } from './i18n';
import { fetchSanity, urlFor } from './sanity';

type LocaleValue = { _type?: string; en?: string; ar?: string } & Record<string, unknown>;

/** True for a `{_type: 'localeString' | 'localeText'}` object. */
function isLocale(value: unknown): value is LocaleValue {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    typeof (value as LocaleValue)._type === 'string' &&
    ((value as LocaleValue)._type === 'localeString' ||
      (value as LocaleValue)._type === 'localeText')
  );
}

/** Pull the string for one language, or null when there isn't a usable one. */
function localeText(value: LocaleValue, lang: Lang): string | null {
  const raw = value[lang];
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Resolve one field. Returns `undefined` to mean "no usable value — keep
 * whatever the code dictionary has".
 */
function resolveField(value: unknown, lang: Lang): unknown {
  if (isLocale(value)) {
    return localeText(value, lang) ?? undefined;
  }

  if (Array.isArray(value)) {
    // An array of localeStrings, e.g. `quotes` or `forParentsList`.
    if (value.some(isLocale)) {
      const out = value
        .filter(isLocale)
        .map((item) => localeText(item, lang))
        .filter((s): s is string => s !== null);
      return out.length > 0 ? out : undefined;
    }
    return value.length > 0 ? value : undefined;
  }

  return undefined;
}

/**
 * Decode a `*_json` field: a JSON string holding `{ en: [...], ar: [...] }`.
 * Returns undefined on bad JSON or a missing/empty entry for this language.
 */
function resolveJsonField(raw: unknown, lang: Lang, label: string): unknown {
  if (typeof raw !== 'string' || raw.trim() === '') return undefined;

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.warn(
      `[sanity] ${label} contains invalid JSON — keeping the built-in copy for this field. ` +
        `(${(err as Error).message})`,
    );
    return undefined;
  }

  const forLang = parsed?.[lang];
  if (Array.isArray(forLang)) return forLang.length > 0 ? forLang : undefined;

  // Objects with numeric keys ({"0": …, "1": …}) are arrays that lost their
  // type somewhere along the way; turn them back into arrays.
  if (forLang && typeof forLang === 'object') {
    const keys = Object.keys(forLang);
    if (keys.length > 0 && keys.every((k) => /^\d+$/.test(k))) {
      const arr = keys
        .sort((a, b) => Number(a) - Number(b))
        .map((k) => (forLang as Record<string, unknown>)[k]);
      return arr.length > 0 ? arr : undefined;
    }
    return forLang;
  }

  return undefined;
}

/* ---- Lists ------------------------------------------------------------- */

type ListPart = { field: string; locale: boolean; optional?: boolean };
type ListSpec = {
  parts: ListPart[];
  build?: (values: Array<string | null>, index: number) => unknown;
};

const loc = (field: string): ListPart => ({ field, locale: true });
const plain = (field: string): ListPart => ({ field, locale: false });
/** A plain part that may be empty; it resolves to null instead of dropping the row. */
const plainOptional = (field: string): ListPart => ({ field, locale: false, optional: true });
const featureParts = [plain('icon'), loc('title'), loc('description')];

/**
 * Lists edited in Sanity as one row per item, by document type. Each resolves
 * into the shape the page template already uses: a tuple of the listed parts
 * in order, or whatever `build` returns. These replaced the older `*_json`
 * text boxes, and win over them whenever they have rows.
 */
const LIST_SPECS: Record<string, Record<string, ListSpec>> = {
  pageIndex: {
    heroFeats: { parts: [plain('icon'), loc('label')] },
    stats: { parts: [loc('value'), loc('label')] },
    feats: { parts: featureParts },
    schoolFeatures: { parts: featureParts },
    journey: {
      parts: featureParts,
      // The template expects { n: icon, num: step number, t: title, d: text }.
      build: ([n, t, d], index) => ({ n, num: index + 1, t, d }),
    },
    reportItems: { parts: [plain('icon'), loc('label')] },
    topCareerList: { parts: [loc('name'), plain('percent')] },
    strengthList: { parts: [loc('name'), plain('percent')] },
    cohortStats: { parts: [loc('value'), loc('label')] },
    careerInterestList: { parts: [loc('name'), plain('percent')] },
    faqs: { parts: [loc('question'), loc('answer')] },
  },
  pageServices: {
    // The tick lists never showed their icon, so rows store text only and
    // the template's [icon, text] shape is filled in here.
    tier1: { parts: [loc('label')], build: ([label]) => ['check_circle', label] },
    tier2: { parts: [loc('label')], build: ([label]) => ['check_circle', label] },
    inst: { parts: featureParts },
  },
  pageBenefits: {
    stats: { parts: [loc('value'), loc('label')] },
    aiMentorFeatures: { parts: [plain('icon'), loc('label')] },
    studentCards: { parts: featureParts },
    parentCards: { parts: featureParts },
    before: { parts: [loc('title'), loc('description')] },
    after: { parts: [loc('title'), loc('description')] },
    grid: { parts: featureParts },
  },
  pageAbout: {
    partners: { parts: [loc('name'), loc('meta'), loc('description')] },
    board: {
      parts: [loc('name'), loc('role'), loc('description')],
      build: ([name, role, desc]) => ({ name, role, desc }),
    },
  },
  pageContact: {
    routes: { parts: featureParts },
    // The phone/email is optional: rows like the office address have none.
    info: { parts: [plain('icon'), loc('title'), loc('description'), plainOptional('action')] },
    langs: { parts: [plain('code'), loc('label')] },
  },
};

/**
 * Resolve one list for one language.
 *
 * A row is included only when every part has a value in that language (plain
 * parts such as icons and percentages are shared by both), so a row that is
 * translated into English but not yet Arabic appears on the English page only.
 * Returns undefined when no row qualifies, which keeps the fallback copy.
 */
function resolveList(value: unknown, spec: ListSpec, lang: Lang): unknown[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const out: unknown[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const row = item as Record<string, unknown>;
    const values: Array<string | null> = [];
    for (const part of spec.parts) {
      const raw = row[part.field];
      const v = part.locale
        ? isLocale(raw)
          ? localeText(raw, lang)
          : null
        : typeof raw === 'string' && raw.trim()
          ? raw.trim()
          : null;
      if (!v) {
        if (!part.optional) break;
        values.push(null);
        continue;
      }
      values.push(v);
    }
    if (values.length !== spec.parts.length) continue;
    out.push(spec.build ? spec.build(values, out.length) : values);
  }
  return out.length > 0 ? out : undefined;
}

/** The SEO overrides for one page, already resolved to this language. */
export type ResolvedSeo = {
  title?: string;
  description?: string;
  image?: string;
};

/** Fields pageCopy adds on top of the dictionary it was given. */
export type PageExtras = {
  seo?: ResolvedSeo;
  /** Raw structured data entries; turned into JSON-LD in the base layout. */
  structuredData?: unknown[];
};

/**
 * Resolve the `seo` object on a page document.
 *
 * Unlike blog posts — one document per language, so plain strings work — the
 * page documents produce both language versions from a single document. Their
 * SEO title and description are therefore `localeString` / `localeText`, and
 * have to be narrowed to the language being built.
 *
 * The share image is turned into a 1200x630 WebP URL here, which is the size
 * Facebook, LinkedIn and X all expect.
 */
function resolveSeo(raw: unknown, lang: Lang): ResolvedSeo {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const seo = raw as Record<string, unknown>;

  const out: ResolvedSeo = {};

  if (isLocale(seo.title)) {
    const v = localeText(seo.title, lang);
    if (v) out.title = v;
  }
  if (isLocale(seo.description)) {
    const v = localeText(seo.description, lang);
    if (v) out.description = v;
  }

  const img = seo.shareImage as { asset?: unknown } | undefined;
  if (img?.asset) {
    out.image = urlFor(img as never).width(1200).height(630).fit('crop').url();
  }

  return out;
}

/**
 * Fetch a page document and merge it over the built-in copy.
 *
 * @param docType  the Sanity document type, e.g. 'pageIndex'
 * @param lang     the language being built
 * @param fallback the matching dictionary from src/content/
 */
export async function pageCopy<T extends object>(
  docType: string,
  lang: Lang,
  fallback: T,
): Promise<T & PageExtras> {
  const doc = await fetchSanity<Record<string, unknown> | null>(
    `*[_type == $docType][0]`,
    { docType },
    null,
  );

  if (!doc) return fallback as T & PageExtras;

  const merged: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };

  // The SEO overrides need language-narrowing of their own; see resolveSeo.
  merged.seo = resolveSeo(doc.seo, lang);

  const lists = LIST_SPECS[docType] ?? {};

  for (const [key, value] of Object.entries(doc)) {
    if (key.startsWith('_')) continue;
    if (key === 'seo') continue; // handled above
    if (key in lists) continue; // handled after the loop, so lists beat their old _json box

    if (key.endsWith('_json')) {
      const name = key.slice(0, -'_json'.length);
      const resolved = resolveJsonField(value, lang, `${docType}.${key}`);
      if (resolved !== undefined) merged[name] = resolved;
      continue;
    }

    const resolved = resolveField(value, lang);
    if (resolved !== undefined) merged[key] = resolved;
  }

  // Lists edited one row per item win over the old single-box `_json` version
  // of the same list. An empty list leaves whatever that old box or the
  // built-in copy provided.
  for (const [name, spec] of Object.entries(lists)) {
    const resolved = resolveList(doc[name], spec, lang);
    if (resolved) merged[name] = resolved;
  }

  return merged as T & PageExtras;
}
