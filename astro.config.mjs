// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';

/**
 * Read the .env file.
 *
 * This has to be explicit. Astro loads .env into `import.meta.env` for files
 * under src/, but this config file runs before that and only ever sees the
 * real `process.env` — so without loadEnv, a local .env is silently ignored
 * and the Sanity project id falls back to the placeholder.
 *
 * `process.env` is merged in on top so that hosting platforms (Amplify sets
 * real environment variables, not a .env file) still win.
 */
const env = {
  ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_'),
  ...process.env,
};

/**
 * The public URL the finished site lives at. Canonical URLs, the sitemap and
 * the Open Graph tags all need absolute URLs, so they are all built from this.
 */
const SITE = env.PUBLIC_SITE_URL || 'https://www.tariki360.ae';

/**
 * The Sanity project. Falls back to a harmless placeholder so the site still
 * builds before .env is filled in — pages then render their built-in fallback
 * content instead of failing the build.
 */
const SANITY_PROJECT_ID = env.PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const SANITY_DATASET = env.PUBLIC_SANITY_DATASET || 'production';

if (SANITY_PROJECT_ID === 'placeholder') {
  console.warn(
    '\n[sanity] No PUBLIC_SANITY_PROJECT_ID found — building with placeholder content.\n' +
      '         Copy .env.example to .env and add your project id.\n',
  );
}

export default defineConfig({
  site: SITE,

  // Fully prerendered. Every page is written to disk as HTML at build time;
  // there is no server running at runtime.
  output: 'static',

  // Clean URLs: /blog/my-post/ — a directory with an index.html inside it,
  // never /blog/my-post.html. This matches how AWS Amplify serves static files.
  build: { format: 'directory' },
  trailingSlash: 'always',

  integrations: [
    react(),

    // Configures the Sanity client once, here, so every page can just
    // `import { sanityClient } from 'sanity:client'`.
    // No studioBasePath is set, which keeps the build fully static.
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: '2024-01-01',
      useCdn: true,
    }),

    sitemap({
      // The generated OG images are endpoints, not pages — keep them out.
      filter: (page) => !page.includes('/og/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    // Lets Astro's <Image> component work with images served by Sanity's CDN.
    domains: ['cdn.sanity.io'],
  },
});
