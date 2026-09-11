/**
 * White papers ("Resources") page copy.
 *
 * The papers themselves come from Sanity; this holds the page furniture and
 * the original placeholder papers used when Sanity has none yet.
 */
import type { Lang } from '~/lib/i18n';

export const WHITE_PAPERS = {
  en: {
    metaTitle: 'White Papers & Resources',
    metaDescription:
      'Expert-led white papers, success stories and educational resources for schools, parents and students across the Middle East — free to download from Tariki 360.',

    heroTag: 'Knowledge Hub',
    heroTitle: 'Empowering the Next Generation with Deep Insights',
    heroSubtitle:
      'Expert-led white papers, success stories, and educational resources designed for schools, parents, and students in the Middle East.',

    sectionTitle: 'White Papers',
    sectionSubtitle: 'Strategic guides for navigating the future of education.',
    allGuides: 'All Guides',
    downloadPdf: 'Download PDF',
    readMore: 'Read more',
    emptyState: 'No white papers published yet — check back soon.',

    ctaTitle: 'Start Your Guided Journey Today',
    ctaDownload: 'Download White Papers',
    ctaShare: 'Share Your Story',

    fallbackPapers: [
      { badge: 'Parent Guide', title: 'Navigating Career Choices in the 2025 Landscape', desc: 'A comprehensive manual for parents to support their children through modern career mapping and university selection.', date: 'Oct 2024', slug: null as string | null, fileUrl: null as string | null },
      { badge: 'School Guide', title: 'Integrating Tariki 360 into Your Curriculum', desc: 'A strategic framework for school administrators to implement psychometric-based career guidance into daily academic life.', date: 'Sep 2024', slug: null as string | null, fileUrl: null as string | null },
      { badge: 'Future Skills', title: 'AI and The Evolution of Career Readiness', desc: 'Insights into emerging skills required for the digital economy and how Tariki 360 identifies student aptitude for these roles.', date: 'Nov 2024', slug: null as string | null, fileUrl: null as string | null },
    ],
  },

  ar: {
    metaTitle: 'الأوراق البحثية والموارد',
    metaDescription:
      'أوراق بحثية متخصصة وقصص نجاح وموارد تعليمية للمدارس وأولياء الأمور والطلاب في الشرق الأوسط — متاحة للتحميل مجاناً من طريقي 360.',

    heroTag: 'مركز المعرفة',
    heroTitle: 'تمكين الجيل القادم برؤى معمّقة',
    heroSubtitle:
      'أوراق بحثية متخصصة، وقصص نجاح، وموارد تعليمية مصممة للمدارس وأولياء الأمور والطلاب في الشرق الأوسط.',

    sectionTitle: 'الأوراق البحثية',
    sectionSubtitle: 'دلائل استراتيجية للتعامل مع مستقبل التعليم.',
    allGuides: 'جميع الدلائل',
    downloadPdf: 'تحميل PDF',
    readMore: 'اقرأ المزيد',
    emptyState: 'لا توجد أوراق بحثية منشورة بعد — تابعنا قريباً.',

    ctaTitle: 'ابدأ رحلتك التوجيهية اليوم',
    ctaDownload: 'تحميل الأوراق البحثية',
    ctaShare: 'شارك قصتك',

    fallbackPapers: [
      { badge: 'دليل ولي الأمر', title: 'التعامل مع خيارات المسار المهني في مشهد عام 2025', desc: 'دليل شامل لأولياء الأمور لمساعدة أبنائهم في رسم المسار المهني الحديث واختيار الجامعة.', date: 'أكتوبر 2024', slug: null as string | null, fileUrl: null as string | null },
      { badge: 'دليل المدرسة', title: 'دمج طريقي 360 في منهجكم الدراسي', desc: 'إطار عمل استراتيجي لمسؤولي المدارس لتطبيق التوجيه المهني القائم على القياس النفسي في الحياة الأكاديمية اليومية.', date: 'سبتمبر 2024', slug: null as string | null, fileUrl: null as string | null },
      { badge: 'مهارات المستقبل', title: 'الذكاء الاصطناعي وتطور الجاهزية المهنية', desc: 'رؤى حول المهارات الناشئة المطلوبة للاقتصاد الرقمي وكيف يحدد طريقي 360 استعداد الطلاب لهذه الأدوار.', date: 'نوفمبر 2024', slug: null as string | null, fileUrl: null as string | null },
    ],
  },
} satisfies Record<Lang, unknown>;
