/**
 * One-off migration for the Home Page: move every list that used to be a
 * single JSON text box (`stats_json`, `journey_json`, `faqs_json` …) into the
 * matching one-row-per-item list (`stats`, `journey`, `faqs` …).
 *
 * Run from the studio/ folder:
 *
 *   npx sanity login                                               (once)
 *   npx sanity exec scripts/migrate-home-lists.js --with-user-token -- --dry-run
 *   npx sanity exec scripts/migrate-home-lists.js --with-user-token
 *
 * --dry-run only prints what would change. Without it, each list is written
 * and its old box removed.
 *
 * Safe to re-run: a list that already has rows is left alone. Both the
 * published Home Page and any unpublished draft are updated. An old box
 * containing invalid JSON is reported and skipped — type that list in by hand.
 */
import { getCliClient } from 'sanity/cli';

const DRY_RUN = process.argv.includes('--dry-run');
const client = getCliClient({ apiVersion: '2024-01-01' });

const key = () => Math.random().toString(36).slice(2, 14);
const loc = (en, ar, type = 'localeString') => ({ _type: type, en: en ?? '', ar: ar ?? '' });
const plain = (en, ar) => en ?? ar ?? '';

/** How each old tuple becomes a row. `e` is the English entry, `a` the Arabic. */
const LISTS = {
  heroFeats: { item: 'heroFeature', row: (e, a) => ({ icon: plain(e?.[0], a?.[0]), label: loc(e?.[1], a?.[1]) }) },
  stats: { item: 'statItem', row: (e, a) => ({ value: loc(e?.[0], a?.[0]), label: loc(e?.[1], a?.[1]) }) },
  feats: {
    item: 'featureItem',
    row: (e, a) => ({
      icon: plain(e?.[0], a?.[0]),
      title: loc(e?.[1], a?.[1]),
      description: loc(e?.[2], a?.[2], 'localeText'),
    }),
  },
  schoolFeatures: {
    item: 'featureItem',
    row: (e, a) => ({
      icon: plain(e?.[0], a?.[0]),
      title: loc(e?.[1], a?.[1]),
      description: loc(e?.[2], a?.[2], 'localeText'),
    }),
  },
  journey: {
    item: 'journeyStep',
    row: (e, a) => ({
      icon: plain(e?.n, a?.n),
      title: loc(e?.t, a?.t),
      description: loc(e?.d, a?.d, 'localeText'),
    }),
  },
  reportItems: { item: 'reportItem', row: (e, a) => ({ icon: plain(e?.[0], a?.[0]), label: loc(e?.[1], a?.[1]) }) },
  topCareerList: { item: 'percentItem', row: (e, a) => ({ name: loc(e?.[0], a?.[0]), percent: plain(e?.[1], a?.[1]) }) },
  strengthList: { item: 'percentItem', row: (e, a) => ({ name: loc(e?.[0], a?.[0]), percent: plain(e?.[1], a?.[1]) }) },
  cohortStats: { item: 'statItem', row: (e, a) => ({ value: loc(e?.[0], a?.[0]), label: loc(e?.[1], a?.[1]) }) },
  careerInterestList: {
    item: 'percentItem',
    row: (e, a) => ({ name: loc(e?.[0], a?.[0]), percent: plain(e?.[1], a?.[1]) }),
  },
  faqs: {
    item: 'faqItem',
    row: (e, a) => ({ question: loc(e?.[0], a?.[0]), answer: loc(e?.[1], a?.[1], 'localeText') }),
  },
};

const fields = Object.keys(LISTS).flatMap((k) => [k, `${k}_json`]).join(', ');
const docs = await client.fetch(`*[_id in ["pageIndex", "drafts.pageIndex"]]{ _id, ${fields} }`);

if (docs.length === 0) {
  console.log('No Home Page document found — nothing to do.');
  process.exit(0);
}

const problems = [];

for (const doc of docs) {
  console.log(`\n${doc._id}`);
  const set = {};
  const unset = [];

  for (const [name, spec] of Object.entries(LISTS)) {
    const oldField = `${name}_json`;
    if (Array.isArray(doc[name]) && doc[name].length > 0) {
      console.log(`  ${name}: already has ${doc[name].length} row(s) — skipped`);
      continue;
    }
    if (!doc[oldField]) continue;

    let parsed;
    try {
      parsed = JSON.parse(doc[oldField]);
    } catch (err) {
      console.log(`  ${name}: old box has invalid JSON — skipped, type this list in by hand`);
      problems.push(`${doc._id} ${name}: ${err.message}`);
      continue;
    }

    const en = Array.isArray(parsed?.en) ? parsed.en : [];
    const ar = Array.isArray(parsed?.ar) ? parsed.ar : [];
    const rows = [];
    for (let i = 0; i < Math.max(en.length, ar.length); i++) {
      rows.push({ _key: key(), _type: spec.item, ...spec.row(en[i], ar[i]) });
    }

    console.log(`  ${name}: ${rows.length} row(s)`);
    set[name] = rows;
    unset.push(oldField);
  }

  if (DRY_RUN || unset.length === 0) continue;
  await client.patch(doc._id).set(set).unset(unset).commit();
  console.log(`  written; removed ${unset.length} old box(es)`);
}

if (problems.length) {
  console.log('\nSkipped because of invalid JSON:');
  problems.forEach((p) => console.log(`  ${p}`));
}
console.log(DRY_RUN ? '\nDry run — nothing was changed.' : '\nDone. Rebuild the site to publish.');
