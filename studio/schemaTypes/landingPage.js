import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './language';
import { structuredDataField } from './structuredData';

/**
 * A landing page you build yourself, section by section, with no developer
 * involved.
 *
 * Create one, give it a slug, then add sections from the menu — a hero, some
 * text, a grid of features, a band of statistics, a quote, a call to action.
 * Drag them into the order you want. After the next site build it appears at
 * /<slug>/ (or /ar/<slug>/ for an Arabic page).
 *
 * The six section types below are the ones the site knows how to draw. Adding
 * a seventh kind does need a developer: a new block here, and a matching
 * branch in src/sections/LandingPage.astro.
 */

/* ---------------------------------------------------------------- blocks */

const hero = defineArrayMember({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Small label above the headline, e.g. "For schools".',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'subheading', title: 'Sub-headline', type: 'text', rows: 3 }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'primaryCtaLabel', title: 'Primary button label', type: 'string' }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary button link',
      description:
        'e.g. /contact/ — leave blank and the button opens the sign-up form instead.',
      type: 'string',
    }),
    defineField({ name: 'secondaryCtaLabel', title: 'Secondary button label', type: 'string' }),
    defineField({ name: 'secondaryCtaHref', title: 'Secondary button link', type: 'string' }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare: ({ title, media }) => ({ title: title || 'Hero', subtitle: 'Hero', media }),
  },
});

const richText = defineArrayMember({
  name: 'richText',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { body: 'body' },
    prepare: ({ body }) => {
      const first = (body ?? []).find((b) => b._type === 'block');
      const text = first?.children?.map((c) => c.text).join('') ?? '';
      return { title: text.slice(0, 60) || 'Text', subtitle: 'Text' };
    },
  },
});

const featureGrid = defineArrayMember({
  name: 'featureGrid',
  title: 'Feature grid',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Sub-heading', type: 'text', rows: 2 }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: 'Two', value: 2 },
          { title: 'Three', value: 3 },
          { title: 'Four', value: 4 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon name',
              description:
                'A Material Symbols name, e.g. "school" or "insights". Browse them at fonts.google.com/icons.',
              type: 'string',
              initialValue: 'check_circle',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', features: 'features' },
    prepare: ({ title, features }) => ({
      title: title || 'Feature grid',
      subtitle: `Feature grid · ${(features ?? []).length} item(s)`,
    }),
  },
});

const statBand = defineArrayMember({
  name: 'statBand',
  title: 'Statistics band',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              description: 'e.g. "94%" or "5,000+"',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),
  ],
  preview: {
    select: { stats: 'stats' },
    prepare: ({ stats }) => ({
      title: 'Statistics band',
      subtitle: (stats ?? []).map((s) => s.value).join(' · '),
    }),
  },
});

const ctaBanner = defineArrayMember({
  name: 'ctaBanner',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'ctaHeading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'ctaBody', title: 'Body', type: 'text', rows: 3 }),
    defineField({ name: 'ctaLabel', title: 'Button label', type: 'string' }),
    defineField({
      name: 'ctaHref',
      title: 'Button link',
      description: 'Leave blank and the button opens the sign-up form.',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'ctaHeading' },
    prepare: ({ title }) => ({ title: title || 'Call to action', subtitle: 'Call to action' }),
  },
});

const quote = defineArrayMember({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attributionRole',
      title: 'Role',
      description: 'e.g. Parent, Dubai',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'quote', subtitle: 'attribution' },
  },
});

/* ------------------------------------------------------------- document */

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & sharing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      description: 'Used in the browser tab and the breadcrumb trail.',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'The web address for this page. "schools-2025" becomes /schools-2025/. Avoid the names of existing pages (services, benefits, about, contact, blog, white-papers).',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    { ...languageField, group: 'content' },
    defineField({
      name: 'sections',
      title: 'Sections',
      description:
        'Build the page by adding sections and dragging them into order.',
      type: 'array',
      group: 'content',
      of: [hero, richText, featureGrid, statBand, ctaBanner, quote],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      type: 'seo',
      group: 'seo',
    }),
    { ...structuredDataField({ bilingual: false }), group: 'seo' },
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', language: 'language' },
    prepare: ({ title, slug, language }) => ({
      title,
      subtitle: `${(language ?? 'en') === 'ar' ? '/ar/' : '/'}${slug ?? ''}`,
    }),
  },
});
