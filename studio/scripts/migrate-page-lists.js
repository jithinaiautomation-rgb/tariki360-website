/**
 * One-off migration for the page documents (Home, Services, Benefits, About,
 * Contact): move every list that used to be a single JSON text box
 * (`stats_json`, `tier1_json`, `board_json` …) into the matching
 * one-row-per-item list (`stats`, `tier1`, `board` …).
 *
 * Run from the studio/ folder:
 *
 *   npx sanity login                                               (once)
 *   npx sanity exec scripts/migrate-page-lists.js --with-user-token -- --dry-run
 *   npx sanity exec scripts/migrate-page-lists.js --with-user-token
 *
 * --dry-run only prints what would change. Without it, each list is written
 * and its old box removed.
 *
 * Safe to re-run: a list that already has rows is left alone. Both the
 * published document and any unpublished draft are updated. An old box
 * containing invalid JSON is reported and skipped — type that list in by hand.
 */
import { getCliClient } from 'sanity/cli';

const DRY_RUN = process.argv.includes('--dry-run');
const client = getCliClient({ apiVersion: '2024-01-01' });

const key = () => Math.random().toString(36).slice(2, 14);
const loc = (en, ar, type = 'localeString') => ({ _type: type, en: en ?? '', ar: ar ?? '' });
const plain = (en, ar) => en ?? ar ?? '';

/* Reusable row builders. `e` is the English entry, `a` the Arabic one. */
const iconLabel = (item) => ({ item, row: (e, a) => ({ icon: plain(e?.[0], a?.[0]), label: loc(e?.[1], a?.[1]) }) });
const valueLabel = (item) => ({ item, row: (e, a) => ({ value: loc(e?.[0], a?.[0]), label: loc(e?.[1], a?.[1]) }) });
const feature = {
  item: 'featureItem',
  row: (e, a) => ({ icon: plain(e?.[0], a?.[0]), title: loc(e?.[1], a?.[1]), description: loc(e?.[2], a?.[2], 'localeText') }),
};
const namePercent = {
  item: 'percentItem',
  row: (e, a) => ({ name: loc(e?.[0], a?.[0]), percent: plain(e?.[1], a?.[1]) }),
};
/* Old tick lists stored [icon, text]; the icon was never shown, so only the text moves. */
const tick = { item: 'tickItem', row: (e, a) => ({ label: loc(e?.[1], a?.[1]) }) };
const titleText = {
  item: 'titleTextItem',
  row: (e, a) => ({ title: loc(e?.[0], a?.[0]), description: loc(e?.[1], a?.[1], 'localeText') }),
};

const PAGES = {
  pageIndex: {
    heroFeats: iconLabel('heroFeature'),
    stats: valueLabel('statItem'),
    feats: feature,
    schoolFeatures: feature,
    journey: {
      item: 'journeyStep',
      row: (e, a) => ({ icon: plain(e?.n, a?.n), title: loc(e?.t, a?.t), description: loc(e?.d, a?.d, 'localeText') }),
    },
    reportItems: iconLabel('reportItem'),
    topCareerList: namePercent,
    strengthList: namePercent,
    cohortStats: valueLabel('statItem'),
    careerInterestList: namePercent,
    faqs: { item: 'faqItem', row: (e, a) => ({ question: loc(e?.[0], a?.[0]), answer: loc(e?.[1], a?.[1], 'localeText') }) },
  },
  pageServices: {
    tier1: tick,
    tier2: tick,
    inst: feature,
  },
  pageBenefits: {
    stats: valueLabel('statItem'),
    aiMentorFeatures: iconLabel('iconPoint'),
    studentCards: feature,
    parentCards: feature,
    before: titleText,
    after: titleText,
    grid: feature,
  },
  pageAbout: {
    partners: {
      item: 'partnerItem',
      row: (e, a) => ({ name: loc(e?.[0], a?.[0]), meta: loc(e?.[1], a?.[1]), description: loc(e?.[2], a?.[2], 'localeText') }),
    },
    board: {
      item: 'boardMember',
      row: (e, a) => ({ name: loc(e?.name, a?.name), role: loc(e?.role, a?.role), description: loc(e?.desc, a?.desc, 'localeText') }),
    },
  },
  pageContact: {
    routes: feature,
    info: {
      item: 'contactDetail',
      row: (e, a) => {
        const row = { icon: plain(e?.[0], a?.[0]), title: loc(e?.[1], a?.[1]), description: loc(e?.[2], a?.[2], 'localeText') };
        const action = e?.[3] ?? a?.[3];
        return action ? { ...row, action } : row;
      },
    },
    langs: { item: 'languageChoice', row: (e, a) => ({ code: plain(e?.[0], a?.[0]), label: loc(e?.[1], a?.[1]) }) },
  },
};

const ids = Object.keys(PAGES).flatMap((id) => [id, `drafts.${id}`]);
const docs = await client.fetch(`*[_id in $ids]`, { ids });

const problems = [];
let changed = 0;

for (const doc of docs) {
  const lists = PAGES[doc._id.replace(/^drafts\./, '')];
  console.log(`\n${doc._id}`);
  const set = {};
  const unset = [];

  for (const [name, spec] of Object.entries(lists)) {
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

  if (unset.length === 0) {
    console.log('  nothing to move');
    continue;
  }
  if (DRY_RUN) continue;
  await client.patch(doc._id).set(set).unset(unset).commit();
  changed++;
  console.log(`  written; removed ${unset.length} old box(es)`);
}

if (problems.length) {
  console.log('\nSkipped because of invalid JSON:');
  problems.forEach((p) => console.log(`  ${p}`));
}
console.log(
  DRY_RUN ? '\nDry run — nothing was changed.' : `\nDone — ${changed} document(s) updated. Rebuild the site to publish.`,
);
