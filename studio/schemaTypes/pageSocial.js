import { defineType } from 'sanity';
import { paragraph, seoFields, text } from './pageFields';

/**
 * Social Media Page — the wording around the posts. The posts themselves are
 * separate documents under "Social Media Posts" in the sidebar.
 *
 * Laid out like the other page editors: one tab per section, top to bottom.
 * An empty box keeps the site's built-in wording for that language.
 */
export default defineType({
  name: 'pageSocial',
  title: 'Social Media Page',
  type: 'document',

  groups: [
    { name: 'hero', title: '1. Top banner', default: true },
    { name: 'posts', title: '2. Posts' },
    { name: 'follow', title: '3. Follow us strip' },
    { name: 'menu', title: 'Menu' },
    { name: 'seo', title: 'SEO & schema' },
  ],

  fields: [
    /* ------------------------------------------------------ 1. Top banner */
    text('heroTag', 'Small label above the heading', 'e.g. "Social Media"', 'hero'),
    text(
      'heroTitle',
      "Heading (H1 — the page's main heading for Google)",
      'The big heading at the top, and the only H1 on the page.',
      'hero',
    ),
    paragraph('heroSubtitle', 'Text under the heading', undefined, 'hero'),

    /* ---------------------------------------------------------- 2. Posts */
    text(
      'latestTitle',
      'Heading above the posts',
      'e.g. "Latest posts". The posts are added under "Social Media Posts" in the sidebar.',
      'posts',
    ),
    text('latestSubtitle', 'Text under that heading', undefined, 'posts'),
    text('allPlatforms', 'Filter: "show all" button', 'The first filter button, e.g. "All platforms".', 'posts'),
    text(
      'viewOn',
      'Link text on each card',
      'Type {platform} where the platform name should go, e.g. "View on {platform}" becomes "View on YouTube".',
      'posts',
    ),
    text('emptyState', 'Message when there are no posts', undefined, 'posts'),

    /* ------------------------------------------------ 3. Follow us strip */
    text(
      'followTitle',
      'Heading',
      'e.g. "Follow Tariki 360". The buttons come from Social links in Site Settings; the strip is hidden when there are none.',
      'follow',
    ),
    text('followSubtitle', 'Text under the heading', undefined, 'follow'),

    /* --------------------------------------------------------------- Menu */
    text('navLabel', 'Name in the top menu', 'e.g. "Social Media". Leave empty to keep the built-in name.', 'menu'),

    /* ------------------------------------------------------ SEO & schema */
    ...seoFields(),
  ],

  preview: {
    prepare: () => ({ title: 'Social Media Page' }),
  },
});
