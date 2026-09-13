/**
 * Site-wide copy: navigation, footer, and the sign-up modal.
 *
 * All the bilingual text from the old React components lives in `src/content/`
 * as plain data. Astro pages and React islands both read from here, so a
 * wording change happens in exactly one place.
 */
import type { Lang } from '~/lib/i18n';

/** The nav items, in order. `path` is the route; '' is the home page. */
export const NAV_ITEMS = [
  { key: 'home', path: '' },
  { key: 'services', path: 'services' },
  { key: 'benefits', path: 'benefits' },
  { key: 'about', path: 'about' },
  { key: 'resources', path: 'white-papers' },
  { key: 'blog', path: 'blog' },
  { key: 'social', path: 'social-media' },
  { key: 'contact', path: 'contact' },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]['key'];

export const NAV_LABELS: Record<Lang, Record<NavKey, string>> = {
  en: {
    home: 'Home',
    services: 'Services',
    benefits: 'Benefits',
    about: 'About',
    resources: 'Resources',
    blog: 'Blog',
    social: 'Media',
    contact: 'Contact',
  },
  ar: {
    home: 'الرئيسية',
    services: 'الخدمات',
    benefits: 'المزايا',
    about: 'من نحن',
    resources: 'الموارد',
    blog: 'المدونة',
    social: 'الإعلام',
    contact: 'تواصل معنا',
  },
};

export const NAV_TEXT: Record<Lang, { login: string; menu: string; switchTo: string }> = {
  en: { login: 'Login / Sign up', menu: 'Menu', switchTo: 'عربي' },
  ar: { login: 'تسجيل الدخول / إنشاء حساب', menu: 'القائمة', switchTo: 'EN' },
};

/* -------------------------------------------------------------- footer --- */

type FooterCol = { heading: string; items: Array<{ label: string; path: string }> };

export const FOOTER: Record<
  Lang,
  { cols: FooterCol[]; copyLine1: string; copyLine2: string; bottom: string }
> = {
  en: {
    cols: [
      {
        heading: 'Platform',
        items: [
          { label: 'Career Path Finder', path: 'services' },
          { label: 'Career Champion', path: 'services' },
          { label: 'Institutional Assessment', path: 'services' },
        ],
      },
      {
        heading: 'Company',
        items: [
          { label: 'About Us', path: 'about' },
          { label: 'Our Mission', path: 'about' },
          { label: 'Contact', path: 'contact' },
        ],
      },
      {
        heading: 'Support',
        items: [
          { label: 'FAQ', path: '' },
          { label: 'Resources', path: 'white-papers' },
          { label: 'Book a Demo', path: 'contact' },
        ],
      },
    ],
    copyLine1: 'Empowering educational journeys across the Middle East.',
    copyLine2: 'طريقي — "my path"',
    bottom:
      '© 2024 Tariki 360 · NABD Consultancies & Training · CLAP Smart Learn. All rights reserved.',
  },
  ar: {
    cols: [
      {
        heading: 'المنصة',
        items: [
          { label: 'مكتشف المسار المهني', path: 'services' },
          { label: 'بطل المسار المهني', path: 'services' },
          { label: 'التقييم المؤسسي', path: 'services' },
        ],
      },
      {
        heading: 'الشركة',
        items: [
          { label: 'من نحن', path: 'about' },
          { label: 'مهمتنا', path: 'about' },
          { label: 'تواصل معنا', path: 'contact' },
        ],
      },
      {
        heading: 'الدعم',
        items: [
          { label: 'الأسئلة الشائعة', path: '' },
          { label: 'الموارد', path: 'white-papers' },
          { label: 'حجز عرض توضيحي', path: 'contact' },
        ],
      },
    ],
    copyLine1: 'نمكّن الرحلات التعليمية في الشرق الأوسط.',
    copyLine2: 'طريقي — "مساري"',
    bottom:
      '© 2024 طريقي 360 · NABD للاستشارات والتدريب · CLAP Smart Learn. جميع الحقوق محفوظة.',
  },
};

/* ------------------------------------------------------- sign-up modal --- */

export const MODAL: Record<
  Lang,
  {
    tag: string;
    title: string;
    desc: string;
    nameLabel: string;
    namePh: string;
    emailLabel: string;
    emailPh: string;
    cta: string;
    close: string;
    toast: (name: string) => string;
  }
> = {
  en: {
    tag: 'Start free',
    title: "Map your child's path",
    desc: 'Create an account to begin the 20–30 minute assessment.',
    nameLabel: 'Full name',
    namePh: 'Your name',
    emailLabel: 'Email',
    emailPh: 'you@example.com',
    cta: 'Create account & start',
    close: 'Close',
    toast: (name) => `Welcome, ${name}! Your assessment is ready.`,
  },
  ar: {
    tag: 'ابدأ مجاناً',
    title: 'ارسم مسار طفلك',
    desc: 'أنشئ حساباً لبدء التقييم الذي يستغرق من 20 إلى 30 دقيقة.',
    nameLabel: 'الاسم الكامل',
    namePh: 'اسمك',
    emailLabel: 'البريد الإلكتروني',
    emailPh: 'you@example.com',
    cta: 'إنشاء حساب والبدء',
    close: 'إغلاق',
    toast: (name) => `أهلاً بك يا ${name}! تقييمك جاهز الآن.`,
  },
};

/* -------------------------------------------------- shared UI fragments --- */

export const COMMON: Record<
  Lang,
  {
    breadcrumbHome: string;
    readMore: string;
    backToBlog: string;
    backToPapers: string;
    publishedOn: string;
    by: string;
    skipToContent: string;
  }
> = {
  en: {
    breadcrumbHome: 'Home',
    readMore: 'Read',
    backToBlog: 'All articles',
    backToPapers: 'All white papers',
    publishedOn: 'Published',
    by: 'By',
    skipToContent: 'Skip to content',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    readMore: 'قراءة',
    backToBlog: 'كل المقالات',
    backToPapers: 'كل الأوراق البحثية',
    publishedOn: 'نُشر في',
    by: 'بقلم',
    skipToContent: 'انتقل إلى المحتوى',
  },
};
