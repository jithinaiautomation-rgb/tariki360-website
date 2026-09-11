import { defineField, defineType } from 'sanity';

/**
 * Bilingual SEO overrides for a page.
 *
 * This is the twin of `seo`, and the difference matters:
 *
 *   seo         used on blog posts, white papers and landing pages, where
 *               each document is written in ONE language, so plain text
 *               fields are enough.
 *
 *   seoLocale   used on the seven page documents (Home, Services, About …),
 *               where a SINGLE document produces both the English page and
 *               the Arabic one — so each field needs both languages.
 *
 * Everything here is optional. Leave a field blank and the site falls back to
 * the page's own headline and intro text, then to Site Settings. Fill it in
 * when the Google result should read differently from the page itself.
 */
export default defineType({
  name: 'seoLocale',
  title: 'SEO & sharing',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      description:
        'The browser tab title and the blue headline in Google. Around 60 characters — longer gets cut off. The site name is added automatically, so do not repeat it here.',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'SEO description',
      description:
        'The grey summary under the link in Google, and the preview text when the page is shared. Aim for 120–160 characters; longer is truncated.',
      type: 'localeText',
    }),
    defineField({
      name: 'shareImage',
      title: 'Share image',
      description:
        'Shown when this page is shared on WhatsApp, LinkedIn or X. Ideally 1200×630 pixels. One image is used for both languages.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
