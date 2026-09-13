import { defineField, defineType } from 'sanity';
import { list, oldFormat, paragraph, requiredText, seoFields, text } from './pageFields';

/**
 * About Page — laid out to match the page, one tab per section from top to
 * bottom. See pageFields.js for how text boxes and lists behave.
 */

export default defineType({
  name: 'pageAbout',
  title: 'About Page',
  type: 'document',

  groups: [
    { name: 'hero', title: '1. Top banner', default: true },
    { name: 'initiative', title: '2. What is Tariki 360' },
    { name: 'partners', title: '3. Partners' },
    { name: 'board', title: '4. Board of directors' },
    { name: 'menu', title: 'Menu' },
    { name: 'seo', title: 'SEO & schema' },
  ],

  fieldsets: [
    {
      name: 'boldNames',
      title: 'Names shown in bold',
      description: 'Wherever these names appear in the intro paragraph above, they are shown in bold. Spell them exactly as in the paragraph.',
    },
    { name: 'initiativeLeft', title: 'Left side' },
    { name: 'clarity', title: 'Card 1 (top right)' },
    { name: 'growth', title: 'Card 2 (bottom right)' },
  ],

  fields: [
    /* ------------------------------------------------------ 1. Top banner */
    text('storyTag', 'Small label above the heading', 'e.g. "Our story"', 'hero'),
    text('title', 'Heading', 'e.g. "About Tariki 360"', 'hero'),
    paragraph('intro', 'Intro paragraph', 'The paragraph under the heading.', 'hero'),
    text('introStrong1', 'First name to show in bold', 'e.g. "NABD Consultancies & Training"', 'hero', 'boldNames'),
    text('introStrong2', 'Second name to show in bold', 'e.g. "CLAP Smart Learn"', 'hero', 'boldNames'),
    text('tagline', 'Short line in italics', 'The line next to the small red bar, e.g. "طريقي — my path — since 2015".', 'hero'),
    text('getInTouch', 'Button', 'Links to the Contact page.', 'hero'),

    /* --------------------------------------------- 2. What is Tariki 360 */
    text('initiativeTag', 'Small label', 'e.g. "The initiative"', 'initiative', 'initiativeLeft'),
    text('whatIsTitle', 'Heading', 'e.g. "What is Tariki 360?"', 'initiative', 'initiativeLeft'),
    paragraph('whatIsP1', 'First paragraph', undefined, 'initiative', 'initiativeLeft'),
    paragraph('whatIsP2', 'Second paragraph', undefined, 'initiative', 'initiativeLeft'),
    text('clarityTitle', 'Title', 'e.g. "Clarity"', 'initiative', 'clarity'),
    text('clarityDesc', 'Text', undefined, 'initiative', 'clarity'),
    text('growthTitle', 'Title', 'e.g. "Growth"', 'initiative', 'growth'),
    text('growthDesc', 'Text', undefined, 'initiative', 'growth'),

    /* ------------------------------------------------------- 3. Partners */
    text('partnersTag', 'Small label', 'e.g. "Partners"', 'partners'),
    text('partnersTitle', 'Heading', undefined, 'partners'),
    list({
      name: 'partners',
      title: 'Partner cards',
      group: 'partners',
      itemName: 'partnerItem',
      itemTitle: 'Partner',
      titleKey: 'name',
      fields: [
        defineField({ name: 'name', title: 'Partner name', type: 'localeString', validation: requiredText }),
        defineField({
          name: 'meta',
          title: 'Small line under the name',
          description: 'e.g. "Established 2015 · Upskilling the Gulf"',
          type: 'localeString',
          validation: requiredText,
        }),
        defineField({ name: 'description', title: 'Description', type: 'localeText', validation: requiredText }),
      ],
    }),
    oldFormat('partners_json', 'partners'),

    /* ----------------------------------------------- 4. Board of directors */
    text('leadershipTag', 'Small label', 'e.g. "Leadership"', 'board'),
    text('boardTitle', 'Heading', 'e.g. "Board of directors"', 'board'),
    text('boardSubtitle', 'Text under the heading', undefined, 'board'),
    list({
      name: 'board',
      title: 'Board members',
      description: 'One row per person, shown in this order.',
      group: 'board',
      itemName: 'boardMember',
      itemTitle: 'Board member',
      titleKey: 'name',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          description: 'Fill in both boxes even if the name is written the same way in Arabic.',
          type: 'localeString',
          validation: requiredText,
        }),
        defineField({ name: 'role', title: 'Role', description: 'e.g. "Chairman"', type: 'localeString', validation: requiredText }),
        defineField({ name: 'description', title: 'Short bio', type: 'localeText', validation: requiredText }),
      ],
    }),
    oldFormat('board_json', 'board'),

    /* ------------------------------------------------------ SEO & schema */
    /* --------------------------------------------------------------- Menu */
    text(
      'navLabel',
      'Name in the top menu',
      'e.g. "About Us". This wins over the label in Navigation, Footer & Sign-up. Leave empty to use that label instead.',
      'menu',
    ),

    ...seoFields(),
  ],

  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
});
