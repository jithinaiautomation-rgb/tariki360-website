import { defineField, defineType } from 'sanity';
import {
  featureFields,
  list,
  oldFormat,
  paragraph,
  requiredText,
  seoFields,
  text,
  unusedField,
} from './pageFields';

/**
 * Services Page — laid out to match the page, one tab per section from top to
 * bottom. See pageFields.js for how text boxes and lists behave.
 */

const tickRow = [defineField({ name: 'label', title: 'Text', type: 'localeString', validation: requiredText })];

export default defineType({
  name: 'pageServices',
  title: 'Services Page',
  type: 'document',

  groups: [
    { name: 'hero', title: '1. Top banner', default: true },
    { name: 'plans', title: '2. Price cards' },
    { name: 'institutions', title: '3. For institutions' },
    { name: 'stories', title: '4. Success stories' },
    { name: 'seo', title: 'SEO & schema' },
  ],

  fieldsets: [
    { name: 'heroButtons', title: 'Buttons' },
    { name: 'shared', title: 'Used on both cards', description: 'These words appear on the left card and on the right card.' },
    { name: 'tier1', title: 'Left card' },
    { name: 'tier2', title: 'Right card (premium, green)' },
    { name: 'instHeading', title: 'Section heading' },
  ],

  fields: [
    /* ------------------------------------------------------ 1. Top banner */
    text('heroTitle', 'Heading', 'The big heading at the top of the page.', 'hero'),
    paragraph('heroSubtitle', 'Text under the heading', undefined, 'hero'),
    text('forStudents', 'First button (red)', 'Opens the sign-up form.', 'hero', 'heroButtons'),
    text('forInstitutionsBtn', 'Second button (outline)', 'Scrolls down to the "For institutions" section.', 'hero', 'heroButtons'),

    /* ----------------------------------------------------- 2. Price cards */
    text('oneTime', 'Word next to each price', 'e.g. "one-time"', 'plans', 'shared'),
    text('getStarted', 'Red button on each card', 'Opens the sign-up form.', 'plans', 'shared'),
    text('viewProcess', 'Second button on each card', 'Links to the Benefits page.', 'plans', 'shared'),

    text('tier1Label', 'Small text above the title', 'e.g. "Instant, AI-powered insights"', 'plans', 'tier1'),
    text('tier1Title', 'Plan name', 'e.g. "Career Path Finder"', 'plans', 'tier1'),
    text('tier1Desc', 'Description', undefined, 'plans', 'tier1'),
    text('tier1Price', 'Price', 'e.g. "AED 599". Has an Arabic box in case Arabic writes it differently.', 'plans', 'tier1'),
    list({
      name: 'tier1',
      title: 'What is included (tick list)',
      description: 'One row per point. Each gets a tick icon automatically.',
      group: 'plans',
      fieldset: 'tier1',
      itemName: 'tickItem',
      itemTitle: 'Point',
      titleKey: 'label',
      fields: tickRow,
    }),
    oldFormat('tier1_json', 'plans', 'tier1'),

    text('tier2Label', 'Small text above the title', 'e.g. "Go deeper. Get clearer."', 'plans', 'tier2'),
    text('tier2Title', 'Plan name', 'e.g. "Career Champion"', 'plans', 'tier2'),
    text('tier2Desc', 'Description', undefined, 'plans', 'tier2'),
    text('tier2Price', 'Price', 'e.g. "AED 899"', 'plans', 'tier2'),
    text('premiumBenefits', 'Label above the tick list', 'e.g. "Premium benefits"', 'plans', 'tier2'),
    list({
      name: 'tier2',
      title: 'What is included (tick list)',
      description: 'One row per point. Each gets a tick icon automatically.',
      group: 'plans',
      fieldset: 'tier2',
      itemName: 'tickItem',
      itemTitle: 'Point',
      titleKey: 'label',
      fields: tickRow,
    }),
    oldFormat('tier2_json', 'plans', 'tier2'),

    /* ----------------------------------------------- 3. For institutions */
    text('instTag', 'Small label', 'e.g. "For institutions"', 'institutions', 'instHeading'),
    text('instTitle', 'Heading', undefined, 'institutions', 'instHeading'),
    text('instSubtitle', 'Text under the heading', undefined, 'institutions', 'instHeading'),
    list({
      name: 'inst',
      title: 'Cards',
      description: 'The icon + title + description cards.',
      group: 'institutions',
      itemName: 'featureItem',
      itemTitle: 'Card',
      titleKey: 'title',
      plainKey: 'icon',
      fields: featureFields(),
    }),
    oldFormat('inst_json', 'institutions'),
    text('requestDemo', 'Button below the cards', 'Links to the Contact page.', 'institutions'),

    /* ------------------------------------------------ 4. Success stories */
    text('successTag', 'Small label', 'e.g. "Success stories"', 'stories'),
    text(
      'successTitle',
      'Heading',
      'The written testimonials themselves are edited in "Testimonials" in the sidebar.',
      'stories',
    ),
    text('successSubtitle', 'Text under the heading', undefined, 'stories'),
    text(
      'videoTestimonialsTitle',
      'Heading above the video testimonials',
      'The videos themselves are edited in "Video Testimonials" in the sidebar.',
      'stories',
    ),
    // Older copies of the testimonials. The page reads the Testimonials and
    // Video Testimonials documents instead, so these are kept but hidden.
    unusedField('testimonials_json'),
    unusedField('videoTestimonials_json'),

    /* ------------------------------------------------------ SEO & schema */
    ...seoFields(),
  ],

  preview: {
    prepare: () => ({ title: 'Services Page' }),
  },
});
