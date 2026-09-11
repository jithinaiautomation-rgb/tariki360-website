import { defineField, defineType } from 'sanity';

/**
 * A reusable group of SEO overrides.
 *
 * This isn't a document on its own — it's embedded into blog posts, white
 * papers and landing pages as a field called `seo`. Everything in it is
 * OPTIONAL: leave it blank and the site falls back to the page's own title
 * and excerpt, then to the site-wide defaults in Site Settings.
 *
 * Fill it in when you want the search-engine or social-share version of a
 * page to read differently from the on-page headline.
 */
export default defineType({
  name: 'seo',
  title: 'SEO & sharing',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      description:
        'Overrides the browser tab title and the headline in Google results. Aim for under about 60 characters. Leave blank to use the page title.',
      type: 'string',
      validation: (Rule) =>
        Rule.max(70).warning('Longer than ~70 characters may be cut off in search results.'),
    }),
    defineField({
      name: 'description',
      title: 'SEO description',
      description:
        'The grey summary text under the link in Google, and the preview text when the page is shared. Aim for 120–160 characters. Leave blank to use the excerpt.',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(180).warning('Longer than ~160 characters is usually truncated.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Share image',
      description:
        'The picture shown when this page is shared on WhatsApp, LinkedIn or X. Ideally 1200×630 pixels. Leave blank and the site uses the cover image, or auto-generates a card from the title.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
