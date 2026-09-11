/**
 * Builds the auto-generated Open Graph share images.
 *
 * When a blog post or white paper has no share image of its own, we make one
 * from its title so links still look designed when shared on WhatsApp,
 * LinkedIn or X — rather than falling back to a bare logo.
 *
 * The pipeline, all at build time:
 *   satori   turns a small layout description into an SVG
 *   resvg    rasterises that SVG into a PNG
 *
 * Fonts are read straight off disk from the @fontsource packages, so this
 * works offline and in CI with no network access.
 *
 * ── A known limitation ──────────────────────────────────────────────────
 * These images are generated for ENGLISH content only. Satori renders
 * Arabic letterforms correctly (the joining is right) but inserts uneven
 * gaps between words, which looks wrong at share-card size. Rather than
 * ship broken typography, Arabic posts fall back to the default share
 * image from Sanity site settings — and an editor can always set a proper
 * share image per post, which overrides everything.
 * If satori's RTL text layout improves, re-enable Arabic by removing the
 * language filter in src/pages/og/[...slug].png.ts.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import type { Lang } from './i18n';

/** Facebook/LinkedIn/X all key off this size. */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

function fontPath(pkg: string, file: string): string {
  return fileURLToPath(
    new URL(`../../node_modules/${pkg}/files/${file}`, import.meta.url),
  );
}

/** Read once and reuse for every image in the build. */
let fontCache: Array<{ name: string; data: Buffer; weight: 400 | 700 | 800; style: 'normal' }> | null =
  null;

function loadFonts() {
  if (fontCache) return fontCache;
  fontCache = [
    {
      name: 'Plus Jakarta Sans',
      data: readFileSync(
        fontPath('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-800-normal.woff'),
      ),
      weight: 800,
      style: 'normal',
    },
    {
      name: 'Plus Jakarta Sans',
      data: readFileSync(
        fontPath('@fontsource/plus-jakarta-sans', 'plus-jakarta-sans-latin-400-normal.woff'),
      ),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'Cairo',
      data: readFileSync(fontPath('@fontsource/cairo', 'cairo-arabic-700-normal.woff')),
      weight: 700,
      style: 'normal',
    },
    {
      name: 'Cairo',
      data: readFileSync(fontPath('@fontsource/cairo', 'cairo-arabic-400-normal.woff')),
      weight: 400,
      style: 'normal',
    },
  ];
  return fontCache;
}

/* Brand colours, matching the site. */
const SAND = '#F5EDD8';
const FOREST = '#335a32';
const RED = '#85131D';
const MUTED = '#4a6e4a';

type El = { type: string; props: Record<string, unknown> };
const el = (type: string, props: Record<string, unknown>): El => ({ type, props });


/**
 * The share-image layout: brand bar, small label, the title, and the site
 * name along the bottom. Deliberately plain — it has to stay readable as a
 * thumbnail in a chat window.
 */
function template(opts: {
  title: string;
  label: string;
  siteName: string;
  lang: Lang;
}): El {
  const rtl = opts.lang === 'ar';
  const font = rtl ? 'Cairo' : 'Plus Jakarta Sans';
  const titleWeight = rtl ? 700 : 800;

  /* Long titles get a smaller size so they don't overflow the card. */
  const len = opts.title.length;
  const titleSize = len > 90 ? 52 : len > 60 ? 62 : len > 35 ? 72 : 82;

  return el('div', {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: SAND,
      padding: '72px 80px',
      fontFamily: font,
      position: 'relative',
    },
    children: [
      /* Decorative circle, bottom-trailing corner. */
      el('div', {
        style: {
          position: 'absolute',
          bottom: -180,
          [rtl ? 'left' : 'right']: -140,
          width: 460,
          height: 460,
          borderRadius: 9999,
          backgroundColor: FOREST,
          opacity: 0.07,
          display: 'flex',
        },
      }),

      /* Top: the red rule and the section label. */
      el('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          flexDirection: rtl ? 'row-reverse' : 'row',
        },
        children: [
          el('div', {
            style: { width: 64, height: 8, borderRadius: 4, backgroundColor: RED, display: 'flex' },
          }),
          el('div', {
            style: {
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: rtl ? 0 : 3,
              textTransform: 'uppercase',
              color: RED,
              // `block`, not `flex`: with flex, satori lays each WORD out as a
              // flex item, which spreads Arabic text out with ragged gaps.
              display: 'block',
              textAlign: rtl ? 'right' : 'left',
            },
            children: opts.label,
          }),
        ],
      }),

      /* Middle: the title. */
      el('div', {
        style: {
          fontSize: titleSize,
          fontWeight: titleWeight,
          lineHeight: 1.15,
          letterSpacing: rtl ? 0 : -2,
          color: FOREST,
          // `block`, not `flex`: under flex, each word becomes a flex item.
          display: 'block',
          textAlign: rtl ? 'right' : 'left',
          maxWidth: 1000,
        },
        children: opts.title,
      }),

      /* Bottom: the site name. */
      el('div', {
        style: {
          fontSize: 30,
          fontWeight: 700,
          color: MUTED,
          display: 'block',
          textAlign: rtl ? 'right' : 'left',
        },
        children: opts.siteName,
      }),
    ],
  });
}

/** Render one share image and return the PNG bytes. */
export async function renderOgImage(opts: {
  title: string;
  label: string;
  siteName: string;
  lang: Lang;
}): Promise<Buffer> {
  const svg = await satori(template(opts) as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: loadFonts(),
  });

  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_WIDTH },
  })
    .render()
    .asPng();

  return Buffer.from(png);
}
