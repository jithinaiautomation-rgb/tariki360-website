import { defineField, defineType } from 'sanity';
import { list, paragraph, requiredText, seoFields, text } from './pageFields';

/**
 * Social Media Page.
 *
 * Everything for the page lives in this one document: the wording, and a list
 * of social media links. Each link is a Title and a URL, and becomes one card
 * on the page. The platform (YouTube, Instagram …) is worked out from the URL,
 * so there is nothing else to fill in.
 *
 * Laid out like the other page editors: one tab per section, top to bottom.
 * An empty box keeps the site's built-in wording for that language.
 */
export default defineType({
  name: 'pageSocial',
  title: 'Social Media Page',
  type: 'document',

  groups: [
    { name: 'hero', title: '1. Top banner', default: true },
    { name: 'links', title: '2. Social media links' },
    { name: 'follow', title: '3. Follow us strip' },
    { name: 'menu', title: 'Menu' },
    { name: 'seo', title: 'SEO & schema' },
  ],

  fieldsets: [
    { name: 'linksHeading', title: 'Heading above the cards' },
    { name: 'cardText', title: 'Words on the cards' },
  ],

  fields: [
    /* ------------------------------------------------------ 1. Top banner */
    text('heroTag', 'Small label above the heading', 'e.g. "Social Media"', 'hero'),
    text(
      'heroTitle',
      "Heading (H1 — the page's main heading for Google)",
      'The big heading at the top, and the only H1 on the page.',
      'hero',
    ),
    paragraph('heroSubtitle', 'Text under the heading', undefined, 'hero'),

    /* ------------------------------------------- 2. Social media links */
    list({
      name: 'links',
      title: 'Social media links',
      description:
        'Each row becomes one card on the page, in this order; drag rows to reorder. The platform is detected from the URL. YouTube links also show the video thumbnail. A card shows on the English or Arabic page when its title is filled in for that language.',
      group: 'links',
      itemName: 'socialLink',
      itemTitle: 'Link',
      titleKey: 'title',
      plainKey: 'url',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          description: 'The text shown on the card.',
          type: 'localeString',
          validation: requiredText,
        }),
        defineField({
          name: 'url',
          title: 'Social media URL',
          description:
            'Open the post, video or profile in your browser and copy the address, e.g. https://www.youtube.com/watch?v=…',
          type: 'url',
          validation: (Rule) => Rule.required().uri({ scheme: ['https', 'http'] }),
        }),
      ],
    }),

    text('latestTitle', 'Heading', 'e.g. "Latest posts"', 'links', 'linksHeading'),
    text('latestSubtitle', 'Text under the heading', undefined, 'links', 'linksHeading'),

    text('allPlatforms', 'Filter: "show all" button', 'e.g. "All platforms". The filter appears when the cards come from more than one platform.', 'links', 'cardText'),
    text(
      'viewOn',
      'Link text on each card',
      'Type {platform} where the platform name should go, e.g. "View on {platform}" becomes "View on YouTube".',
      'links',
      'cardText',
    ),
    text(
      'openLink',
      'Link text for other websites',
      'Used when the URL is not a known social media site, e.g. "Open link".',
      'links',
      'cardText',
    ),
    text('otherWebsite', 'Label for other websites', 'The small label on those cards, e.g. "Website".', 'links', 'cardText'),
    text('emptyState', 'Message when there are no links', undefined, 'links', 'cardText'),

    /* ------------------------------------------------ 3. Follow us strip */
    text(
      'followTitle',
      'Heading',
      'e.g. "Follow Tariki 360". The buttons come from Social links in Site Settings; the strip is hidden when there are none.',
      'follow',
    ),
    text('followSubtitle', 'Text under the heading', undefined, 'follow'),

    /* --------------------------------------------------------------- Menu */
    text('navLabel', 'Name in the top menu', 'e.g. "Media". Leave empty to keep the built-in name.', 'menu'),

    /* ------------------------------------------------------ SEO & schema */
    ...seoFields(),
  ],

  preview: {
    prepare: () => ({ title: 'Social Media Page' }),
  },
});
