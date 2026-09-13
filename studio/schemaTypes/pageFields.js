import { defineArrayMember, defineField } from 'sanity';
import { structuredDataField } from './structuredData';

/**
 * Field helpers shared by the page documents (Home, Services, Benefits,
 * About, Contact), so every page editor looks and behaves the same way.
 *
 * Conventions used throughout:
 *  • Text fields have an English and an Arabic box. An empty box keeps the
 *    wording the site already ships with for that language.
 *  • Lists are one row per item. A row appears on a language's page only
 *    when all of its text is filled in for that language.
 *  • `group` is the tab a field sits in; `fieldset` is a titled sub-section
 *    inside that tab.
 */

export const text = (name, title, description, group, fieldset) =>
  defineField({ name, title, description, type: 'localeString', group, fieldset });

export const paragraph = (name, title, description, group, fieldset) =>
  defineField({ name, title, description, type: 'localeText', group, fieldset });

/** A list of short texts, one row each (e.g. a tick list). */
export const textList = (name, title, description, group, fieldset) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [{ type: 'localeString' }],
    group,
    fieldset,
  });

export const hasText = (v) => Boolean(v?.en?.trim() || v?.ar?.trim());
export const requiredText = (Rule) =>
  Rule.custom((v) => (hasText(v) ? true : 'Fill in at least one language.'));

export const iconField = defineField({
  name: 'icon',
  title: 'Icon',
  description: 'An icon name from fonts.google.com/icons — for example school, target or play_circle.',
  type: 'string',
  validation: (Rule) => Rule.required(),
});

export const percentField = defineField({
  name: 'percent',
  title: 'Percentage',
  description: 'A number followed by %, for example 72%. It also sets how full the bar is.',
  type: 'string',
  validation: (Rule) => Rule.required().regex(/^\d{1,3}%$/, { name: 'a percentage like 72%' }),
});

/** Icon + title + description — the most common kind of card. */
export const featureFields = () => [
  iconField,
  defineField({ name: 'title', title: 'Title', type: 'localeString', validation: requiredText }),
  defineField({ name: 'description', title: 'Description', type: 'localeText', validation: requiredText }),
];

const label = (v) => v?.en || v?.ar || '';

/** "EN · AR" when every text part of a row is filled in for that language. */
function languagesDone(parts) {
  const done = (lang) => parts.length > 0 && parts.every((p) => p?.[lang]?.trim());
  return [done('en') ? 'EN' : null, done('ar') ? 'AR' : null].filter(Boolean).join(' · ') || 'incomplete';
}

/**
 * A list field with one row per item.
 * `titleKey` is the text shown as each row's title in the list; `plainKey`
 * (an icon, percentage or code) is shown next to the language status.
 */
export function list({ name, title, description, group, fieldset, itemName, itemTitle, fields, titleKey, plainKey }) {
  const localeKeys = fields
    .filter((f) => f.type === 'localeString' || f.type === 'localeText')
    .map((f) => f.name);
  return defineField({
    name,
    title,
    description,
    group,
    fieldset,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        name: itemName,
        title: itemTitle,
        fields,
        preview: {
          select: Object.fromEntries(fields.map((f) => [f.name, f.name])),
          prepare: (sel) => ({
            title: label(sel[titleKey]) || '(empty)',
            subtitle: [plainKey ? sel[plainKey] : null, languagesDone(localeKeys.map((k) => sel[k]))]
              .filter(Boolean)
              .join('  ·  '),
          }),
        },
      }),
    ],
  });
}

/** The previous single-box JSON version of a list. Read-only; hidden once empty. */
export const oldFormat = (name, group, fieldset) =>
  defineField({
    name,
    title: 'Old format — not used once the list above has rows',
    description:
      'The previous single-box version of the list above. Run scripts/migrate-page-lists.js to move it into the list; that also removes this box.',
    type: 'text',
    rows: 3,
    group,
    fieldset,
    readOnly: true,
    hidden: ({ value }) => !value,
  });

/**
 * Data stored on a document that the website does not use. Declared only so
 * the Studio does not warn about an unknown field; always hidden.
 */
export const unusedField = (name) =>
  defineField({ name, title: 'Not used by the website', type: 'text', readOnly: true, hidden: true });

/** The SEO & sharing overrides plus structured data, in their own tab. */
export const seoFields = (group = 'seo') => [
  defineField({
    name: 'seo',
    title: 'SEO & sharing',
    description:
      'Optional. Overrides how this page appears in Google and when shared. Leave blank to use the page headline and intro.',
    type: 'seoLocale',
    group,
  }),
  { ...structuredDataField(), group },
];
