/**
 * Social media platforms: display names, icons and link helpers.
 *
 * Shared by the Social Media page, the footer and the contact page, so a
 * platform looks the same everywhere it appears.
 *
 * Icons come from Material Symbols, which has no brand logos, so each platform
 * gets the closest general-purpose icon plus its name as text.
 */
import type { Lang } from './i18n';

type Platform = { icon: string; en: string; ar: string };

export const PLATFORMS: Record<string, Platform> = {
  instagram: { icon: 'photo_camera', en: 'Instagram', ar: 'إنستغرام' },
  youtube: { icon: 'smart_display', en: 'YouTube', ar: 'يوتيوب' },
  tiktok: { icon: 'music_note', en: 'TikTok', ar: 'تيك توك' },
  linkedin: { icon: 'work', en: 'LinkedIn', ar: 'لينكدإن' },
  x: { icon: 'chat', en: 'X', ar: 'إكس' },
  facebook: { icon: 'groups', en: 'Facebook', ar: 'فيسبوك' },
};

/** Platforms that appear in Site Settings social links but not as post types. */
const EXTRA_ICONS: Record<string, string> = {
  twitter: 'chat',
  whatsapp: 'chat_bubble',
  website: 'public',
};

const normalise = (platform?: string | null) => (platform ?? '').trim().toLowerCase();

/** The Material Symbols icon for a platform, or a globe when unknown. */
export function socialIcon(platform?: string | null): string {
  const key = normalise(platform);
  return PLATFORMS[key]?.icon ?? EXTRA_ICONS[key] ?? 'public';
}

/** The platform's display name in the given language. */
export function platformLabel(platform: string | null | undefined, lang: Lang): string {
  const key = normalise(platform);
  const known = PLATFORMS[key];
  if (known) return known[lang];
  if (key === 'twitter') return lang === 'ar' ? 'إكس' : 'X';
  if (key === 'whatsapp') return lang === 'ar' ? 'واتساب' : 'WhatsApp';
  if (key === 'website') return lang === 'ar' ? 'الموقع الإلكتروني' : 'Website';
  return platform ?? '';
}

/** True for an absolute http(s) URL — the only links the page will render. */
export function isWebUrl(url: unknown): url is string {
  if (typeof url !== 'string') return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

/** Domains belonging to each platform. Subdomains (www., m. …) also match. */
const PLATFORM_DOMAINS: Record<string, string[]> = {
  youtube: ['youtube.com', 'youtu.be', 'youtube-nocookie.com'],
  instagram: ['instagram.com', 'instagr.am'],
  tiktok: ['tiktok.com'],
  linkedin: ['linkedin.com', 'lnkd.in'],
  x: ['x.com', 'twitter.com'],
  facebook: ['facebook.com', 'fb.com', 'fb.watch'],
};

/**
 * Which platform a link belongs to, worked out from its domain — for example
 * "youtube" for https://youtu.be/… Returns null for any other website.
 */
export function detectPlatform(url: string | null | undefined): string | null {
  if (!isWebUrl(url)) return null;
  const host = new URL(url).hostname.toLowerCase();
  for (const [platform, domains] of Object.entries(PLATFORM_DOMAINS)) {
    if (domains.some((d) => host === d || host.endsWith('.' + d))) return platform;
  }
  return null;
}

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * The video ID from a YouTube link, or null.
 * Handles watch?v=, youtu.be/, /shorts/, /embed/ and /live/ links.
 */
export function youtubeId(url: string | null | undefined): string | null {
  if (!isWebUrl(url)) return null;
  const u = new URL(url);
  const host = u.hostname.replace(/^(www\.|m\.|music\.)/, '');

  let id: string | null = null;
  if (host === 'youtu.be') {
    id = u.pathname.split('/')[1] ?? null;
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (u.pathname === '/watch') {
      id = u.searchParams.get('v');
    } else {
      const [, kind, value] = u.pathname.split('/');
      if (kind === 'shorts' || kind === 'embed' || kind === 'live') id = value ?? null;
    }
  }
  return id && YT_ID.test(id) ? id : null;
}

/**
 * YouTube's own thumbnail for a video. 480×360 and always present for any
 * public video, so it can be used without uploading anything.
 */
export function youtubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
