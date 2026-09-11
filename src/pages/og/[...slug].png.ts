/**
 * Auto-generated Open Graph share images.
 *
 * One PNG is written per blog post and per white paper, in each language:
 *   /og/en/blog/my-post.png
 *   /og/ar/white-papers/my-paper.png
 *
 * These are real files in dist/, generated at build time — not rendered on
 * demand — which is what keeps the site fully static.
 *
 * A page only points at its generated image when it has no share image of its
 * own; see the fallback chain in BlogPost.astro and WhitePaperPage.astro.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { fetchList } from '~/lib/sanity';
import { renderOgImage } from '~/lib/og';
import { getSiteSettings } from '~/lib/settings';
import type { Lang } from '~/lib/i18n';
import { BLOG } from '~/content/blog';
import { WHITE_PAPERS } from '~/content/whitePapers';

type Row = { slug: string; lang: string; title?: string };

/** Titles are needed to draw the image, so fetch them alongside the slugs. */
const POST_OG_QUERY = `*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current, "lang": coalesce(language, "en"), title
}`;

const PAPER_OG_QUERY = `*[_type == "whitePaper" && defined(slug.current)]{
  "slug": slug.current, "lang": coalesce(language, "en"), title
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const [posts, papers] = await Promise.all([
    fetchList<Row>(POST_OG_QUERY),
    fetchList<Row>(PAPER_OG_QUERY),
  ]);

  const entries = [
    ...posts.map((p) => ({ ...p, type: 'blog' as const })),
    ...papers.map((p) => ({ ...p, type: 'white-papers' as const })),
  ];

  return entries
    // English only — see the limitation note at the top of src/lib/og.ts.
    // Arabic content falls back to the default share image instead.
    .filter((e) => e.slug && e.title && e.lang === 'en')
    .map((e) => ({
      // The catch-all param becomes "en/blog/my-post".
      params: { slug: `${e.lang}/${e.type}/${e.slug}` },
      props: { title: e.title as string, lang: e.lang as Lang, type: e.type },
    }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, lang, type } = props as {
    title: string;
    lang: Lang;
    type: 'blog' | 'white-papers';
  };

  const settings = await getSiteSettings();

  const label =
    type === 'blog' ? BLOG[lang].heroTag : WHITE_PAPERS[lang].sectionTitle;

  const png = await renderOgImage({
    title,
    label,
    siteName: settings.siteName,
    lang,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
