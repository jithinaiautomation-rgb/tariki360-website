/**
 * Structured data that editors add in Sanity, turned into JSON-LD.
 *
 * Each page document, and each landing page, can carry a list of typed
 * entries — Service, Course, Event, Office/organisation. This module converts
 * them into schema.org JSON-LD for the page <head> at build time.
 *
 * Three rules it follows:
 *
 *  • Incomplete entries are skipped, with a warning in the build log. Google
 *    treats markup that is missing required properties as invalid, so
 *    publishing nothing is better than publishing that.
 *
 *  • Text comes only from the language being built. The Arabic page never
 *    gets English markup and vice versa — the same rule as page copy.
 *
 *  • It imports nothing from Sanity. Image URLs are resolved through a
 *    function the caller passes in, which keeps this file testable on its own.
 */
import type { Lang } from './i18n';

type Json = Record<string, unknown>;

export type StructuredDataContext = {
  lang: Lang;
  /** Absolute URL of the site root. */
  siteUrl: string;
  /** Absolute canonical URL of the page being built. */
  pageUrl: string;
  orgName: string;
  /** Absolute URL of the logo. */
  orgLogo: string;
  /** Turns a Sanity image into an absolute URL. */
  imageUrl?: (image: unknown) => string | null | undefined;
};

/** A localeString / localeText narrowed to one language, or a plain string. */
function text(value: unknown, lang: Lang): string | undefined {
  if (typeof value === 'string') return value.trim() || undefined;
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const raw = (value as Json)[lang];
    if (typeof raw === 'string') return raw.trim() || undefined;
  }
  return undefined;
}

const str = (v: unknown): string | undefined =>
  typeof v === 'string' && v.trim() ? v.trim() : undefined;

const num = (v: unknown): number | undefined =>
  typeof v === 'number' && Number.isFinite(v) ? v : undefined;

/** Remove undefined values and empty arrays so the JSON stays tidy. */
function clean<T extends Json>(obj: T): T {
  for (const key of Object.keys(obj)) {
    const v = obj[key];
    if (v === undefined || (Array.isArray(v) && v.length === 0)) delete obj[key];
  }
  return obj;
}

function skip(type: string, reason: string, lang: Lang): null {
  console.warn(
    `[structured data] ${type} skipped on the ${lang === 'ar' ? 'Arabic' : 'English'} page: ${reason}`,
  );
  return null;
}

function organisationRef(ctx: StructuredDataContext): Json {
  return { '@type': 'Organization', name: ctx.orgName, url: ctx.siteUrl, logo: ctx.orgLogo };
}

function offer(item: Json, url: string, extra: Json = {}): Json | undefined {
  const price = num(item.price);
  if (price === undefined) return undefined;
  return clean({
    '@type': 'Offer',
    price,
    priceCurrency: str(item.priceCurrency) ?? 'AED',
    url,
    ...extra,
  });
}

/** A PostalAddress, or undefined when there is neither a street nor a city. */
function postalAddress(item: Json, lang: Lang): Json | undefined {
  const streetAddress = text(item.streetAddress, lang);
  const addressLocality = text(item.addressLocality, lang);
  if (!streetAddress && !addressLocality) return undefined;
  return clean({
    '@type': 'PostalAddress',
    streetAddress,
    addressLocality,
    addressRegion: text(item.addressRegion, lang),
    postalCode: str(item.postalCode),
    addressCountry: str(item.addressCountry),
  });
}

/* ------------------------------------------------------------ builders */

function buildService(item: Json, ctx: StructuredDataContext): Json | null {
  const name = text(item.name, ctx.lang);
  if (!name) return skip('Service', 'no name in this language', ctx.lang);

  const areaServed = Array.isArray(item.areaServed)
    ? item.areaServed
        .map(str)
        .filter((c): c is string => Boolean(c))
        .map((country) => ({ '@type': 'Country', name: country }))
    : undefined;

  return clean({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: text(item.description, ctx.lang),
    serviceType: text(item.serviceType, ctx.lang),
    provider: organisationRef(ctx),
    areaServed,
    offers: offer(item, ctx.pageUrl),
    url: ctx.pageUrl,
  });
}

