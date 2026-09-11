import { defineField, defineType } from 'sanity';

/**
 * Services Page
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
  name: 'pageServices',
  title: 'Services Page',
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
      name: 'forInstitutionsBtn',
      title: 'For Institutions Btn',
      type: 'localeString',
    }),
    defineField({
      name: 'forStudents',
      title: 'For Students',
      type: 'localeString',
    }),
    defineField({
      name: 'getStarted',
      title: 'Get Started',
      type: 'localeString',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'localeString',
    }),
    defineField({
      name: 'instSubtitle',
      title: 'Inst Subtitle',
      type: 'localeString',
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
      name: 'inst_json',
      title: 'Inst (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'oneTime',
      title: 'One Time',
      type: 'localeString',
    }),
    defineField({
      name: 'premiumBenefits',
      title: 'Premium Benefits',
      type: 'localeString',
    }),
    defineField({
      name: 'requestDemo',
      title: 'Request Demo',
      type: 'localeString',
    }),
    defineField({
      name: 'successSubtitle',
      title: 'Success Subtitle',
      type: 'localeString',
    }),
    defineField({
      name: 'successTag',
      title: 'Success Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'successTitle',
      title: 'Success Title',
      type: 'localeString',
    }),
    defineField({
      name: 'testimonials_json',
      title: 'Testimonials (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'tier1Desc',
      title: 'Tier1 Desc',
      type: 'localeString',
    }),
    defineField({
      name: 'tier1Label',
      title: 'Tier1 Label',
      type: 'localeString',
    }),
    defineField({
      name: 'tier1Price',
      title: 'Tier1 Price',
      type: 'localeString',
    }),
    defineField({
      name: 'tier1Title',
      title: 'Tier1 Title',
      type: 'localeString',
    }),
    defineField({
      name: 'tier1_json',
      title: 'Tier1 (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'tier2Desc',
      title: 'Tier2 Desc',
      type: 'localeString',
    }),
    defineField({
      name: 'tier2Label',
      title: 'Tier2 Label',
      type: 'localeString',
    }),
    defineField({
      name: 'tier2Price',
      title: 'Tier2 Price',
      type: 'localeString',
    }),
    defineField({
      name: 'tier2Title',
      title: 'Tier2 Title',
      type: 'localeString',
    }),
    defineField({
      name: 'tier2_json',
      title: 'Tier2 (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'videoTestimonialsTitle',
      title: 'Video Testimonials Title',
      type: 'localeString',
    }),
    defineField({
      name: 'videoTestimonials_json',
      title: 'Video Testimonials (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'viewProcess',
      title: 'View Process',
      type: 'localeString',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Services Page' }),
  },
});
