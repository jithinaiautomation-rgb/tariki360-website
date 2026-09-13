import { defineField, defineType } from 'sanity';

/**
 * A social media post shown as a card on the Social Media page.
 *
 * The card links out to the original post rather than embedding it. Embeds
 * from Instagram, TikTok and X load their own scripts and tracking cookies and
 * slow the page down, while a link card stays fast and always works.
 */

const PLATFORMS = [
  { title: 'Instagram', value: 'instagram' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'TikTok', value: 'tiktok' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'X (Twitter)', value: 'x' },
  { title: 'Facebook', value: 'facebook' },
];

/** Domains a link for each platform is expected to use. */
const DOMAINS = {
  instagram: ['instagram.com'],
  youtube: ['youtube.com', 'youtu.be'],
  tiktok: ['tiktok.com'],
  linkedin: ['linkedin.com', 'lnkd.in'],
  x: ['x.com', 'twitter.com'],
  facebook: ['facebook.com', 'fb.watch', 'fb.com'],
};

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

export default defineType({
  name: 'socialPost',
  title: 'Social Media Post',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: { list: PLATFORMS, layout: 'radio', direction: 'horizontal' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Link to the post',
      description: 'Open the post in your browser and copy the address from the address bar.',
      type: 'url',
      validation: (Rule) => [
        Rule.required().uri({ scheme: ['https', 'http'] }),
        Rule.custom((url, ctx) => {
          const expected = DOMAINS[ctx.document?.platform];
          const host = url && hostOf(url);
          if (!expected || !host) return true;
          return expected.some((d) => host === d || host.endsWith('.' + d))
            ? true
            : `This doesn't look like a ${PLATFORMS.find((p) => p.value === ctx.document.platform)?.title} link. Check the platform or the link.`;
        }).warning(),
      ],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Picture for the card',
      description:
        'Optional for YouTube: its thumbnail is used automatically. For other platforms, upload the post image or a screenshot. Instagram, TikTok, LinkedIn and X do not let websites fetch it automatically.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Picture description',
          description: 'A few words describing the picture, for people using screen readers.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Short text on the card',
      description:
        'Optional. A line or two about the post. Fill in English, Arabic or both; a card with no text in a language still appears on that page, just without text.',
      type: 'localeText',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Posted on',
      description: 'The date the post went up. Newest posts are shown first.',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showOn',
      title: 'Show on',
      type: 'string',
      options: {
        list: [
          { title: 'Both English and Arabic pages', value: 'both' },
          { title: 'English page only', value: 'en' },
          { title: 'Arabic page only', value: 'ar' },
        ],
        layout: 'radio',
      },
      initialValue: 'both',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    { title: 'Posted on, newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      platform: 'platform',
      captionEn: 'caption.en',
      captionAr: 'caption.ar',
      url: 'url',
      date: 'publishedAt',
      media: 'thumbnail',
    },
    prepare: ({ platform, captionEn, captionAr, url, date, media }) => ({
      title: captionEn || captionAr || url || 'New post',
      subtitle: [
        PLATFORMS.find((p) => p.value === platform)?.title,
        date ? new Date(date).toLocaleDateString() : null,
      ]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
});
