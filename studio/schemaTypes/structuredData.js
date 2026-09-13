import { defineField, defineType } from 'sanity';

/**
 * Structured data (schema.org) an editor can attach to a page.
 *
 * Each entry describes one real thing shown on the page — a service you sell,
 * a course, an event, your office — in the JSON-LD format search engines read
 * directly. The site turns these into markup at build time.
 *
 * Why a fixed set of types rather than a box to paste raw JSON-LD: raw JSON
 * fails silently on one missing comma, and nobody notices until rankings
 * drop. Typed fields are validated here in the Studio, and the site skips any
 * entry still missing a required field instead of publishing broken markup.
 *
 * FAQ is deliberately NOT offered. Google requires FAQ markup to match
 * questions visible on the page; the home page FAQ is generated automatically
 * from the questions it actually shows.
 */

const CURRENCIES = [
  { title: 'AED — UAE dirham', value: 'AED' },
  { title: 'SAR — Saudi riyal', value: 'SAR' },
  { title: 'QAR — Qatari riyal', value: 'QAR' },
  { title: 'KWD — Kuwaiti dinar', value: 'KWD' },
  { title: 'BHD — Bahraini dinar', value: 'BHD' },
  { title: 'OMR — Omani rial', value: 'OMR' },
  { title: 'USD — US dollar', value: 'USD' },
];

const COUNTRIES = [
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
].map((c) => ({ title: c, value: c }));

const hasText = (v) => Boolean(v?.en?.trim() || v?.ar?.trim());

/** Required bilingual field: at least one language must be filled in. */
const requiredLocale = (Rule) =>
  Rule.custom((v) => (hasText(v) ? true : 'Fill in at least one language.'));

const label = (v) => v?.en || v?.ar || '';

const priceFields = [
  defineField({
    name: 'price',
    title: 'Price',
    description: 'Leave blank if there is no fixed price.',
    type: 'number',
    validation: (Rule) => Rule.min(0),
  }),
  defineField({
    name: 'priceCurrency',
    title: 'Currency',
    type: 'string',
    options: { list: CURRENCIES },
    initialValue: 'AED',
  }),
];

/* ------------------------------------------------------------- Service */

export const sdService = defineType({
  name: 'sdService',
  title: 'Service',
  type: 'object',
  description: 'Something you sell, such as Career Path Finder. Suits the Services page.',
  fields: [
    defineField({ name: 'name', title: 'Service name', type: 'localeString', validation: requiredLocale }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({
      name: 'serviceType',
      title: 'Service type',
      description: 'A short category, e.g. "Career assessment".',
      type: 'localeString',
    }),
    ...priceFields,
    defineField({
      name: 'areaServed',
      title: 'Countries served',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: COUNTRIES, layout: 'grid' },
    }),
  ],
  preview: {
    select: { name: 'name', price: 'price', cur: 'priceCurrency' },
    prepare: ({ name, price, cur }) => ({
      title: label(name) || 'Service',
      subtitle: ['Service', price != null ? `${price} ${cur ?? ''}`.trim() : null]
        .filter(Boolean)
        .join(' · '),
    }),
  },
});

/* -------------------------------------------------------------- Course */

export const sdCourse = defineType({
  name: 'sdCourse',
  title: 'Course',
  type: 'object',
  description: 'A course or programme with a clear name and description.',
  fields: [
    defineField({ name: 'name', title: 'Course name', type: 'localeString', validation: requiredLocale }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Required — Google will not use course markup without one.',
      type: 'localeText',
      validation: requiredLocale,
    }),
    defineField({
      name: 'inLanguage',
      title: 'Taught in',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Arabic', value: 'ar' },
        ],
        layout: 'grid',
      },
    }),
    ...priceFields,
  ],
  preview: {
    select: { name: 'name' },
    prepare: ({ name }) => ({ title: label(name) || 'Course', subtitle: 'Course' }),
  },
});

/* --------------------------------------------------------------- Event */

const isOnline = (parent) => (parent?.attendanceMode ?? 'online') === 'online';

