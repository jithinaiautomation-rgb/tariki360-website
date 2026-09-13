/**
 * One-off migration: move the home page FAQs from the old single text box
 * (`faqs_json`) into the new FAQs list (`faqs`), one item per question.
 *
 * Run from the studio/ folder:
 *
 *   npx sanity login                                         (once)
 *   npx sanity exec scripts/migrate-faqs.js --with-user-token -- --dry-run
 *   npx sanity exec scripts/migrate-faqs.js --with-user-token
 *
 * The first run with --dry-run only prints what would change. Without it,
 * the script writes the list and removes the old field.
 *
 * Safe to re-run: if a document already has a non-empty FAQs list it is left
 * alone. It updates both the published home page and any unpublished draft.
 */
import { getCliClient } from 'sanity/cli';

const DRY_RUN = process.argv.includes('--dry-run');
const client = getCliClient({ apiVersion: '2024-01-01' });

const randomKey = () => Math.random().toString(36).slice(2, 14);

function toItems(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(`faqs_json is not valid JSON (${err.message}). Fix it or re-type the FAQs by hand.`);
  }
  const en = Array.isArray(parsed?.en) ? parsed.en : [];
  const ar = Array.isArray(parsed?.ar) ? parsed.ar : [];
  const count = Math.max(en.length, ar.length);

  const items = [];
  for (let i = 0; i < count; i++) {
    const [qEn, aEn] = Array.isArray(en[i]) ? en[i] : [];
    const [qAr, aAr] = Array.isArray(ar[i]) ? ar[i] : [];
    items.push({
      _key: randomKey(),
      _type: 'faqItem',
      question: { _type: 'localeString', en: qEn ?? '', ar: qAr ?? '' },
      answer: { _type: 'localeText', en: aEn ?? '', ar: aAr ?? '' },
    });
  }
  return items;
}

const docs = await client.fetch(
  `*[_id in ["pageIndex", "drafts.pageIndex"]]{ _id, faqs, faqs_json }`,
);

if (docs.length === 0) {
  console.log('No home page document found — nothing to do.');
  process.exit(0);
}

for (const doc of docs) {
  if (Array.isArray(doc.faqs) && doc.faqs.length > 0) {
    console.log(`${doc._id}: already has ${doc.faqs.length} FAQ item(s) — skipped.`);
    continue;
  }
  if (!doc.faqs_json) {
    console.log(`${doc._id}: no old FAQs to migrate — skipped.`);
    continue;
  }

  const items = toItems(doc.faqs_json);
  console.log(`${doc._id}: ${items.length} FAQ item(s)`);
  items.forEach((it, i) => console.log(`  ${i + 1}. ${it.question.en || it.question.ar}`));

  if (DRY_RUN) continue;

  await client.patch(doc._id).set({ faqs: items }).unset(['faqs_json']).commit();
  console.log(`  written, old field removed.`);
}

console.log(DRY_RUN ? '\nDry run — nothing was changed.' : '\nDone. Rebuild the site to publish.');
