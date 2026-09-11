import { defineField, defineType } from 'sanity';

/**
 * Benefits Page
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
  name: 'pageBenefits',
  title: 'Benefits Page',
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
      name: 'afterLabel',
      title: 'After Label',
      type: 'localeString',
    }),
    defineField({
      name: 'after_json',
      title: 'After (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'aiFeatureTag',
      title: 'Ai Feature Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'aiMentorDesc',
      title: 'Ai Mentor Desc',
      type: 'localeText',
    }),
    defineField({
      name: 'aiMentorFeatures_json',
      title: 'Ai Mentor Features (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'aiMentorTitle',
      title: 'Ai Mentor Title',
      type: 'localeString',
    }),
    defineField({
      name: 'beforeLabel',
      title: 'Before Label',
      type: 'localeString',
    }),
    defineField({
      name: 'before_json',
      title: 'Before (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'benefitsSubtitle',
      title: 'Benefits Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'benefitsTag',
      title: 'Benefits Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'benefitsTitle',
      title: 'Benefits Title',
      type: 'localeString',
    }),
    defineField({
      name: 'forParents',
      title: 'For Parents',
      type: 'localeString',
    }),
    defineField({
      name: 'forStudents',
      title: 'For Students',
      type: 'localeString',
    }),
    defineField({
      name: 'grid_json',
      title: 'Grid (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
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
      name: 'instList',
      title: 'Inst List',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'instSubtitle',
      title: 'Inst Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'instTag',
      title: 'Inst Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'instTitle',
      title: 'Inst Title',
      type: 'localeString',
    }),
    defineField({
      name: 'institutionalDemo',
      title: 'Institutional Demo',
      type: 'localeString',
    }),
    defineField({
      name: 'parentCards_json',
      title: 'Parent Cards (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'requestAccess',
      title: 'Request Access',
      type: 'localeString',
    }),
    defineField({
      name: 'startAssessment',
      title: 'Start Assessment',
      type: 'localeString',
    }),
    defineField({
      name: 'stats_json',
      title: 'Stats (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'studentCards_json',
      title: 'Student Cards (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'transformationSubtitle',
      title: 'Transformation Subtitle',
      type: 'localeString',
    }),
    defineField({
      name: 'transformationTag',
      title: 'Transformation Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'transformationTitle',
      title: 'Transformation Title',
      type: 'localeString',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Benefits Page' }),
  },
});