export const sdEvent = defineType({
  name: 'sdEvent',
  title: 'Event',
  type: 'object',
  description: 'A webinar, open day or school demo session with a date.',
  fields: [
    defineField({ name: 'name', title: 'Event name', type: 'localeString', validation: requiredLocale }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({
      name: 'startDate',
      title: 'Starts',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Ends',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((end, ctx) =>
          end && ctx.parent?.startDate && end < ctx.parent.startDate
            ? 'The end must be after the start.'
            : true,
        ),
    }),
    defineField({
      name: 'attendanceMode',
      title: 'Where',
      type: 'string',
      options: {
        list: [
          { title: 'Online', value: 'online' },
          { title: 'In person', value: 'offline' },
          { title: 'Both', value: 'mixed' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'online',
    }),
    defineField({
      name: 'url',
      title: 'Joining or registration link',
      type: 'url',
      validation: (Rule) =>
        Rule.custom((url, ctx) =>
          ctx.parent?.attendanceMode !== 'offline' && !url ? 'Online events need a link.' : true,
        ),
    }),
    defineField({
      name: 'locationName',
      title: 'Venue name',
      type: 'localeString',
      hidden: ({ parent }) => isOnline(parent),
      validation: (Rule) =>
        Rule.custom((v, ctx) =>
          !isOnline(ctx.parent) && !hasText(v) ? 'In-person events need a venue name.' : true,
        ),
    }),
    defineField({
      name: 'streetAddress',
      title: 'Street address',
      type: 'localeString',
      hidden: ({ parent }) => isOnline(parent),
    }),
    defineField({
      name: 'addressLocality',
      title: 'City',
      type: 'localeString',
      hidden: ({ parent }) => isOnline(parent),
    }),
    defineField({
      name: 'addressCountry',
      title: 'Country code',
      description: 'Two letters, e.g. AE.',
      type: 'string',
      initialValue: 'AE',
      hidden: ({ parent }) => isOnline(parent),
    }),
    ...priceFields,
    defineField({ name: 'image', title: 'Event image', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: { name: 'name', start: 'startDate' },
    prepare: ({ name, start }) => ({
      title: label(name) || 'Event',
      subtitle: ['Event', start ? new Date(start).toLocaleDateString() : null]
        .filter(Boolean)
        .join(' · '),
    }),
  },
});

/* -------------------------------------------------------- Organisation */

const needsAddress = (parent) =>
  (parent?.businessType ?? 'EducationalOrganization') !== 'EducationalOrganization';

const addressRule = (Rule) =>
  Rule.custom((v, ctx) =>
    needsAddress(ctx.parent) && !hasText(v) ? 'Required for this kind of organisation.' : true,
  );

const DAY = '(Mo|Tu|We|Th|Fr|Sa|Su)';
const OPENING_HOURS = new RegExp(`^${DAY}(-${DAY})?(,${DAY}(-${DAY})?)* \\d{2}:\\d{2}-\\d{2}:\\d{2}$`);

export const sdOrganization = defineType({
  name: 'sdOrganization',
  title: 'Office / organisation',
  type: 'object',
  description: 'Your office or business details. Suits the Contact page.',
  fields: [
    defineField({
      name: 'businessType',
      title: 'Kind of organisation',
      type: 'string',
      options: {
        list: [
          { title: 'Education provider', value: 'EducationalOrganization' },
          { title: 'Professional service', value: 'ProfessionalService' },
          { title: 'Local business (general)', value: 'LocalBusiness' },
        ],
        layout: 'radio',
      },
      initialValue: 'EducationalOrganization',
    }),
    defineField({ name: 'name', title: 'Name', type: 'localeString', validation: requiredLocale }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({
      name: 'telephone',
      title: 'Phone',
      description: 'International format, e.g. +971 4 000 0000.',
      type: 'string',
    }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.email() }),
    defineField({ name: 'streetAddress', title: 'Street address', type: 'localeString', validation: addressRule }),
    defineField({ name: 'addressLocality', title: 'City', type: 'localeString', validation: addressRule }),
    defineField({ name: 'addressRegion', title: 'Emirate / region', type: 'localeString' }),
    defineField({ name: 'postalCode', title: 'Postal code', type: 'string' }),
    defineField({
      name: 'addressCountry',
      title: 'Country code',
      description: 'Two letters, e.g. AE.',
      type: 'string',
      initialValue: 'AE',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening hours',
      description: 'One line per block, e.g. "Mo-Fr 09:00-18:00" or "Sa 10:00-14:00".',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (Rule) =>
            Rule.regex(OPENING_HOURS, { name: 'opening hours like "Mo-Fr 09:00-18:00"' }).warning(),
        },
      ],
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      validation: (Rule) => Rule.min(-90).max(90),
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      validation: (Rule) => Rule.min(-180).max(180),
    }),
  ],
  preview: {
    select: { name: 'name', type: 'businessType' },
    prepare: ({ name, type }) => ({
      title: label(name) || 'Organisation',
      subtitle: type ?? 'EducationalOrganization',
    }),
  },
});

export const structuredDataTypes = [sdService, sdCourse, sdEvent, sdOrganization];

/**
 * The field itself, added to the page documents and to landing pages.
 * `bilingual` switches the help text: a page document produces both language
 * versions of its page, while a landing page is written in one language.
 */
export function structuredDataField({ bilingual = true } = {}) {
  return defineField({
    name: 'structuredData',
    title: 'Structured data (schema.org)',
    description: [
      'Optional. Describes a service, course, event or office on this page in a format search engines read directly.',
      'Only add things actually shown on this page — markup that does not match the page can be ignored or penalised.',
      bilingual
        ? 'Each language version of the page uses its own language boxes.'
        : 'Fill in the language this page is published in.',
    ].join(' '),
    type: 'array',
    of: [{ type: 'sdService' }, { type: 'sdCourse' }, { type: 'sdEvent' }, { type: 'sdOrganization' }],
  });
}