function buildCourse(item: Json, ctx: StructuredDataContext): Json | null {
  const name = text(item.name, ctx.lang);
  if (!name) return skip('Course', 'no name in this language', ctx.lang);
  const description = text(item.description, ctx.lang);
  if (!description) {
    return skip('Course', 'no description in this language (Google requires one)', ctx.lang);
  }

  const languages = Array.isArray(item.inLanguage)
    ? item.inLanguage.filter((l): l is string => l === 'en' || l === 'ar')
    : [];

  return clean({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: { '@type': 'Organization', name: ctx.orgName, sameAs: ctx.siteUrl },
    inLanguage: languages.length === 1 ? languages[0] : languages.length ? languages : undefined,
    offers: offer(item, ctx.pageUrl, { category: 'Paid' }),
    url: ctx.pageUrl,
  });
}

const ATTENDANCE: Record<string, string> = {
  online: 'https://schema.org/OnlineEventAttendanceMode',
  offline: 'https://schema.org/OfflineEventAttendanceMode',
  mixed: 'https://schema.org/MixedEventAttendanceMode',
};

function buildEvent(item: Json, ctx: StructuredDataContext): Json | null {
  const name = text(item.name, ctx.lang);
  if (!name) return skip('Event', 'no name in this language', ctx.lang);
  const startDate = str(item.startDate);
  if (!startDate) return skip('Event', 'no start date', ctx.lang);

  const mode = str(item.attendanceMode) ?? 'online';
  const link = str(item.url);

  const virtual: Json | undefined = link ? { '@type': 'VirtualLocation', url: link } : undefined;
  const venueName = text(item.locationName, ctx.lang);
  const address = postalAddress(item, ctx.lang);
  const place: Json | undefined =
    venueName || address ? clean({ '@type': 'Place', name: venueName, address }) : undefined;

  let location: Json | Json[];
  if (mode === 'offline') {
    if (!place) return skip('Event', 'in-person event with no venue', ctx.lang);
    location = place;
  } else if (mode === 'mixed') {
    if (!place || !virtual) {
      return skip('Event', 'an event held online and in person needs both a link and a venue', ctx.lang);
    }
    location = [place, virtual];
  } else {
    if (!virtual) return skip('Event', 'online event with no link', ctx.lang);
    location = virtual;
  }

  const image = item.image && ctx.imageUrl ? ctx.imageUrl(item.image) : undefined;

  return clean({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description: text(item.description, ctx.lang),
    startDate,
    endDate: str(item.endDate),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: ATTENDANCE[mode] ?? ATTENDANCE.online,
    location,
    image: image ? [image] : undefined,
    organizer: organisationRef(ctx),
    offers: offer(item, link ?? ctx.pageUrl, { availability: 'https://schema.org/InStock' }),
  });
}

const ORGANISATION_TYPES = new Set(['EducationalOrganization', 'ProfessionalService', 'LocalBusiness']);

function buildOrganisation(item: Json, ctx: StructuredDataContext): Json | null {
  const requested = str(item.businessType);
  const type = requested && ORGANISATION_TYPES.has(requested) ? requested : 'EducationalOrganization';

  const name = text(item.name, ctx.lang);
  if (!name) return skip(type, 'no name in this language', ctx.lang);

  const address = postalAddress(item, ctx.lang);
  if (type !== 'EducationalOrganization' && !(address?.streetAddress && address?.addressLocality)) {
    return skip(type, 'needs a street address and a city in this language', ctx.lang);
  }

  const latitude = num(item.latitude);
  const longitude = num(item.longitude);

  const openingHours = Array.isArray(item.openingHours)
    ? item.openingHours.map(str).filter((h): h is string => Boolean(h))
    : undefined;

  return clean({
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description: text(item.description, ctx.lang),
    url: ctx.siteUrl,
    logo: ctx.orgLogo,
    telephone: str(item.telephone),
    email: str(item.email),
    address,
    geo:
      latitude !== undefined && longitude !== undefined
        ? { '@type': 'GeoCoordinates', latitude, longitude }
        : undefined,
    openingHours,
  });
}

const BUILDERS: Record<string, (item: Json, ctx: StructuredDataContext) => Json | null> = {
  sdService: buildService,
  sdCourse: buildCourse,
  sdEvent: buildEvent,
  sdOrganization: buildOrganisation,
};

/** Convert the raw `structuredData` array from Sanity into JSON-LD objects. */
export function buildStructuredData(raw: unknown, ctx: StructuredDataContext): Json[] {
  if (!Array.isArray(raw)) return [];

  const out: Json[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') continue;
    const type = (entry as Json)._type;
    const build = typeof type === 'string' ? BUILDERS[type] : undefined;
    if (!build) continue;
    const result = build(entry as Json, ctx);
    if (result) out.push(result);
  }
  return out;
}
