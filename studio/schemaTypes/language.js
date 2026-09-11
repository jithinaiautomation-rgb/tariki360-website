import { defineField } from 'sanity';

/**
 * The shared "language" field.
 *
 * The site builds English pages at the root (/blog/my-post/) and Arabic
 * pages under /ar/ (/ar/blog/my-post/). This field decides which of the two
 * a document appears on.
 *
 * It defaults to English, and documents created before the site became
 * bilingual — which have no language field at all — are also treated as
 * English. So nothing you have already published needs editing.
 */
export const languageField = defineField({
  name: 'language',
  title: 'Language',
  description:
    'English documents appear on the main site; Arabic documents appear under /ar/.',
  type: 'string',
  options: {
    list: [
      { title: 'English', value: 'en' },
      { title: 'العربية (Arabic)', value: 'ar' },
    ],
    layout: 'radio',
    direction: 'horizontal',
  },
  initialValue: 'en',
  validation: (Rule) => Rule.required(),
});
