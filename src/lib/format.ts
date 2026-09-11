import type { Lang } from './i18n';

/** Intl locale tags matching our two site languages. */
const LOCALE: Record<Lang, string> = { en: 'en-US', ar: 'ar-AE' };

/** "Oct 2024" / "أكتوبر 2024" */
export function formatMonthYear(iso: string | undefined, lang: Lang = 'en'): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(LOCALE[lang], {
    month: 'short',
    year: 'numeric',
  });
}

/** "Feb 4, 2025" / "٤ فبراير ٢٠٢٥" */
export function formatFullDate(iso: string | undefined, lang: Lang = 'en'): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(LOCALE[lang], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** The machine-readable form used in <time datetime> and JSON-LD. */
export function isoDate(iso: string | undefined): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  return Number.isNaN(d.valueOf()) ? undefined : d.toISOString();
}

/**
 * Cut a long string down to a meta-description-friendly length without
 * chopping a word in half. Google shows roughly 155–160 characters.
 */
export function truncate(text: string | undefined, max = 155): string {
  if (!text) return '';
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, flat.lastIndexOf(' ', max - 1))}…`;
}

/**
 * Turn a Portable Text body (Sanity's rich text format) into plain text,
 * so it can be used as a fallback meta description or read-time estimate.
 */
export function portableTextToPlain(blocks: unknown): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b: any) => b?._type === 'block' && Array.isArray(b.children))
    .map((b: any) => b.children.map((c: any) => c?.text ?? '').join(''))
    .join(' ')
    .trim();
}
