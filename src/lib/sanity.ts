/**
 * The Sanity data layer.
 *
 * Everything in here runs at BUILD TIME only. Nothing fetches in the browser —
 * by the time a visitor loads a page, the content is already baked into the
 * HTML. That's what makes the site fast and fully static.
 *
 * The client itself is configured once in astro.config.mjs (the @sanity/astro
 * integration) and imported here from the virtual `sanity:client` module.
 */
import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder } from '@sanity/image-url';

/** A Sanity image reference, as returned by a GROQ query. */
export type SanityImageSource = {
  asset?: { _ref?: string; _id?: string; url?: string };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
} | null | undefined;

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;

/** False until a real project id is set, which keeps local builds working. */
export const sanityEnabled = Boolean(projectId && projectId !== 'placeholder');

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build a URL for a Sanity image.
 * Always ask for WebP — smaller files, and it's what the brief asked for.
 */
export function urlFor(source: NonNullable<SanityImageSource>) {
  return builder.image(source as never).auto('format').format('webp');
}

/**
 * Fetch a GROQ query, returning `fallback` if Sanity isn't configured yet,
 * the request fails, or the query came back empty.
 *
 * This is deliberately forgiving: a CMS hiccup should never fail a deploy or
 * leave a page half-rendered. It mirrors how the old React site behaved.
 */
export async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T,
): Promise<T> {
  if (!sanityEnabled) return fallback;
  try {
    const data = await sanityClient.fetch<T>(query, params);
    if (data == null) return fallback;
    if (Array.isArray(data) && data.length === 0) return fallback;
    return data;
  } catch (err) {
    console.warn(
      `[sanity] query failed, using fallback content: ${(err as Error).message}`,
    );
    return fallback;
  }
}

/**
 * Same as fetchSanity but returns an empty array rather than fallback content.
 * Used by getStaticPaths, where "no documents" must mean "build no pages"
 * rather than "build a page from dummy data".
 */
export async function fetchList<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T[]> {
  if (!sanityEnabled) return [];
  try {
    const data = await sanityClient.fetch<T[]>(query, params);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn(`[sanity] list query failed: ${(err as Error).message}`);
    return [];
  }
}
