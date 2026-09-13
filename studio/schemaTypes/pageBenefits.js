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
 * Benefits Page — laid out to match the page, one tab per section from top to
 * bottom. See pageFields.js for how text boxes and lists behave.
 */

const titleAndText = () => [
  defineField({ name: 'title', title: 'Title', type: 'localeString', validation: requiredText }),
  defineField({ name: 'description', title: 'Text', type: 'localeText', validation: requiredText }),
];

export default defineType({
  name: 'pageBenefits',
  title: 'Benefits Page',
  type: 'document',

  groups: [
    { name: 'hero', title: '1. Top banner', default: true },
    { name: 'mentor', title: '2. Benefits intro & AI mentor' },
    { name: 'cards', title: '3. Students & parents cards' },
    { name: 'transformation', title: '4. Before & after' },
    { name: 'institutions', title: '5. For institutions' },
    { name: 'seo', title: 'SEO & schema' },
  ],

  fieldsets: [
    { name: 'heroButtons', title: 'Buttons' },
    { name: 'benefitsHeading', title: 'Section heading' },
    { name: 'mentorCard', title: 'AI mentor card' },
    { name: 'students', title: 'Students (left)' },
    { name: 'parents', title: 'Parents (right)' },
    { name: 'transformationHeading', title: 'Section heading' },
    { name: 'before', title: 'Before (left, red)' },
    { name: 'after', title: 'After (right, green)' },
    { name: 'instLeft', title: 'Left side' },
  ],

  fields: [
    /* ------------------------------------------------------ 1. Top banner */
    text('heroTag', 'Small label above the heading', 'e.g. "Transforming futures"', 'hero'),
    text('heroTitle', 'Heading', 'The big heading at the top of the page.', 'hero'),
    paragraph('heroSubtitle', 'Text under the heading', undefined, 'hero'),
    text('startAssessment', 'First button (red)', 'Opens the sign-up form.', 'hero', 'heroButtons'),
    text('institutionalDemo', 'Second button (outline)', 'Links to the Contact page.', 'hero', 'heroButtons'),
    list({
      name: 'stats',
      title: 'Numbers under the buttons',
      group: 'hero',
      itemName: 'statItem',
      itemTitle: 'Number',
      titleKey: 'value',
      fields: [
        defineField({
          name: 'value',
          title: 'Number',
          description: 'e.g. "20–30m" or "360°". Has an Arabic box because Arabic sometimes writes it differently.',
          type: 'localeString',
          validation: requiredText,
        }),
        defineField({ name: 'label', title: 'Label under the number', type: 'localeString', validation: requiredText }),
      ],
    }),
    oldFormat('stats_json', 'hero'),

    /* ------------------------------------ 2. Benefits intro & AI mentor */
    text('benefitsTag', 'Small label', 'e.g. "Benefits"', 'mentor', 'benefitsHeading'),
    text('benefitsTitle', 'Heading', undefined, 'mentor', 'benefitsHeading'),
    paragraph('benefitsSubtitle', 'Text under the heading', undefined, 'mentor', 'benefitsHeading'),
    text('aiFeatureTag', 'Small gold label', 'e.g. "Premium AI feature"', 'mentor', 'mentorCard'),
    text('aiMentorTitle', 'Card heading', 'e.g. "Your AI career mentor"', 'mentor', 'mentorCard'),
    paragraph('aiMentorDesc', 'Card text', undefined, 'mentor', 'mentorCard'),
    list({
      name: 'aiMentorFeatures',
      title: 'Points with icons',
      group: 'mentor',
      fieldset: 'mentorCard',
      itemName: 'iconPoint',
      itemTitle: 'Point',
      titleKey: 'label',
      plainKey: 'icon',
      fields: [iconField, defineField({ name: 'label', title: 'Text', type: 'localeString', validation: requiredText })],
    }),
    oldFormat('aiMentorFeatures_json', 'mentor', 'mentorCard'),

    /* ----------------------------------------- 3. Students & parents cards */
    text('forStudents', 'Heading', 'e.g. "For students"', 'cards', 'students'),
    list({
      name: 'studentCards',
      title: 'Cards',
      group: 'cards',
      fieldset: 'students',
      itemName: 'featureItem',
      itemTitle: 'Card',
      titleKey: 'title',
      plainKey: 'icon',
      fields: featureFields(),
    }),
    oldFormat('studentCards_json', 'cards', 'students'),
    text('forParents', 'Heading', 'e.g. "For parents"', 'cards', 'parents'),
    list({
      name: 'parentCards',
      title: 'Cards',
      group: 'cards',
      fieldset: 'parents',
      itemName: 'featureItem',
      itemTitle: 'Card',
      titleKey: 'title',
      plainKey: 'icon',
      fields: featureFields(),
    }),
    oldFormat('parentCards_json', 'cards', 'parents'),

    /* ------------------------------------------------- 4. Before & after */
    text('transformationTag', 'Small label', 'e.g. "Transformation"', 'transformation', 'transformationHeading'),
    text('transformationTitle', 'Heading', undefined, 'transformation', 'transformationHeading'),
    text('transformationSubtitle', 'Text under the heading', undefined, 'transformation', 'transformationHeading'),
    text('beforeLabel', 'Label', 'e.g. "The chaos (before)"', 'transformation', 'before'),
    list({
      name: 'before',
      title: 'Boxes',
      group: 'transformation',
      fieldset: 'before',
      itemName: 'titleTextItem',
      itemTitle: 'Box',
      titleKey: 'title',
      fields: titleAndText(),
    }),
    oldFormat('before_json', 'transformation', 'before'),
    text('afterLabel', 'Label', 'e.g. "The clarity (after)"', 'transformation', 'after'),
    list({
      name: 'after',
      title: 'Boxes',
      group: 'transformation',
      fieldset: 'after',
      itemName: 'titleTextItem',
      itemTitle: 'Box',
      titleKey: 'title',
      fields: titleAndText(),
    }),
    oldFormat('after_json', 'transformation', 'after'),

    /* ----------------------------------------------- 5. For institutions */
    text('instTag', 'Small label', 'e.g. "For institutions"', 'institutions', 'instLeft'),
    text('instTitle', 'Heading', undefined, 'institutions', 'instLeft'),
    paragraph('instSubtitle', 'Text under the heading', undefined, 'institutions', 'instLeft'),
    textList('instList', 'Tick list', 'One row per point.', 'institutions', 'instLeft'),
    text('requestAccess', 'Button', 'Links to the Contact page.', 'institutions', 'instLeft'),
    list({
      name: 'grid',
      title: 'Cards on the right',
      group: 'institutions',
      itemName: 'featureItem',
      itemTitle: 'Card',
      titleKey: 'title',
      plainKey: 'icon',
      fields: featureFields(),
    }),
    oldFormat('grid_json', 'institutions'),

    /* ------------------------------------------------------ SEO & schema */
    ...seoFields(),
  ],

  preview: {
    prepare: () => ({ title: 'Benefits Page' }),
  },
});
