import { defineField, defineType } from 'sanity';

/**
 * A short piece of text in both languages.
 *
 * Fill in English, Arabic, or both. Whichever language you leave blank keeps
 * the wording the website already ships with — so a half-translated field is
 * safe, it just means that one bit of text stays as it was.
 *
 * The Arabic box is intentionally allowed to be empty even when English is
 * filled in: a few headings read better in Arabic without the English lead-in
 * word, and the site handles that correctly.
 */
export default defineType({
  name: 'localeString',
  title: 'Text (EN / AR)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'ar', title: 'العربية (Arabic)', type: 'string' }),
  ],
  preview: {
    select: { en: 'en', ar: 'ar' },
    prepare: ({ en, ar }) => ({ title: en || ar || '(empty)', subtitle: en && ar ? 'EN · AR' : en ? 'EN only' : ar ? 'AR only' : 'empty' }),
  },
});
