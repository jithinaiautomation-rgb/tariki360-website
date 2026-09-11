import { defineField, defineType } from 'sanity';

/**
 * A longer paragraph in both languages — same rules as localeString,
 * just with multi-line boxes.
 */
export default defineType({
  name: 'localeText',
  title: 'Paragraph (EN / AR)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
    defineField({ name: 'ar', title: 'العربية (Arabic)', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { en: 'en', ar: 'ar' },
    prepare: ({ en, ar }) => ({ title: (en || ar || '(empty)').slice(0, 70) }),
  },
});
