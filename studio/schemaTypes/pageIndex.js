import { defineField, defineType } from 'sanity';
import { structuredDataField } from './structuredData';

/**
 * Home Page
 *
 * One document holding the wording for this page. The website reads it at
 * build time and lays it over its built-in copy, so any field you leave
 * blank simply keeps the default text — nothing breaks if a field is empty.
 *
 * Fields marked "(advanced)" hold a JSON list as raw text. Edit the words
 * inside the quotes and leave the brackets and commas alone; if the JSON
 * ends up invalid the site ignores that one field and uses its built-in copy.
 *
 * This schema was generated from the documents already in the dataset, so it
 * matches the existing content exactly.
 */
export default defineType({
  name: 'pageIndex',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & sharing',
      description:
        'Optional. Overrides how this page appears in Google and when shared. Leave blank to use the page headline and intro.',
      type: 'seoLocale',
    }),
    structuredDataField(),
    defineField({
      name: 'aiCounsellorSub',
      title: 'Ai Counsellor Sub',
      type: 'localeString',
    }),
    defineField({
      name: 'aiCounsellorTitle',
      title: 'Ai Counsellor Title',
      type: 'localeString',
    }),
    defineField({
      name: 'appUrlLabel',
      title: 'App Url Label',
      type: 'localeString',
    }),
    defineField({
      name: 'bookSchoolDemo',
      title: 'Book School Demo',
      type: 'localeString',
    }),
    defineField({
      name: 'careerDnaProfile',
      title: 'Career Dna Profile',
      type: 'localeString',
    }),
    defineField({
      name: 'careerDnaTags',
      title: 'Career Dna Tags',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'careerInterestDist',
      title: 'Career Interest Dist',
      type: 'localeString',
    }),
    defineField({
      name: 'careerInterestList_json',
      title: 'Career Interest List (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'cohortOverview',
      title: 'Cohort Overview',
      type: 'localeString',
    }),
    defineField({
      name: 'cohortStats_json',
      title: 'Cohort Stats (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'counselorSuiteItems',
      title: 'Counselor Suite Items',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'counselorSuiteTag',
      title: 'Counselor Suite Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'counselorSuiteTitle',
      title: 'Counselor Suite Title',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaBody',
      title: 'Cta Body',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaSchoolDemo',
      title: 'Cta School Demo',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaStart',
      title: 'Cta Start',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Cta Title',
      type: 'localeString',
    }),
    defineField({
      name: 'discoverDna',
      title: 'Discover Dna',
      type: 'localeString',
    }),
    defineField({
      name: 'faqTag',
      title: 'Faq Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'faqTitle',
      title: 'Faq Title',
      type: 'localeString',
    }),
    defineField({
      name: 'faqs_json',
      title: 'Faqs (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'feats_json',
      title: 'Feats (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'featuresSub',
      title: 'Features Sub',
      type: 'localeString',
    }),
    defineField({
      name: 'featuresTag',
      title: 'Features Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'featuresTitle',
      title: 'Features Title',
      type: 'localeString',
    }),
    defineField({
      name: 'forParentsBody',
      title: 'For Parents Body',
      type: 'localeString',
    }),
    defineField({
      name: 'forParentsList',
      title: 'For Parents List',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'forParentsTitle',
      title: 'For Parents Title',
      type: 'localeString',
    }),
    defineField({
      name: 'forSchoolsBody',
      title: 'For Schools Body',
      type: 'localeText',
    }),
    defineField({
      name: 'forSchoolsTitle',
      title: 'For Schools Title',
      type: 'localeString',
    }),
    defineField({
      name: 'forStudentsLbl',
      title: 'For Students Lbl',
      type: 'localeString',
    }),
    defineField({
      name: 'hchipA',
      title: 'Hchip A',
      type: 'localeString',
    }),
    defineField({
      name: 'hchipASub',
      title: 'Hchip ASub',
      type: 'localeString',
    }),
    defineField({
      name: 'hchipB',
      title: 'Hchip B',
      type: 'localeString',
    }),
    defineField({
      name: 'hchipBSub',
      title: 'Hchip BSub',
      type: 'localeString',
    }),
    defineField({
      name: 'heroFeats_json',
      title: 'Hero Feats (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'heroSub',
      title: 'Hero Sub',
      type: 'localeText',
    }),
    defineField({
      name: 'heroTag',
      title: 'Hero Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'heroTitleA',
      title: 'Hero Title A',
      type: 'localeString',
    }),
    defineField({
      name: 'heroTitleHl',
      title: 'Hero Title Hl',
      type: 'localeString',
    }),
    defineField({
      name: 'heroTitleLead',
      title: 'Hero Title Lead',
      type: 'localeString',
    }),
    defineField({
      name: 'insight1Pct',
      title: 'Insight1 Pct',
      type: 'localeString',
    }),
    defineField({
      name: 'insight1Text',
      title: 'Insight1 Text',
      type: 'localeString',
    }),
    defineField({
      name: 'insight2Hl',
      title: 'Insight2 Hl',
      type: 'localeString',
    }),
    defineField({
      name: 'insight2Lead',
      title: 'Insight2 Lead',
      type: 'localeString',
    }),
    defineField({
      name: 'insight2Trail',
      title: 'Insight2 Trail',
      type: 'localeString',
    }),
    defineField({
      name: 'instantAccess',
      title: 'Instant Access',
      type: 'localeString',
    }),
    defineField({
      name: 'journeyTag',
      title: 'Journey Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'journeyTitle',
      title: 'Journey Title',
      type: 'localeString',
    }),
    defineField({
      name: 'journey_json',
      title: 'Journey (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'liveTag',
      title: 'Live Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'problemBody',
      title: 'Problem Body',
      type: 'localeText',
    }),
    defineField({
      name: 'problemTag',
      title: 'Problem Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'problemTitle',
      title: 'Problem Title',
      type: 'localeString',
    }),
    defineField({
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [{ type: 'localeString' }],
    }),
    defineField({
      name: 'reportBody',
      title: 'Report Body',
      type: 'localeString',
    }),
    defineField({
      name: 'reportItems_json',
      title: 'Report Items (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'reportTag',
      title: 'Report Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'reportTitle',
      title: 'Report Title',
      type: 'localeString',
    }),
    defineField({
      name: 'requestPartnerDemo',
      title: 'Request Partner Demo',
      type: 'localeString',
    }),
    defineField({
      name: 'schoolFeatures_json',
      title: 'School Features (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'seeSample',
      title: 'See Sample',
      type: 'localeString',
    }),
    defineField({
      name: 'startMapping',
      title: 'Start Mapping',
      type: 'localeString',
    }),
    defineField({
      name: 'stats_json',
      title: 'Stats (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'strengthBreakdown',
      title: 'Strength Breakdown',
      type: 'localeString',
    }),
    defineField({
      name: 'strengthList_json',
      title: 'Strength List (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'studentAnalytics',
      title: 'Student Analytics',
      type: 'localeString',
    }),
    defineField({
      name: 'studentAnalyticsSub',
      title: 'Student Analytics Sub',
      type: 'localeString',
    }),
    defineField({
      name: 'successSub',
      title: 'Success Sub',
      type: 'localeString',
    }),
    defineField({
      name: 'successTag',
      title: 'Success Tag',
      type: 'localeString',
    }),
    defineField({
      name: 'successTitle',
      title: 'Success Title',
      type: 'localeString',
    }),
    defineField({
      name: 'topCareerList_json',
      title: 'Top Career List (advanced)',
      type: 'text',
      rows: 6,
      description:
        'Advanced: a JSON list, stored as text, in the form {"en":[...],"ar":[...]}. Keep the structure exactly as it is and change only the wording inside the quotes. A mistake here is ignored by the site, which falls back to its built-in copy.',
    }),
    defineField({
      name: 'topCareerMatches',
      title: 'Top Career Matches',
      type: 'localeString',
    }),
    defineField({
      name: 'trustedBy',
      title: 'Trusted By',
      type: 'localeString',
    }),
    defineField({
      name: 'videoTestimonialsTitle',
      title: 'Video Testimonials Title',
      type: 'localeString',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Home Page' }),
  },
});
