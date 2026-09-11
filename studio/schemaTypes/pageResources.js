import { defineField, defineType } from 'sanity';

/**
 * Resources / White Papers Page
 *
 * One document holding the wording for this page. The website reads it at
 * build time and lays it over its built-in copy, so any field you leave
 * blank simply keeps the default text — nothing breaks if a field is empty.
 *
 * Fields marked "(advanced)" hold a JSON list as raw text. Edit the words
 * inside the quotes and leave the brackets and commas alone; if the JSON
 * ends up invalid the site ignores that one field and uses its built-in copy.
 *
 * This schema was generated from the documents already in the dataset, so it
 * matches the existing content exactly.
 */
export default defineType({
  name: 'pageResources',
  title: 'Resources / White Papers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      description:
        'Optional. Overrides how this page appears in Google and when shared. Leave blank to use the page headline and intro.',
      type: 'seoLocale',
    }),
    defineField({
      name: 'ctaDownload',
      title: 'Cta Download',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaShare',
      title: 'Cta Share',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Cta Title',
      type: 'localeString',
    }),
    defineField({
      name: 'downloadPdf',
      title: 'Download Pdf',
      type: 'localeString',
    }),
    defineField({
      name: 'filters',
      title: 'Filters',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'heroTag',
      title: 'Hero Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localeString',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'localeString',
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'localeString',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Resources / White Papers Page' }),
  },
});
