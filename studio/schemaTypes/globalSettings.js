import { defineField, defineType } from 'sanity';

/**
 * Global Settings
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
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'footerJson',
      title: 'Footer Json',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'modalJson',
      title: 'Modal Json',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'navJson',
      title: 'Nav Json',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Global Settings' }),
  },
});
