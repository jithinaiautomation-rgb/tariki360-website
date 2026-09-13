import { defineField, defineType } from 'sanity';
import { structuredDataField } from './structuredData';
import { iconField, list, oldFormat, paragraph, percentField, requiredText, text, textList } from './pageFields';

/**
 * Home Page
 *
 * The editor is laid out to match the page itself: one tab per section, in the
 * order the sections appear from top to bottom, with small groups inside a tab
 * where a section has several parts (the students / parents / schools cards,
 * for instance).
 *
 * Every text field has an English and an Arabic box. Leave a box empty and the
 * site keeps its built-in wording for that language.
 *
 * Lists (stats, features, journey steps, FAQs …) are one row per item. A row
 * only appears on a language's page when all of its text is filled in for that
 * language, so half-translated rows never show English on the Arabic page.
 *
 * Each list replaced an older single text box holding raw JSON. Those old
 * boxes are still defined so existing documents don't show warnings, but they
 * are read-only, hidden once empty, and ignored as soon as the list has rows.
 * studio/scripts/migrate-page-lists.js moves their contents into the lists.
 */

/* --------------------------------------------------------------- document */

export default defineType({
  name: 'pageIndex',
  title: 'Home Page',
  type: 'document',

  groups: [
    { name: 'hero', title: '1. Top banner', default: true },
    { name: 'numbers', title: '2. Numbers & quotes' },
    { name: 'problem', title: '3. The problem' },
    { name: 'audiences', title: '4. Students, parents & schools' },
    { name: 'video', title: '5. Video section' },
    { name: 'journey', title: '6. How it works' },
    { name: 'report', title: '7. The report' },
    { name: 'counselor', title: '8. School counselor suite' },
    { name: 'stories', title: '9. Success stories' },
    { name: 'faq', title: '10. FAQs' },
    { name: 'cta', title: '11. Bottom call to action' },
    { name: 'seo', title: 'SEO & schema' },
  ],

  fieldsets: [
    {
      name: 'headline',
      title: 'Headline',
      description:
        'The big heading is built from three parts: line 1, then line 2 made of a plain start followed by a part highlighted in red.',
    },
    { name: 'heroButtons', title: 'Buttons' },
    { name: 'badges', title: 'Floating badges on the picture' },
    { name: 'insight1', title: 'Highlight box 1 (red)', description: 'Reads as: [number] [text].' },
    {
      name: 'insight2',
      title: 'Highlight box 2 (green)',
      description: 'Reads as: [start] [highlighted word] [end].',
    },
    { name: 'audiencesHeading', title: 'Section heading' },
    { name: 'students', title: 'Students card (left)' },
    { name: 'parents', title: 'Parents card (right)' },
    { name: 'schools', title: 'Schools card (full width, below)' },
    { name: 'reportLeft', title: 'Left side' },
    { name: 'reportCard', title: 'Sample report card (right side)' },
    { name: 'counselorLeft', title: 'Left side' },
    { name: 'dashboard', title: 'Dashboard preview (right side)' },
  ],

  fields: [
    /* ------------------------------------------------------ 1. Top banner */
    text('heroTag', 'Small label above the headline', 'The pill-shaped label at the very top, e.g. "AI-driven career guidance".', 'hero'),
    text('heroTitleA', 'Line 1', 'e.g. "Is your child choosing a future,"', 'hero', 'headline'),
    text(
      'heroTitleLead',
      'Line 2 — plain start',
      'The words before the red part, e.g. "or just". Leave Arabic empty if the Arabic headline reads better without it.',
      'hero',
      'headline',
    ),
    text('heroTitleHl', 'Line 2 — highlighted part (red)', 'e.g. "following the crowd?"', 'hero', 'headline'),
    paragraph('heroSub', 'Text under the headline', 'The paragraph below the headline.', 'hero'),
    text(
      'startMapping',
      'Main button (red)',
      'Opens the sign-up form. The same text is reused on the button in the Parents card further down.',
      'hero',
      'heroButtons',
    ),
    text('seeSample', 'Second button (outline)', 'Links to the Services page.', 'hero', 'heroButtons'),
    list({
      name: 'heroFeats',
      title: 'Small features under the buttons',
      description: 'The short icon + text points below the buttons, e.g. "Arabic & English".',
      group: 'hero',
      itemName: 'heroFeature',
      itemTitle: 'Feature',
      titleKey: 'label',
      plainKey: 'icon',
      fields: [iconField, defineField({ name: 'label', title: 'Text', type: 'localeString', validation: requiredText })],
    }),
    oldFormat('heroFeats_json', 'hero'),
    text('hchipA', 'Top badge — big text', 'e.g. "94%"', 'hero', 'badges'),
    text('hchipASub', 'Top badge — small text', 'e.g. "Success clarity"', 'hero', 'badges'),
    text('hchipB', 'Bottom badge — big text', 'e.g. "Video report"', 'hero', 'badges'),
    text('hchipBSub', 'Bottom badge — small text', 'e.g. "Personalised"', 'hero', 'badges'),

    /* ------------------------------------------------ 2. Numbers & quotes */
    list({
      name: 'stats',
      title: 'Numbers bar',
      description: 'The row of big numbers under the top banner.',
      group: 'numbers',
      itemName: 'statItem',
      itemTitle: 'Number',
      titleKey: 'value',
      fields: [
        defineField({
          name: 'value',
          title: 'Number',
          description: 'e.g. "94%" or "5,000+". Has an Arabic box because Arabic sometimes writes it differently.',
          type: 'localeString',
          validation: requiredText,
        }),
        defineField({ name: 'label', title: 'Label under the number', type: 'localeString', validation: requiredText }),
      ],
    }),
    oldFormat('stats_json', 'numbers'),
    textList('quotes', 'Scrolling quotes strip', 'The quotes that scroll across the green strip. One row per quote.', 'numbers'),

    /* ------------------------------------------------------ 3. The problem */
    text('problemTag', 'Small label', 'e.g. "The problem"', 'problem'),
    text('problemTitle', 'Heading', undefined, 'problem'),
    paragraph('problemBody', 'Paragraph', undefined, 'problem'),
    text('insight1Pct', 'Number (red)', 'e.g. "65%"', 'problem', 'insight1'),
    text('insight1Text', 'Text after the number', 'e.g. "of students feel overwhelmed by subject selection."', 'problem', 'insight1'),
    text('insight2Lead', 'Start', 'e.g. "Typical career advice is often"', 'problem', 'insight2'),
    text('insight2Hl', 'Highlighted word (green)', 'e.g. "outdated"', 'problem', 'insight2'),
    text('insight2Trail', 'End', 'e.g. "by the time they graduate."', 'problem', 'insight2'),

    /* ------------------------------------- 4. Students, parents & schools */
    text('featuresTag', 'Small label', undefined, 'audiences', 'audiencesHeading'),
    text('featuresTitle', 'Heading', undefined, 'audiences', 'audiencesHeading'),
    text('featuresSub', 'Text under the heading', undefined, 'audiences', 'audiencesHeading'),

    text('forStudentsLbl', 'Small label', 'e.g. "For students"', 'audiences', 'students'),
    text('discoverDna', 'Card heading', 'e.g. "Discover your career road map"', 'audiences', 'students'),
    list({
      name: 'feats',
      title: 'Features in the card',
      description: 'The icon + title + description items inside the Students card.',
      group: 'audiences',
      fieldset: 'students',
      itemName: 'featureItem',
      itemTitle: 'Feature',
      titleKey: 'title',
      plainKey: 'icon',
      fields: [
        iconField,
        defineField({ name: 'title', title: 'Title', type: 'localeString', validation: requiredText }),
        defineField({ name: 'description', title: 'Description', type: 'localeText', validation: requiredText }),
      ],
    }),
    oldFormat('feats_json', 'audiences', 'students'),

    text('forParentsTitle', 'Card heading', 'e.g. "For parents"', 'audiences', 'parents'),
    text('forParentsBody', 'Text', undefined, 'audiences', 'parents'),
    textList('forParentsList', 'Tick list', 'The points with a tick next to them. One row per point.', 'audiences', 'parents'),
    text('trustedBy', 'Small label at the bottom', 'e.g. "Trusted by 5,000+ parents". The button text comes from "Main button" in tab 1.', 'audiences', 'parents'),

    text('forSchoolsTitle', 'Card heading', 'e.g. "For schools"', 'audiences', 'schools'),
    paragraph('forSchoolsBody', 'Text', undefined, 'audiences', 'schools'),
    text('bookSchoolDemo', 'Button', 'Links to the Contact page.', 'audiences', 'schools'),
    list({
      name: 'schoolFeatures',
      title: 'Features on the right',
      description: 'The three rows with an icon, title and short description.',
      group: 'audiences',
      fieldset: 'schools',
      itemName: 'featureItem',
      itemTitle: 'Feature',
      titleKey: 'title',
      plainKey: 'icon',
      fields: [
        iconField,
        defineField({ name: 'title', title: 'Title', type: 'localeString', validation: requiredText }),
        defineField({ name: 'description', title: 'Description', type: 'localeText', validation: requiredText }),
      ],
    }),
    oldFormat('schoolFeatures_json', 'audiences', 'schools'),

    /* ---------------------------------------------------- 5. Video section */
    text(
      'appUrlLabel',
      'Address bar text',
      'The web address shown in the pretend browser bar above the video. The video itself, its heading and caption are edited in "Home Video Section" in the sidebar.',
      'video',
    ),
    text('aiCounsellorTitle', 'Strip under the video — title', 'e.g. "AI Career Counsellor"', 'video'),
    text('aiCounsellorSub', 'Strip under the video — small text', 'e.g. "Available 24/7 · Arabic & English"', 'video'),
    text('instantAccess', 'Strip under the video — label', 'e.g. "Instant access"', 'video'),

    /* ---------------------------------------------------- 6. How it works */
    text('journeyTag', 'Small label', 'e.g. "How it works"', 'journey'),
    text('journeyTitle', 'Heading', undefined, 'journey'),
    list({
      name: 'journey',
      title: 'Steps',
      description: 'Shown in this order and numbered automatically (1, 2, 3 …). Drag to reorder.',
      group: 'journey',
      itemName: 'journeyStep',
      itemTitle: 'Step',
      titleKey: 'title',
      plainKey: 'icon',
      fields: [
        iconField,
        defineField({ name: 'title', title: 'Step title', type: 'localeString', validation: requiredText }),
        defineField({ name: 'description', title: 'Description', type: 'localeText', validation: requiredText }),
      ],
    }),
    oldFormat('journey_json', 'journey'),

    /* ------------------------------------------------------ 7. The report */
    text('reportTag', 'Small label', 'e.g. "The report"', 'report', 'reportLeft'),
    text('reportTitle', 'Heading', undefined, 'report', 'reportLeft'),
    text('reportBody', 'Text', undefined, 'report', 'reportLeft'),
    list({
      name: 'reportItems',
      title: 'List of report parts',
      description: 'The icon + text rows on the left.',
      group: 'report',
      fieldset: 'reportLeft',
      itemName: 'reportItem',
      itemTitle: 'Row',
      titleKey: 'label',
      plainKey: 'icon',
      fields: [iconField, defineField({ name: 'label', title: 'Text', type: 'localeString', validation: requiredText })],
    }),
    oldFormat('reportItems_json', 'report', 'reportLeft'),

    text('careerDnaProfile', 'Box 1 — label', 'e.g. "Career DNA profile"', 'report', 'reportCard'),
    textList('careerDnaTags', 'Box 1 — tags', 'The small tags in the first box. One row per tag.', 'report', 'reportCard'),
    text('topCareerMatches', 'Box 2 — label', 'e.g. "Top career matches"', 'report', 'reportCard'),
    list({
      name: 'topCareerList',
      title: 'Box 2 — careers with bars',
      group: 'report',
      fieldset: 'reportCard',
      itemName: 'percentItem',
      itemTitle: 'Career',
      titleKey: 'name',
      plainKey: 'percent',
      fields: [defineField({ name: 'name', title: 'Career', type: 'localeString', validation: requiredText }), percentField],
    }),
    oldFormat('topCareerList_json', 'report', 'reportCard'),
    text('strengthBreakdown', 'Box 3 — label', 'e.g. "Strength breakdown"', 'report', 'reportCard'),
    list({
      name: 'strengthList',
      title: 'Box 3 — strengths',
      group: 'report',
      fieldset: 'reportCard',
      itemName: 'percentItem',
      itemTitle: 'Strength',
      titleKey: 'name',
      plainKey: 'percent',
      fields: [defineField({ name: 'name', title: 'Strength', type: 'localeString', validation: requiredText }), percentField],
    }),
    oldFormat('strengthList_json', 'report', 'reportCard'),

    /* ------------------------------------------ 8. School counselor suite */
    text('counselorSuiteTag', 'Small label', 'e.g. "For schools"', 'counselor', 'counselorLeft'),
    text('counselorSuiteTitle', 'Heading', undefined, 'counselor', 'counselorLeft'),
    text('studentAnalytics', 'Highlighted box — title', 'e.g. "Student analytics"', 'counselor', 'counselorLeft'),
    text('studentAnalyticsSub', 'Highlighted box — text', undefined, 'counselor', 'counselorLeft'),
    textList('counselorSuiteItems', 'Grey boxes below', 'One row per box.', 'counselor', 'counselorLeft'),
    text('requestPartnerDemo', 'Link at the bottom', 'Links to the Contact page.', 'counselor', 'counselorLeft'),

    text('cohortOverview', 'Heading', 'e.g. "Cohort overview"', 'counselor', 'dashboard'),
    text('liveTag', 'Badge next to the heading', 'e.g. "Live"', 'counselor', 'dashboard'),
    list({
      name: 'cohortStats',
      title: 'Number boxes',
      group: 'counselor',
      fieldset: 'dashboard',
      itemName: 'statItem',
      itemTitle: 'Number',
      titleKey: 'value',
      fields: [
        defineField({ name: 'value', title: 'Number', type: 'localeString', validation: requiredText }),
        defineField({ name: 'label', title: 'Label under the number', type: 'localeString', validation: requiredText }),
      ],
    }),
    oldFormat('cohortStats_json', 'counselor', 'dashboard'),
    text('careerInterestDist', 'Bars — label', 'e.g. "Career interest distribution"', 'counselor', 'dashboard'),
    list({
      name: 'careerInterestList',
      title: 'Bars',
      group: 'counselor',
      fieldset: 'dashboard',
      itemName: 'percentItem',
      itemTitle: 'Bar',
      titleKey: 'name',
      plainKey: 'percent',
      fields: [defineField({ name: 'name', title: 'Name', type: 'localeString', validation: requiredText }), percentField],
    }),
    oldFormat('careerInterestList_json', 'counselor', 'dashboard'),

    /* ------------------------------------------------- 9. Success stories */
    text('successTag', 'Small label', 'e.g. "Success stories"', 'stories'),
    text(
      'successTitle',
      'Heading',
      'The written testimonials themselves are edited in "Testimonials" in the sidebar.',
      'stories',
    ),
    text('successSub', 'Text under the heading', undefined, 'stories'),
    text(
      'videoTestimonialsTitle',
      'Heading above the video testimonials',
      'The videos themselves are edited in "Video Testimonials" in the sidebar.',
      'stories',
    ),

    /* ------------------------------------------------------------ 10. FAQs */
    text('faqTag', 'Small label', 'e.g. "FAQ"', 'faq'),
    text('faqTitle', 'Heading', undefined, 'faq'),
    list({
      name: 'faqs',
      title: 'Questions',
      description:
        'One row per question; drag to reorder. A question shows on the English or Arabic page only when both its question and answer are filled in for that language.',
      group: 'faq',
      itemName: 'faqItem',
      itemTitle: 'FAQ',
      titleKey: 'question',
      fields: [
        defineField({ name: 'question', title: 'Question', type: 'localeString', validation: requiredText }),
        defineField({
          name: 'answer',
          title: 'Answer',
          type: 'localeText',
          validation: (Rule) =>
            Rule.custom((v, ctx) => {
              const q = ctx.parent?.question;
              for (const [lang, name] of [['en', 'English'], ['ar', 'Arabic']]) {
                if (q?.[lang]?.trim() && !v?.[lang]?.trim()) {
                  return `The ${name} question has no ${name} answer, so it will not appear on that page.`;
                }
              }
              return true;
            }).warning(),
        }),
      ],
    }),
    oldFormat('faqs_json', 'faq'),

    /* ------------------------------------------- 11. Bottom call to action */
    text('ctaTitle', 'Heading', undefined, 'cta'),
    text('ctaBody', 'Text', undefined, 'cta'),
    text('ctaStart', 'Main button (red)', 'Opens the sign-up form.', 'cta'),
    text('ctaSchoolDemo', 'Second button (outline)', 'Links to the Contact page.', 'cta'),

    /* ------------------------------------------------------ SEO & schema */
    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      description:
        'Optional. Overrides how this page appears in Google and when shared. Leave blank to use the page headline and intro.',
      type: 'seoLocale',
      group: 'seo',
    }),
    { ...structuredDataField(), group: 'seo' },
  ],

  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
});
