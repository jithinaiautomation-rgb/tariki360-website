import { defineField, defineType } from 'sanity';

/**
 * Site Settings — a single document (there is only ever one) holding the
 * details used across every page of the site.
 *
 * Find it at the very top of the Content list in the Studio.
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Hides the "create new" button — this is a one-off document.
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      description:
        'Appears at the end of every browser tab title, e.g. "Services | Tariki 360".',
      type: 'string',
      initialValue: 'Tariki 360',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Default description',
      description:
        'Used as the search-result summary for any page that has no description of its own. 120–160 characters.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'defaultShareImage',
      title: 'Default share image',
      description:
        'Shown when a page with no image of its own is shared on social media. 1200×630 pixels works best.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'organisationLegalName',
      title: 'Organisation legal name',
      description:
        'The registered company name. Used in the structured data that tells Google who runs this site.',
      type: 'string',
      initialValue: 'NABD Consultancies & Training · CLAP Smart Learn',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      description:
        'Shown in the footer and on the contact page, and used to tell Google which social accounts belong to you.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Website', value: 'website' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
