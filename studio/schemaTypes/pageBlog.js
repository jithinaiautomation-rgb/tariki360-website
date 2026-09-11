import { defineField, defineType } from 'sanity';

/**
 * Blog Page
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
  name: 'pageBlog',
  title: 'Blog Page',
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
      name: 'browseResources',
      title: 'Browse Resources',
      type: 'localeString',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'emailPh',
      title: 'Email Ph',
      type: 'localeString',
    }),
    defineField({
      name: 'featuredTag',
      title: 'Featured Tag',
      type: 'localeString',
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
      name: 'latestSubtitle',
      title: 'Latest Subtitle',
      type: 'localeString',
    }),
    defineField({
      name: 'latestTitle',
      title: 'Latest Title',
      type: 'localeString',
    }),
    defineField({
      name: 'newsletterSub',
      title: 'Newsletter Sub',
      type: 'localeText',
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter Title',
      type: 'localeString',
    }),
    defineField({
      name: 'read',
      title: 'Read',
      type: 'localeString',
    }),
    defineField({
      name: 'readArticle',
      title: 'Read Article',
      type: 'localeString',
    }),
    defineField({
      name: 'startCareerMapping',
      title: 'Start Career Mapping',
      type: 'localeString',
    }),
    defineField({
      name: 'subscribe',
      title: 'Subscribe',
      type: 'localeString',
    }),
    defineField({
      name: 'thanks',
      title: 'Thanks',
      type: 'localeString',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Blog Page' }),
  },
});
