import localeString from './localeString';
import localeText from './localeText';
import seo from './seo';
import seoLocale from './seoLocale';
import { structuredDataTypes } from './structuredData';

import globalSettings from './globalSettings';
import pageIndex from './pageIndex';
import pageServices from './pageServices';
import pageBenefits from './pageBenefits';
import pageAbout from './pageAbout';
import pageContact from './pageContact';
import pageBlog from './pageBlog';
import pageResources from './pageResources';
import pageSocial from './pageSocial';
import socialPost from './socialPost';

import siteSettings from './siteSettings';
import landingPage from './landingPage';
import whitePaper from './whitePaper';
import blogPost from './blogPost';
import author from './author';
import testimonial from './testimonial';
import videoTestimonial from './videoTestimonial';
import homeVideo from './homeVideo';

export const schemaTypes = [
  // Reusable building blocks — embedded in the documents below rather than
  // created on their own.
  localeString,
  localeText,
  seo,
  seoLocale,
  ...structuredDataTypes,

  // Page wording. One document per page; these already hold your content.
  globalSettings,
  pageIndex,
  pageServices,
  pageBenefits,
  pageAbout,
  pageContact,
  pageBlog,
  pageSocial,
  pageResources,

  // Collections and settings.
  siteSettings,
  landingPage,
  blogPost,
  socialPost,
  author,
  whitePaper,
  testimonial,
  videoTestimonial,
  homeVideo,
];
