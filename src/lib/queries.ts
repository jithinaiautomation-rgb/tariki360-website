/**
 * Every GROQ query the site uses, in one place.
 *
 * GROQ is Sanity's query language. `*[_type == "blogPost"]` means
 * "every document whose type is blogPost"; the `{ ... }` block afterwards
 * lists which fields to return. `author->name` follows a reference and
 * pulls the name off the linked author document.
 *
 * Note `coalesce(language, "en")` throughout: your existing documents were
 * created before the site was bilingual and have no language field, so they
 * are treated as English. Nothing you already published needs editing.
 */

/** The SEO fields every content type shares. */
const SEO_FIELDS = `
  "seo": {
    "title": seo.title,
    "description": seo.description,
    "shareImage": seo.shareImage
  }
`;

const AUTHOR_FIELDS = `
  "author": author->name,
  "authorRole": author->role,
  "initials": author->initials,
  "authorAvatar": author->avatar
`;

/* ---------------------------------------------------------------- settings */

/** The one-off site settings document (name, default description, socials). */
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  defaultDescription,
  defaultShareImage,
  organisationLegalName,
  socialLinks[]{ platform, url }
}`;

/* ------------------------------------------------------------------- blog */

/** The single featured post shown in the big slot at the top of /blog/. */
export const FEATURED_POST_QUERY = `*[
  _type == "blogPost" && featured == true && coalesce(language, "en") == $lang
] | order(date desc)[0]{
  title, "slug": slug.current, badge, icon, "color": coalesce(color, "lime"),
  "desc": excerpt, date, "read": readTime, mainImage,
  ${AUTHOR_FIELDS},
  ${SEO_FIELDS}
}`;

/** Every non-featured post, newest first, for the /blog/ grid. */
export const POSTS_QUERY = `*[
  _type == "blogPost" && featured != true && coalesce(language, "en") == $lang
] | order(date desc){
  title, "slug": slug.current, badge, icon, "c": coalesce(color, "lime"),
  "desc": excerpt, date, "read": readTime, mainImage,
  ${AUTHOR_FIELDS}
}`;

/** Slug + language for every post — drives getStaticPaths. */
export const POST_PATHS_QUERY = `*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current,
  "lang": coalesce(language, "en")
}`;

/** One full post, including its body, for /blog/[slug]/. */
export const POST_BY_SLUG_QUERY = `*[
  _type == "blogPost" && slug.current == $slug && coalesce(language, "en") == $lang
][0]{
  title, "slug": slug.current, badge, icon, "color": coalesce(color, "lime"),
  excerpt, body, mainImage, date, readTime,
  ${AUTHOR_FIELDS},
  ${SEO_FIELDS}
}`;

/** Up to three other posts to show at the foot of an article. */
export const RELATED_POSTS_QUERY = `*[
  _type == "blogPost" && slug.current != $slug && coalesce(language, "en") == $lang
] | order(date desc)[0...3]{
  title, "slug": slug.current, badge, icon, "c": coalesce(color, "lime"),
  "desc": excerpt, date, "read": readTime
}`;

/* ------------------------------------------------------------ white papers */

/** All white papers for the listing page. */
export const PAPERS_QUERY = `*[
  _type == "whitePaper" && coalesce(language, "en") == $lang
] | order(order asc, date desc){
  title, "slug": slug.current, badge, "desc": description, date,
  "fileUrl": file.asset->url, coverImage
}`;

/** Slug + language for every white paper — drives getStaticPaths. */
export const PAPER_PATHS_QUERY = `*[_type == "whitePaper" && defined(slug.current)]{
  "slug": slug.current,
  "lang": coalesce(language, "en")
}`;

/** One full white paper for /white-papers/[slug]/. */
export const PAPER_BY_SLUG_QUERY = `*[
  _type == "whitePaper" && slug.current == $slug && coalesce(language, "en") == $lang
][0]{
  title, "slug": slug.current, badge, "desc": description, body, date,
  "fileUrl": file.asset->url, "fileSize": file.asset->size, coverImage,
  ${SEO_FIELDS}
}`;

/* ---------------------------------------------------------- landing pages */

/** Slug + language for every landing page — drives getStaticPaths. */
export const LANDING_PATHS_QUERY = `*[_type == "landingPage" && defined(slug.current)]{
  "slug": slug.current,
  "lang": coalesce(language, "en")
}`;

/**
 * One landing page with all of its sections expanded.
 * Landing pages are built from a list of section blocks, so an editor can
 * assemble a whole new page in Sanity without anyone touching code.
 */
export const LANDING_BY_SLUG_QUERY = `*[
  _type == "landingPage" && slug.current == $slug && coalesce(language, "en") == $lang
][0]{
  title, "slug": slug.current,
  sections[]{
    _type, _key,
    // hero
    eyebrow, heading, subheading, image,
    primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref,
    // richText
    body,
    // featureGrid
    columns, features[]{ icon, title, description },
    // statBand
    stats[]{ value, label },
    // ctaBanner
    ctaHeading, ctaBody, ctaLabel, ctaHref,
    // logoOrQuote
    quote, attribution, attributionRole
  },
  ${SEO_FIELDS}
}`;

/* -------------------------------------------------- home page content bits */

/**
 * Written testimonials.
 *
 * `length(quote) > 40` skips half-finished entries. The dataset currently has
 * one testimonial reading "test test", and because real Sanity data replaces
 * the built-in examples wholesale, that single placeholder would otherwise be
 * the only testimonial on the home page. A genuine testimonial is a sentence;
 * 40 characters is comfortably below the shortest real one and well above any
 * scratch entry. Delete the placeholder in the Studio and this stops mattering.
 */
export const TESTIMONIALS_QUERY = `*[
  _type == "testimonial"
  && coalesce(language, "en") == $lang
  && length(coalesce(quote, "")) > 40
] | order(order asc){ name, role, initials, quote }`;

export const VIDEO_TESTIMONIALS_QUERY = `*[
  _type == "videoTestimonial" && coalesce(language, "en") == $lang
] | order(order asc){
  name, role, videoUrl, "fileUrl": video.asset->url, "thumbUrl": thumbnail.asset->url
}`;

export const HOME_VIDEO_QUERY = `*[_type == "homeVideo"][0]{
  sectionHeading, badgeLabel, captionTitle, captionSubtitle, careerTags,
  videoUrl, "fileUrl": video.asset->url, "posterUrl": poster.asset->url
}`;
