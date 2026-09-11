import { defineField, defineType } from 'sanity';
import { languageField } from './language';

const TAG_COLORS = [
  { title: 'Lime', value: 'lime' },
  { title: 'Green', value: 'green' },
  { title: 'Gold', value: 'gold' },
  { title: 'Dark', value: 'dark' },
  { title: 'Red', value: 'red' },
];

/**
 * A blog post.
 *
 * Every post gets two pages built for it: the card on /blog/ and its own
 * page at /blog/<slug>/.
 *
 * Added for the Astro site: `language` (which language section it belongs to)
 * and `seo` (per-post search and share overrides). Everything else is exactly
 * as it was, so existing posts keep working untouched.
 */
export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Card & metadata' },
    { name: 'seo', title: 'SEO & sharing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'The last part of the web address, e.g. "choosing-a-major". Click Generate to build it from the title.',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    { ...languageField, group: 'content' },
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description:
        'The short summary on the blog card. Also used as the search-result description unless you override it under SEO.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'The article itself.',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              description: 'Describes the image for screen readers and search engines.',
              type: 'string',
            }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover image',
      description:
        'Shown at the top of the article and on its card. Also becomes the social share image if you do not set one under SEO.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),

    defineField({
      name: 'badge',
      title: 'Category badge',
      description:
        'e.g. Career Guidance, Parenting, Future Skills. These also become the filter buttons on the blog page.',
      type: 'string',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Tag colour',
      type: 'string',
      group: 'meta',
      options: { list: TAG_COLORS },
      initialValue: 'lime',
    }),
    defineField({
      name: 'icon',
      title: 'Icon name',
      description:
        'Material Symbols icon shown on the card when there is no cover image, e.g. "route". Browse names at fonts.google.com/icons.',
      type: 'string',
      group: 'meta',
      initialValue: 'auto_stories',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Published date',
      type: 'date',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read time',
      description: 'e.g. "5 min read"',
      type: 'string',
      group: 'meta',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured post',
      description:
        'Shows this post in the large slot at the top of the Blog page. Mark only one post per language.',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),

    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Published date, new',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', badge: 'badge', language: 'language', media: 'mainImage' },
    prepare: ({ title, badge, language, media }) => ({
      title,
      subtitle: [badge, (language ?? 'en').toUpperCase()].filter(Boolean).join(' · '),
      media,
    }),
  },
});
