# Seed documents

One-off documents the site expects to exist. They are not created
automatically, because creating them requires write access to your Sanity
dataset — which the website itself never has.

## siteSettings

Holds the site name, the description used on any page without one of its own,
the default social share image, and your social links.

**The `_id` must be exactly `siteSettings`.** The Studio sidebar opens this
document by that id, so a different id produces a second, un-editable copy.

### Creating it — the easy way

Open the Studio, click **Site Settings (SEO defaults)** in the sidebar, fill
the fields in and publish. The id is set correctly for you.

### Creating it — from the terminal

From inside `studio/`, once (opens a browser to log in):

```bash
npx sanity login
npx sanity documents create seed/siteSettings.json --replace
```

`--replace` makes the command safe to re-run.

### Afterwards

Two things can only be done in the Studio:

- **Default share image** — upload a 1200×630 image. This is what shows on
  WhatsApp, LinkedIn and X for any page without its own share image.
- **Social links** — add each platform and its URL. They appear in the footer
  and on the contact page, and feed the `sameAs` field of the Organization
  structured data that tells Google which accounts are yours.
