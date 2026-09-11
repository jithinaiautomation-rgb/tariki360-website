import { defineField, defineType } from 'sanity';
import { languageField } from './language';

/**
 * A white paper.
 *
 * Gets a card on /white-papers/ and its own page at /white-papers/<slug>/,
 * where visitors can read the summary and download the PDF.
 *
 * Added for the Astro site: `slug` (needed to give each paper its own page),
 * `language`, `coverImage`, an optional `body`, and `seo`.
 *
 * IMPORTANT for existing papers: they have no slug yet. Open each one and
 * click Generate next to the Slug field, then publish — otherwise the paper
 * still appears on the listing but has no page of its own.
 */
export default defineType({
  name: 'whitePaper',
  title: 'White Paper',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
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
        'The last part of the web address. Click Generate to build it from the title.',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    { ...languageField, group: 'content' },
    defineField({
      name: 'badge',
      title: 'Category badge',
      description: 'e.g. Parent Guide, School Guide, Future Skills.',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'The summary on the card and at the top of the paper’s page.',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Longer description',
      description:
        'Optional. Extra detail shown below the download button — a contents list, key findings, who it is for.',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      description: 'Optional. The paper’s cover or a related image.',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Published date',
      type: 'date',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'PDF file',
      type: 'file',
      group: 'content',
      options: { accept: '.pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'content',
      description: 'Lower numbers appear first.',
      initialValue: 0,
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
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', badge: 'badge', language: 'language', media: 'coverImage' },
    prepare: ({ title, badge, language, media }) => ({
      title,
      subtitle: [badge, (language ?? 'en').toUpperCase()].filter(Boolean).join(' · '),
      media,
    }),
  },
});
