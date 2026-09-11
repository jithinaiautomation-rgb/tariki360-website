import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

/**
 * Sanity Studio configuration.
 *
 * The Studio is the admin interface where content is written. Run it with
 * `npm run dev` inside this folder; deploy a hosted version for non-technical
 * editors with `npm run deploy`.
 *
 * The `structure` below controls the sidebar. Site Settings and the Home
 * Video section are "singletons" — one document each, opened directly rather
 * than shown as a list you can add to.
 */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

/**
 * Fail with a readable message rather than a blank screen.
 *
 * Without a project id the Studio used to load and then render nothing, with
 * the real reason buried in the browser console. This turns that into an
 * obvious error telling you exactly what to do.
 */
if (!projectId) {
  throw new Error(
    [
      '',
      'Sanity Studio has no project id.',
      '',
      'Create a file named `.env` in this studio/ folder containing:',
      '',
      '  SANITY_STUDIO_PROJECT_ID=your-project-id',
      '  SANITY_STUDIO_DATASET=production',
      '',
      'Find your project id at https://www.sanity.io/manage — open the',
      'project and it is the short code on the dashboard and in the URL.',
      '',
      'Note this is a different variable from the website one folder up,',
      'which uses PUBLIC_SANITY_PROJECT_ID. Both need the same value.',
      '',
    ].join('\n'),
  );
}

export default defineConfig({
  name: 'tariki360',
  title: 'Tariki 360',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ---- Page wording -------------------------------------------
            // One document per page. These are singletons: there is only
            // ever one of each, so they open straight into the editor
            // instead of showing a list you can add to.
            S.listItem()
              .title('Home Page')
              .id('pageIndex')
              .child(S.document().schemaType('pageIndex').documentId('pageIndex')),
            S.listItem()
              .title('Services Page')
              .id('pageServices')
              .child(S.document().schemaType('pageServices').documentId('pageServices')),
            S.listItem()
              .title('Benefits Page')
              .id('pageBenefits')
              .child(S.document().schemaType('pageBenefits').documentId('pageBenefits')),
            S.listItem()
              .title('About Page')
              .id('pageAbout')
              .child(S.document().schemaType('pageAbout').documentId('pageAbout')),
            S.listItem()
              .title('Contact Page')
              .id('pageContact')
              .child(S.document().schemaType('pageContact').documentId('pageContact')),
            S.listItem()
              .title('Blog Page')
              .id('pageBlog')
              .child(S.document().schemaType('pageBlog').documentId('pageBlog')),
            S.listItem()
              .title('Resources Page')
              .id('pageResources')
              .child(S.document().schemaType('pageResources').documentId('pageResources')),
            S.divider(),

            // ---- Shared across every page --------------------------------
            S.listItem()
              .title('Navigation, Footer & Sign-up')
              .id('globalSettings')
              .child(S.document().schemaType('globalSettings').documentId('globalSettings')),
            S.listItem()
              .title('Site Settings (SEO defaults)')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),

            // ---- Collections ---------------------------------------------
            S.documentTypeListItem('landingPage').title('Landing Pages'),
            S.divider(),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('author').title('Authors'),
            S.divider(),
            S.documentTypeListItem('whitePaper').title('White Papers'),
            S.divider(),
            S.listItem()
              .title('Home Video Section')
              .id('homeVideo')
              .child(S.document().schemaType('homeVideo').documentId('homeVideo')),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('videoTestimonial').title('Video Testimonials'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,

    // Stops "Site Settings" and "Home Video" appearing in the global
    // "create new document" menu — there should only ever be one of each.
    templates: (prev) =>
      prev.filter(
        (t) =>
          !['siteSettings', 'homeVideo', 'globalSettings', 'pageIndex', 'pageServices', 'pageBenefits', 'pageAbout', 'pageContact', 'pageBlog', 'pageResources'].includes(
            t.schemaType,
          ),
      ),
  },

  document: {
    // Hide the duplicate / delete actions on the singleton documents.
    actions: (prev, { schemaType }) =>
      ['siteSettings', 'homeVideo', 'globalSettings', 'pageIndex', 'pageServices', 'pageBenefits', 'pageAbout', 'pageContact', 'pageBlog', 'pageResources'].includes(
        schemaType,
      )
        ? prev.filter(
            ({ action }) => !['duplicate', 'delete', 'unpublish'].includes(action),
          )
        : prev,
  },
});
