import { defineField, defineType } from 'sanity';
import {
  featureFields,
  iconField,
  list,
  oldFormat,
  paragraph,
  requiredText,
  seoFields,
  text,
  textList,
} from './pageFields';

/**
 * Contact Page — laid out to match the page, one tab per section from top to
 * bottom. See pageFields.js for how text boxes and lists behave.
 */

export default defineType({
  name: 'pageContact',
  title: 'Contact Page',
  type: 'document',

  groups: [
    { name: 'hero', title: '1. Top banner', default: true },
    { name: 'routes', title: '2. Three cards' },
    { name: 'form', title: '3. Contact form' },
    { name: 'details', title: '4. Contact details & map' },
    { name: 'newsletter', title: '5. Newsletter strip' },
    { name: 'seo', title: 'SEO & schema' },
  ],

  fieldsets: [
    { name: 'formHeading', title: 'Form heading' },
    { name: 'nameField', title: 'Name field', description: 'The label above the box, and the grey example text inside it.' },
    { name: 'emailField', title: 'Email field', description: 'The label above the box, and the grey example text inside it.' },
    { name: 'phoneField', title: 'Phone field', description: 'The label above the box, and the grey example text inside it.' },
    { name: 'roleField', title: '"I am a…" dropdown' },
    { name: 'orgField', title: 'Organisation field', description: 'The label above the box, and the grey example text inside it.' },
    { name: 'countryField', title: 'Country dropdown' },
    { name: 'langField', title: 'Preferred language choice' },
    { name: 'messageField', title: 'Message box', description: 'The label above the box, and the grey example text inside it.' },
    { name: 'submitField', title: 'Sending' },
    { name: 'map', title: 'Map caption' },
  ],

  fields: [
    /* ------------------------------------------------------ 1. Top banner */
    text('tag', 'Small label above the heading', 'e.g. "Get in touch"', 'hero'),
    text('title', 'Heading', 'The big heading at the top of the page.', 'hero'),
    paragraph('subtitle', 'Text under the heading', undefined, 'hero'),

    /* ----------------------------------------------------- 2. Three cards */
    list({
      name: 'routes',
      title: 'Cards',
      description: 'The icon + title + description cards below the top banner.',
      group: 'routes',
      itemName: 'featureItem',
      itemTitle: 'Card',
      titleKey: 'title',
      plainKey: 'icon',
      fields: featureFields(),
    }),
    oldFormat('routes_json', 'routes'),

    /* ---------------------------------------------------- 3. Contact form */
    text('formTitle', 'Heading', 'e.g. "Send us a message"', 'form', 'formHeading'),
    text('formSubtitle', 'Text under the heading', undefined, 'form', 'formHeading'),

    text('fullName', 'Label', 'e.g. "Full name"', 'form', 'nameField'),
    text('fullNamePh', 'Example text inside the box', 'e.g. "e.g. Sultan Al-Mansoori"', 'form', 'nameField'),
    text('email', 'Label', 'e.g. "Email address"', 'form', 'emailField'),
    text('emailPh', 'Example text inside the box', undefined, 'form', 'emailField'),
    text('phone', 'Label', 'e.g. "Phone number"', 'form', 'phoneField'),
    text('phonePh', 'Example text inside the box', undefined, 'form', 'phoneField'),

    text('iAmA', 'Label', 'e.g. "I am a…"', 'form', 'roleField'),
    text('selectRole', 'First option (before choosing)', 'e.g. "Select role"', 'form', 'roleField'),
    textList('roles', 'Options', 'One row per option, e.g. Parent, Student.', 'form', 'roleField'),

    text('org', 'Label', 'e.g. "Organization / School"', 'form', 'orgField'),
    text('orgPh', 'Example text inside the box', undefined, 'form', 'orgField'),

    text('country', 'Label', 'e.g. "Country"', 'form', 'countryField'),
    textList('countries', 'Options', 'One row per country. The first row is selected by default.', 'form', 'countryField'),

    text('prefLang', 'Label', 'e.g. "Preferred language"', 'form', 'langField'),
    list({
      name: 'langs',
      title: 'Choices',
      description: 'The two round buttons. Keep one row for English and one for Arabic.',
      group: 'form',
      fieldset: 'langField',
      itemName: 'languageChoice',
      itemTitle: 'Choice',
      titleKey: 'label',
      plainKey: 'code',
      fields: [
        defineField({
          name: 'code',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              { title: 'English', value: 'en' },
              { title: 'Arabic', value: 'ar' },
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'label',
          title: 'Text shown next to the button',
          type: 'localeString',
          validation: requiredText,
        }),
      ],
    }),
    oldFormat('langs_json', 'form', 'langField'),

    text('message', 'Label', 'e.g. "Message"', 'form', 'messageField'),
    text('messagePh', 'Example text inside the box', undefined, 'form', 'messageField'),

    text('submit', 'Send button', 'e.g. "Submit inquiry"', 'form', 'submitField'),
    text('toast', 'Message after sending', 'The short confirmation that pops up at the bottom of the screen.', 'form', 'submitField'),

    /* ------------------------------------------- 4. Contact details & map */
    list({
      name: 'info',
      title: 'Contact details',
      description: 'The rows in the white box next to the form.',
      group: 'details',
      itemName: 'contactDetail',
      itemTitle: 'Contact detail',
      titleKey: 'title',
      plainKey: 'icon',
      fields: [
        iconField,
        defineField({ name: 'title', title: 'Title', description: 'e.g. "WhatsApp us"', type: 'localeString', validation: requiredText }),
        defineField({
          name: 'description',
          title: 'Text',
          description: 'Press Enter for a new line, e.g. for an address.',
          type: 'localeText',
          validation: requiredText,
        }),
        defineField({
          name: 'action',
          title: 'Phone number or email (optional)',
          description:
            'Shown in bold below the text. A phone number becomes a tap-to-call link, an email address becomes an email link. Leave empty for rows like the office address.',
          type: 'string',
        }),
      ],
    }),
    oldFormat('info_json', 'details'),
    text(
      'connect',
      'Heading above the social icons',
      'e.g. "Connect with us". The icons themselves come from Social links in Site Settings.',
      'details',
    ),
    text('mapTitle', 'Title under the map', 'e.g. "Dubai International Academic City"', 'details', 'map'),
    text('mapSub', 'Small text under the title', undefined, 'details', 'map'),

    /* ----------------------------------------------- 5. Newsletter strip */
    text('newsletterTitle', 'Heading', 'e.g. "Stay updated"', 'newsletter'),
    text('newsletterSub', 'Text under the heading', undefined, 'newsletter'),
    text('newsletterPh', 'Example text inside the email box', 'e.g. "Enter your email"', 'newsletter'),
    text('subscribe', 'Button', 'e.g. "Subscribe"', 'newsletter'),

    /* ------------------------------------------------------ SEO & schema */
    ...seoFields(),
  ],

  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
});
