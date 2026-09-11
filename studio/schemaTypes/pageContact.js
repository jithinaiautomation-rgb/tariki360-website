import { defineField, defineType } from 'sanity';

/**
 * Contact Page
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
  name: 'pageContact',
  title: 'Contact Page',
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
      name: 'connect',
      title: 'Connect',
      type: 'localeString',
    }),
    defineField({
      name: 'countries',
      title: 'Countries',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'localeString',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'localeString',
    }),
    defineField({
      name: 'emailPh',
      title: 'Email Ph',
      type: 'localeString',
    }),
    defineField({
      name: 'formSubtitle',
      title: 'Form Subtitle',
      type: 'localeString',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'localeString',
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'localeString',
    }),
    defineField({
      name: 'fullNamePh',
      title: 'Full Name Ph',
      type: 'localeString',
    }),
    defineField({
      name: 'iAmA',
      title: 'I Am A',
      type: 'localeString',
    }),
    defineField({
      name: 'info_json',
      title: 'Info (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'langs_json',
      title: 'Langs (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'mapSub',
      title: 'Map Sub',
      type: 'localeString',
    }),
    defineField({
      name: 'mapTitle',
      title: 'Map Title',
      type: 'localeString',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'localeString',
    }),
    defineField({
      name: 'messagePh',
      title: 'Message Ph',
      type: 'localeString',
    }),
    defineField({
      name: 'newsletterPh',
      title: 'Newsletter Ph',
      type: 'localeString',
    }),
    defineField({
      name: 'newsletterSub',
      title: 'Newsletter Sub',
      type: 'localeString',
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter Title',
      type: 'localeString',
    }),
    defineField({
      name: 'org',
      title: 'Org',
      type: 'localeString',
    }),
    defineField({
      name: 'orgPh',
      title: 'Org Ph',
      type: 'localeString',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'localeString',
    }),
    defineField({
      name: 'phonePh',
      title: 'Phone Ph',
      type: 'localeString',
    }),
    defineField({
      name: 'prefLang',
      title: 'Pref Lang',
      type: 'localeString',
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'routes_json',
      title: 'Routes (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'selectRole',
      title: 'Select Role',
      type: 'localeString',
    }),
    defineField({
      name: 'submit',
      title: 'Submit',
      type: 'localeString',
    }),
    defineField({
      name: 'subscribe',
      title: 'Subscribe',
      type: 'localeString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'toast',
      title: 'Toast',
      type: 'localeString',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
});
