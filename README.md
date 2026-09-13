# Tariki 360 — website

The Tariki 360 marketing site, built with [Astro](https://astro.build) and
[Sanity](https://sanity.io), deployed as a fully static site on AWS Amplify.

"Fully static" means every page is turned into a plain HTML file when the site
is built. There is no server running when someone visits. That makes the site
fast, cheap, and very hard to break — but it also means **content changes only
appear after a rebuild**. See [Publishing changes](#publishing-changes).

---

## Quick start

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
cp .env.example .env      # then open .env and fill in your Sanity project id
npm run dev
```

Open <http://localhost:4321>. Edits to files appear immediately.

| Command           | What it does                                           |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Local development server with live reload              |
| `npm run build`   | Builds the finished site into `dist/`                  |
| `npm run preview` | Serves `dist/` locally — what visitors will actually get |
| `npm run check`   | Type-checks everything; run before deploying           |

### Filling in `.env`

```
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
PUBLIC_SITE_URL=https://www.tariki360.ae
```

Find the project id at <https://www.sanity.io/manage> — open your project and
it's the short code shown on the dashboard and in the URL.

**Until you fill this in the site still runs**, showing built-in placeholder
articles and white papers instead of your real content. Nothing will look
broken; you just won't see your own words.

`PUBLIC_SITE_URL` matters more than it looks — every canonical URL, the
sitemap, robots.txt and all social share tags are built from it. Point it at
the real domain before going live.

---

## Editing content in Sanity

The Studio is the admin interface where content is written. It lives in
`studio/` in this same repository.

**It has its own dependencies and its own `.env`** — separate from the website
in the folder above. Both steps are required; skipping either gives you an
error page rather than the Studio.

```bash
cd studio
npm install                 # must be run inside studio/, not the root
cp .env.example .env        # then fill in SANITY_STUDIO_PROJECT_ID
npm run dev                 # opens the Studio at http://localhost:3333
```

Why two `.env` files: the website reads `PUBLIC_SANITY_PROJECT_ID` (Astro only
exposes variables prefixed `PUBLIC_`), while the Studio reads
`SANITY_STUDIO_PROJECT_ID` (Sanity only reads variables prefixed
`SANITY_STUDIO_`). Same project id in both.

### One-time: allow localhost to read your content

The first time you open the Studio it will say *"Before you continue… you need
to add the following URL as a CORS origin"*. That's normal and it is not an
error in this project — Sanity blocks unknown websites from reading your
content, and it doesn't know about your laptop yet.

Click **Continue** (it takes you to the right page), or do it by hand at
<https://www.sanity.io/manage> → your project → **API** → **CORS origins** →
**Add CORS origin**:

| Origin | Allow credentials |
| ------ | ----------------- |
| `http://localhost:3333` | yes — you need to log in |
| `http://localhost:4321` | no — the site only reads public data |
| your live domain | no |

Then reload the Studio.

### Studio troubleshooting

| What you see | What it means |
| ------------ | ------------- |
| `Failed to resolve import "@sanity/vision"` | `npm install` hasn't been run **inside `studio/`**. The Studio is falling back to the website's copy of Sanity, which doesn't include the Vision plugin. |
| A thrown error about a missing project id | No `.env` in `studio/`, or `SANITY_STUDIO_PROJECT_ID` is empty. |
| *"Before you continue…"* CORS screen | Add `http://localhost:3333` as a CORS origin, as above. |
| A blank white page | Usually a dev server that was started **before** `npm install` finished. Stop it (Ctrl+C) and run `npm run dev` again. |

Once you're happy, publish a hosted version your colleagues can use without
installing anything:

```bash
npm run deploy       # from inside studio/
```

### Editing page wording

Every page's text lives in its own Sanity document — **Home Page**, **Services
Page**, **About Page** and so on, at the top of the Studio sidebar. Change a
heading or a button label there, rebuild, and it appears on the site.

Each field has an **English** and an **العربية (Arabic)** box:

- Fill in either, or both.
- Leaving one blank is safe — that language keeps the wording the site already
  ships with. It does **not** fall back to the other language, so an
  untranslated field never shows English text on the Arabic page.

### The page editors

The Home, Services, Benefits, About and Contact pages are each laid out the
same way as the page itself. There's one tab per section, numbered in the order
they appear from top to bottom. The Home Page tabs:

| Tab | What's in it |
| --- | ------------ |
| 1. Top banner | Small label, the three-part headline, text, buttons, small features, floating badges |
| 2. Numbers & quotes | The numbers bar and the scrolling quotes strip |
| 3. The problem | Heading, paragraph and the two highlight boxes |
| 4. Students, parents & schools | Section heading, then the three cards |
| 5. Video section | Address bar text and the strip under the video |
| 6. How it works | The steps, numbered automatically |
| 7. The report | Left-hand list and the sample report card |
| 8. School counselor suite | Left-hand boxes and the dashboard preview |
| 9. Success stories | Headings for the testimonials section |
| 10. FAQs | The questions |
| 11. Bottom call to action | Heading, text and buttons |
| SEO & schema | Search and sharing overrides and structured data |

The other four pages follow the same pattern:

| Page | Tabs |
| ---- | ---- |
| Services | 1. Top banner · 2. Price cards · 3. For institutions · 4. Success stories · SEO & schema |
| Benefits | 1. Top banner · 2. Benefits intro & AI mentor · 3. Students & parents cards · 4. Before & after · 5. For institutions · SEO & schema |
| About | 1. Top banner · 2. What is Tariki 360 · 3. Partners · 4. Board of directors · SEO & schema |
| Contact | 1. Top banner · 2. Three cards · 3. Contact form · 4. Contact details & map · 5. Newsletter strip · SEO & schema |

A few page-specific notes:

- **Services:** the words shared by both price cards ("one-time" and the two
  button labels) are edited once, under *Used on both cards*. The tick lists
  add their tick icons automatically.
- **About:** the *Intro paragraph* is the paragraph under the heading. The two
  *names shown in bold* are bolded wherever they appear in it, so spell them
  exactly as they are written in the paragraph.
- **Contact:** each form field has its label and its grey example text grouped
  together. In *Contact details*, a phone number or email becomes a tap-to-call
  or email link; leave that box empty for rows like the office address.

Every field says what it is and where it appears. Some things are edited
elsewhere, and the field description points there: the video in **Home Video
Section**, and the testimonials in **Testimonials** and **Video Testimonials**.

**Lists are one row per item.** That covers the stats, features, journey
steps, report rows, progress bars and FAQs. Click **Add item** to add a row
and drag rows to reorder them. Each row shows **EN · AR** to say which
languages are complete. A row appears on the English or Arabic page only when
all of its text is filled in for that language, so a row translated into
English but not yet Arabic stays off the Arabic page. Icons and percentages
are shared by both languages.

**The headline** is built from three parts: *Line 1*, then *Line 2 — plain
start* followed by *Line 2 — highlighted part (red)*. The Arabic headline
normally leaves the plain start empty.

**One-time migration.** The lists used to be single JSON text boxes, and your
current rows are still in those old boxes. Until they're moved, the site keeps
showing them and the new lists start empty. The old boxes sit read-only under
each list, labelled *Old format*. To move everything into the lists on all
five pages at once, run this from `studio/`:

```bash
npx sanity login
npx sanity exec scripts/migrate-page-lists.js --with-user-token -- --dry-run
npx sanity exec scripts/migrate-page-lists.js --with-user-token
```

The first command logs you in. The `--dry-run` command prints what it would
change, and the last one moves the rows and removes the old boxes. It's safe
to run more than once, because a list that already has rows is skipped. You
can also type rows in by hand instead; once a list has rows, the site ignores
its old box.

### SEO on a page

Every page document has a collapsed **SEO & sharing** section at the top:

- **SEO title** — the browser tab and the blue headline in Google. ~60
  characters; the site name is appended automatically, so don't repeat it.
- **SEO description** — the grey summary under the link. 120–160 characters.
- **Share image** — the picture shown on WhatsApp, LinkedIn and X. 1200×630.

Title and description each have English and Arabic boxes, because one page
document produces both language versions of the page.

All of it is optional. Leave it blank and the site uses the page's own
headline and intro, then the defaults in **Site Settings**. Fill it in when
the Google result should read differently from the page itself.

Blog posts, white papers and landing pages have the same section, but with
single-language fields — those documents are written in one language each.

### Structured data (schema.org)

Structured data is a hidden block of JSON in each page's code that tells
search engines what the page describes — a service, an event, your office —
rather than leaving them to guess from the words.

**Some of it is automatic** and needs nothing from you:

| Page | Generated automatically |
| ---- | ----------------------- |
| Home | Organization, WebSite, **FAQPage** (from the FAQ section) |
| Blog posts | Article |
| Every nested page | BreadcrumbList |

**The rest you can add yourself.** Each page document and each landing page
has a **Structured data (schema.org)** field under its SEO section. Click
*Add item* and choose:

- **Service** — something you sell, with an optional price. Suits Services.
- **Course** — needs a name and a description.
- **Event** — a webinar or open day. Online events need a link; in-person
  events need a venue.
- **Office / organisation** — phone, email, address, opening hours. Suits
  Contact.

Three rules to know:

1. **Only describe what's actually on the page.** Markup that doesn't match
   the visible page can be ignored or penalised by Google. Don't add a
   Service entry to the About page.
2. **Incomplete entries are skipped, not published.** The Studio flags
   missing required fields; if one still gets through, the build leaves that
   entry out and logs a warning. Broken markup is worse than none.
3. **Each language uses its own text.** On page documents, fill in the
   English and Arabic boxes — the Arabic page never borrows English text.

There's no FAQ option here, deliberately: Google requires FAQ markup to match
questions visible on the page, and the home page FAQ already generates its
own. Note that Google now shows FAQ rich results only for major government and
health sites, so FAQ markup is unlikely to change how you appear in Google —
though other search engines and AI tools still read it.

To check a live page, paste its URL into Google's
[Rich Results Test](https://search.google.com/test/rich-results).

**Navigation, Footer & Sign-up** holds the nav labels, footer columns and the
sign-up dialog text. Link *labels* come from Sanity; the *destinations* stay in
code, so renaming a footer link can't break routing.

### Add a blog post

1. Open the Studio → **Blog Posts** → **Create new**.
2. Fill in:
   - **Title**
   - **Slug** — click *Generate*. This becomes the web address, e.g. a slug of
     `choosing-a-major` gives you `/blog/choosing-a-major/`.
   - **Language** — English puts it on `/blog/`, Arabic on `/ar/blog/`.
   - **Excerpt** — the summary on the card, also used as the Google description.
   - **Body** — the article itself.
   - **Cover image** — optional but recommended.
   - Under **Card & metadata**: category badge, author, date, read time.
3. Optionally open the **SEO & sharing** tab to override the search title,
   description or share image. Leave it blank and sensible defaults are used.
4. Click **Publish**.
5. Rebuild the site (see [Publishing changes](#publishing-changes)).

**Featured post:** ticking *Featured post* puts an article in the large slot at
the top of the blog page. Tick it on only one post per language.

### Social Media page

The **Social Media** page (`/social-media/`, in the menu after Blog) shows your
social media links as cards.

**Add a link:** Studio → **Social Media Page** → **2. Social media links** →
**Add item**, then fill in:

- **Title**: the text on the card, with English and Arabic boxes.
- **Social media URL**: open the post, video or profile in your browser and
  copy the address.

Each row becomes one card, in the order of the list; drag rows to reorder.
Publish, then rebuild the site.

What happens automatically:

- **The platform is detected from the URL** (YouTube, Instagram, TikTok,
  LinkedIn, X or Facebook). The card shows its name and icon, and visitors can
  filter by platform. Any other website shows as "Website".
- **YouTube links show the video's thumbnail.** Other platforms don't let
  websites fetch post images, so their cards show the platform icon.
- **Languages:** a card shows on the English or Arabic page when its title is
  filled in for that language. The URL is shared by both.

**Why cards link out instead of embedding the post:** embeds from Instagram,
TikTok and X load those companies' scripts and tracking cookies and make the
page slower. A link card stays fast and always works.

The same document holds the rest of the page wording, the name in the top
menu, and SEO. The "Follow us" strip at the bottom uses the social links in
**Site Settings** and stays hidden until you add some.

### Add a white paper

Same idea, under **White Papers**. The one thing to watch: each paper needs a
**Slug** so it can have its own page. Papers created before this site was built
don't have one — open each, click *Generate* next to Slug, and publish.

Upload the PDF in the **PDF file** field; the download button links straight to it.

### Create a new landing page — no code needed

This is the one that lets you launch a campaign page on your own.

1. Studio → **Landing Pages** → **Create new**.
2. Give it a **Title** and generate a **Slug**. A slug of `schools-2025`
   becomes `/schools-2025/`.
3. Pick a **Language**.
4. Under **Sections**, click **Add item** and choose from:
   - **Hero** — big headline, sub-headline, image, up to two buttons
   - **Text** — free rich text
   - **Feature grid** — 2, 3 or 4 columns of icon + title + description
   - **Statistics band** — a row of big numbers
   - **Quote** — a pull quote with attribution
   - **Call to action** — a heading and a button
5. Drag sections into the order you want.
6. Publish, then rebuild.

Avoid slugs that clash with the hand-built pages (`services`, `benefits`,
`about`, `contact`, `blog`, `white-papers`) — those are skipped automatically,
so a landing page using one simply won't appear.

**Buttons:** leave a button's link blank and it opens the sign-up form. Fill in
a path like `/contact/` to link somewhere instead.

### Site Settings

At the top of the Studio. Holds the site name, the default description used
when a page has none of its own, the default social share image, and your
social links (which appear in the footer and on the contact page).

---

## Publishing changes

Because the site is static, a content change in Sanity does **not** appear
until the site is rebuilt. Three ways to trigger that:

1. **Push code to your Git branch** — Amplify rebuilds automatically.
2. **Amplify console** → your app → **Redeploy this version**.
3. **A Sanity webhook** that calls an Amplify build hook whenever you publish.
   This is the one worth setting up; ask whoever set up the site for the
   instructions, or see the notes handed over with this project.

---

## Where things live

```
├── amplify.yml              AWS Amplify build instructions + cache/security headers
├── astro.config.mjs         Astro config: static output, integrations, site URL
│
├── src/
│   ├── pages/               ← every URL on the site comes from a file here
│   │   ├── index.astro          /
│   │   ├── services.astro       /services/
│   │   ├── blog/index.astro     /blog/
│   │   ├── blog/[slug].astro    /blog/<each post>/     (one file per post)
│   │   ├── white-papers/…       /white-papers/…
│   │   ├── [slug].astro         Sanity landing pages
│   │   ├── ar/…                 the Arabic mirror of all of the above
│   │   ├── og/[...slug].png.ts  auto-generated social share images
│   │   └── robots.txt.ts        robots.txt
│   │
│   ├── sections/            the actual page designs; each is used twice,
│   │                        once for English and once for Arabic
│   │
│   ├── layouts/Base.astro   the page shell: <head>, header, footer, scripts
│   │
│   ├── components/          reusable pieces (Astro = no JavaScript shipped)
│   │   ├── SEO.astro            ← all meta tags, canonical, Open Graph, JSON-LD
│   │   ├── Nav.astro  Footer.astro  Breadcrumbs.astro
│   │   ├── PostCard.astro  SanityImage.astro  RichText.astro
│   │   └── react/           the only React left — genuinely interactive bits
│   │       ├── SignupModal.tsx     the sign-up dialog + toast
│   │       ├── FAQ.tsx             the accordion
│   │       ├── ContactForm.tsx     the contact form
│   │       └── NewsletterForm.tsx  newsletter sign-up
│   │
│   ├── content/             all the page wording, English and Arabic
│   │   ├── home.ts  services.ts  benefits.ts  about.ts  contact.ts
│   │   ├── blog.ts  whitePapers.ts
│   │   └── site.ts          nav labels, footer, sign-up modal
│   │
│   ├── lib/
│   │   ├── sanity.ts        talks to Sanity (build time only)
│   │   ├── queries.ts       every database query, in one place
│   │   ├── seo.ts           builds the JSON-LD structured data
│   │   ├── i18n.ts          language + URL helpers
│   │   ├── og.ts            draws the auto-generated share images
│   │   └── settings.ts      loads Site Settings from Sanity
│   │
│   ├── styles/global.css    the design system + Tailwind
│   └── assets/images/       images Astro optimises into WebP
│
└── studio/                  the Sanity Studio (content admin)
    └── schemaTypes/         what fields each content type has
```

### If you need to change something

| I want to…                                     | Edit                                             |
| ---------------------------------------------- | ------------------------------------------------ |
| Reword anything on a normal page                | `src/content/*.ts`                                |
| Change how a page looks                         | `src/sections/*.astro`                            |
| Change the header or footer                     | `src/components/Nav.astro` / `Footer.astro`       |
| Change colours, spacing, fonts                  | `src/styles/global.css`                           |
| Add a nav link                                  | `NAV_ITEMS` + `NAV_LABELS` in `src/content/site.ts` |
| Change what Google sees                         | `src/components/SEO.astro`                        |
| Change the auto-generated share image design    | `src/lib/og.ts`                                   |
| Add a field to blog posts / white papers        | `studio/schemaTypes/…` **and** `src/lib/queries.ts` |
| Connect the contact form to a real inbox        | `submit()` in `src/components/react/ContactForm.tsx` |
| Connect the newsletter to a mailing list        | `submit()` in `src/components/react/NewsletterForm.tsx` |

---

## How the two languages work

English lives at the root (`/services/`), Arabic under a prefix
(`/ar/services/`). Both are real HTML files, so search engines can index the
Arabic pages properly — which is why this replaced the old in-browser language
toggle, where the Arabic text never existed in the page source.

Each page under `src/pages/` is a two-line file that picks a language and hands
off to a shared design in `src/sections/`. To add a new hand-built page you
write the design once and add two small page files, one in `src/pages/` and one
in `src/pages/ar/`.

The header's language button is a plain link to the same page in the other
language, and each page declares `hreflang` tags so Google knows the two
versions are translations rather than duplicates.

---

## Notes and known limitations

- **The contact and newsletter forms don't send anywhere yet.** They show a
  confirmation but no message is delivered — exactly as in the previous React
  site. See the table above for where to wire them up.
- **Auto-generated share images are English-only.** The image generator renders
  Arabic letters correctly but spaces the words unevenly, so Arabic pages fall
  back to the default share image from Site Settings instead. You can always set
  a share image by hand on any post, which overrides everything.
- **Scroll animations are progressive enhancement.** With JavaScript disabled
  all content still shows — it just appears without fading in.


---

## Known issues in the content

**The "Top career matches" list has a broken old box.** In the old JSON text
box, the Arabic entry is missing a closing quote, so that box can't be read.
The site falls back to its built-in list, so the panel still looks right. The
migration script skips this one list and says so. To fix it, open **Home Page
→ 7. The report → Box 2 — careers with bars** and add the three careers as
rows. Once the list has rows, the broken box is ignored.

**One testimonial is a placeholder.** The only `testimonial` document reads
"jithin / ceo / test test". Because real Sanity content replaces the built-in
examples wholesale, that one entry would have been the only testimonial on the
home page. The query therefore skips testimonials whose quote is shorter than
40 characters. Delete or finish that document and the rule stops mattering —
see the comment above `TESTIMONIALS_QUERY` in `src/lib/queries.ts`.

**There are no blog posts or white papers yet.** The blog and white-paper
listings show their built-in placeholder articles until you create real ones in
the Studio. The individual article pages (`/blog/<slug>/`) only get built once
real posts exist.
