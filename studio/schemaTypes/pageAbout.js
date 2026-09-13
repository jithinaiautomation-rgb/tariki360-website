import { defineField, defineType } from 'sanity';
import { structuredDataField } from './structuredData';

/**
 * About Page
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
  name: 'pageAbout',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      description:
        'Optional. Overrides how this page appears in Google and when shared. Leave blank to use the page headline and intro.',
      type: 'seoLocale',
    }),
    structuredDataField(),
    defineField({
      name: 'boardSubtitle',
      title: 'Board Subtitle',
      type: 'localeString',
    }),
    defineField({
      name: 'boardTitle',
      title: 'Board Title',
      type: 'localeString',
    }),
    defineField({
      name: 'board_json',
      title: 'Board (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'clarityDesc',
      title: 'Clarity Desc',
      type: 'localeString',
    }),
    defineField({
      name: 'clarityTitle',
      title: 'Clarity Title',
      type: 'localeString',
    }),
    defineField({
      name: 'getInTouch',
      title: 'Get In Touch',
      type: 'localeString',
    }),
    defineField({
      name: 'growthDesc',
      title: 'Growth Desc',
      type: 'localeString',
    }),
    defineField({
      name: 'growthTitle',
      title: 'Growth Title',
      type: 'localeString',
    }),
    defineField({
      name: 'initiativeTag',
      title: 'Initiative Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'localeText',
    }),
    defineField({
      name: 'introStrong1',
      title: 'Intro Strong1',
      type: 'localeString',
    }),
    defineField({
      name: 'introStrong2',
      title: 'Intro Strong2',
      type: 'localeString',
    }),
    defineField({
      name: 'leadershipTag',
      title: 'Leadership Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'partnersTag',
      title: 'Partners Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'partnersTitle',
      title: 'Partners Title',
      type: 'localeString',
    }),
    defineField({
      name: 'partners_json',
      title: 'Partners (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'storyTag',
      title: 'Story Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'localeString',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
    }),
    defineField({
      name: 'whatIsP1',
      title: 'What Is P1',
      type: 'localeText',
    }),
    defineField({
      name: 'whatIsP2',
      title: 'What Is P2',
      type: 'localeText',
    }),
    defineField({
      name: 'whatIsTitle',
      title: 'What Is Title',
      type: 'localeString',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
});
