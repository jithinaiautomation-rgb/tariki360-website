/**
 * Social Media page copy.
 *
 * The links shown as cards come from the "Social media links" list on the
 * Social Media Page document in Sanity; every other value here can be
 * overridden on that document too.
 *
 * `links` is empty on purpose: an invented social post would be
 * indistinguishable from a real one, so an empty page shows an honest
 * "no links yet" message instead.
 */
import type { Lang } from '~/lib/i18n';

export const SOCIAL = {
  en: {
    metaTitle: 'Social Media — Videos, Stories & Updates',
    metaDescription:
      'Watch videos, student stories and career guidance tips from Tariki 360 on Instagram, YouTube, TikTok and LinkedIn, all in one place.',

    heroTag: 'Social Media',
    heroTitle: 'Follow Our Journey Across Social Media',
    heroSubtitle:
      'Videos, student stories and practical career guidance from the Tariki 360 team, gathered from our channels in one place.',

    /** [title, url] per card. Filled from Sanity. */
    links: [] as Array<[string, string]>,

    latestTitle: 'Latest Posts',
    latestSubtitle: 'Fresh from our channels.',
    allPlatforms: 'All platforms',
    /** `{platform}` is replaced with the platform name, e.g. "View on YouTube". */
    viewOn: 'View on {platform}',
    openLink: 'Open link',
    otherWebsite: 'Website',
    opensInNewTab: '(opens in a new tab)',
    emptyState: 'No links yet. Follow us on our channels in the meantime.',

    followTitle: 'Follow Tariki 360',
    followSubtitle: 'Get new videos and career tips as soon as they are posted.',
  },

  ar: {
    metaTitle: 'وسائل التواصل الاجتماعي — فيديوهات وقصص ومستجدات',
    metaDescription:
      'شاهد الفيديوهات وقصص الطلاب ونصائح التوجيه المهني من طريقي 360 على إنستغرام ويوتيوب وتيك توك ولينكدإن، في مكان واحد.',

    heroTag: 'وسائل التواصل',
    heroTitle: 'تابع رحلتنا عبر وسائل التواصل الاجتماعي',
    heroSubtitle:
      'فيديوهات وقصص طلاب ونصائح عملية للتوجيه المهني من فريق طريقي 360، مجمّعة من قنواتنا في مكان واحد.',

    links: [] as Array<[string, string]>,

    latestTitle: 'أحدث المنشورات',
    latestSubtitle: 'جديد قنواتنا.',
    allPlatforms: 'كل المنصات',
    viewOn: 'مشاهدة على {platform}',
    openLink: 'فتح الرابط',
    otherWebsite: 'موقع إلكتروني',
    opensInNewTab: '(يفتح في علامة تبويب جديدة)',
    emptyState: 'لا توجد روابط بعد. تابعنا على قنواتنا في هذه الأثناء.',

    followTitle: 'تابع طريقي 360',
    followSubtitle: 'احصل على الفيديوهات ونصائح المسار المهني فور نشرها.',
  },
} satisfies Record<Lang, unknown>;
