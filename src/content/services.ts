/** Services page copy, lifted from the old React Services screen. */
import type { Lang } from '~/lib/i18n';

export const SERVICES = {
  en: {
    metaTitle: 'Services & Pricing',
    metaDescription:
      'Career Path Finder from AED 599 and Career Champion from AED 899, plus Institutional Career Assessment for schools. Find the right Tariki 360 service for you.',

    heroTitle: 'Tailored pathways to your potential',
    heroSubtitle:
      "Find the right service — whether you're a student seeking clarity or an institution empowering the next generation.",
    forStudents: 'For Students',
    forInstitutionsBtn: 'For Institutions',
    characterImgAlt: 'Career guidance character',

    tier1Label: 'Instant, AI-powered insights',
    tier1Title: 'Career Path Finder',
    tier1Desc:
      'A fast, data-driven way to decode your Career DNA and make confident decisions.',
    tier1Price: 'AED 599',
    oneTime: 'one-time',
    tier1: [
      ['target', 'Your Top Career Matches'],
      ['menu_book', 'Your Ideal Subject Streams'],
      ['lightbulb', 'Your Strength Breakdown'],
      ['description', 'Detailed PDF Report'],
      ['videocam', 'Video-Based Report'],
      ['smart_toy', 'AI Virtual Career Counsellor'],
    ] as Array<[string, string]>,
    getStarted: 'Get Started',
    viewProcess: 'View Process',

    tier2Label: 'Go deeper. Get clearer.',
    tier2Title: 'Career Champion',
    tier2Desc:
      'Everything in Career Path Finder — plus a real human expert in your corner.',
    tier2Price: 'AED 899',
    premiumBenefits: 'Premium benefits',
    tier2: [
      ['check_circle', 'Everything in Career Path Finder'],
      ['person', '1-on-1 Human Expert Session'],
      ['help_center', 'All Your Questions Answered'],
      ['map', 'Personal Career Vision Board'],
    ] as Array<[string, string]>,

    instTag: 'For Institutions',
    instTitle: 'Institutional Career Assessment',
    instSubtitle:
      'Equip your school with AI-driven career mapping, built for seamless group rollout.',
    inst: [
      ['desktop_windows', 'Admin Portal', 'A dedicated portal for staff to track all student assessments in real time.'],
      ['analytics', 'Batch Analytics', 'Identify cohort-level trends in interests, skills, and subject fit.'],
      ['dashboard', 'Visual Dashboard', 'Clear visual data to drive high-quality school counseling.'],
    ] as Array<[string, string, string]>,
    requestDemo: 'Request a Demo',

    successTag: 'Success Stories',
    successTitle: 'Real journeys, real clarity',
    successSubtitle:
      'Hear directly from students, parents, and educators who found their path with Tariki 360.',
    videoTestimonialsTitle: 'Video Testimonials',
  },

  ar: {
    metaTitle: 'الخدمات والأسعار',
    metaDescription:
      'مكتشف المسار المهني بـ 599 درهماً وبطل المسار المهني بـ 899 درهماً، بالإضافة إلى التقييم المهني المؤسسي للمدارس. اعثر على خدمة طريقي 360 المناسبة لك.',

    heroTitle: 'مسارات مصممة خصيصاً لتحقيق إمكاناتك',
    heroSubtitle:
      'اعثر على الخدمة المناسبة — سواء كنت طالباً تبحث عن الوضوح أو مؤسسة تسعى لتمكين الجيل القادم.',
    forStudents: 'للطلاب',
    forInstitutionsBtn: 'للمؤسسات',
    characterImgAlt: 'شخصية التوجيه المهني',

    tier1Label: 'رؤى فورية مدعومة بالذكاء الاصطناعي',
    tier1Title: 'مكتشف المسار المهني',
    tier1Desc:
      'طريقة سريعة ومبنية على البيانات لفهم حمضك المهني النووي واتخاذ قرارات بثقة.',
    tier1Price: 'AED 599',
    oneTime: 'دفعة واحدة',
    tier1: [
      ['target', 'أفضل توافقاتك المهنية'],
      ['menu_book', 'مساراتك الدراسية المثالية'],
      ['lightbulb', 'تحليل نقاط قوتك'],
      ['description', 'تقرير PDF تفصيلي'],
      ['videocam', 'تقرير بصيغة فيديو'],
      ['smart_toy', 'مستشار مهني افتراضي بالذكاء الاصطناعي'],
    ] as Array<[string, string]>,
    getStarted: 'ابدأ الآن',
    viewProcess: 'عرض الخطوات',

    tier2Label: 'تعمّق أكثر. احصل على وضوح أكبر.',
    tier2Title: 'بطل المسار المهني',
    tier2Desc:
      'كل ما يقدمه مكتشف المسار المهني — بالإضافة إلى خبير بشري حقيقي في صفك.',
    tier2Price: 'AED 899',
    premiumBenefits: 'المزايا المميزة',
    tier2: [
      ['check_circle', 'كل ما يقدمه مكتشف المسار المهني'],
      ['person', 'جلسة فردية مع خبير بشري'],
      ['help_center', 'إجابات على جميع أسئلتك'],
      ['map', 'لوحة رؤية مهنية شخصية'],
    ] as Array<[string, string]>,

    instTag: 'للمؤسسات',
    instTitle: 'التقييم المهني المؤسسي',
    instSubtitle:
      'زوّد مدرستك برسم مسارات مهنية مدعوم بالذكاء الاصطناعي، مصمم لتطبيق جماعي سلس.',
    inst: [
      ['desktop_windows', 'بوابة الإدارة', 'بوابة مخصصة للموظفين لتتبع جميع تقييمات الطلاب في الوقت الفعلي.'],
      ['analytics', 'تحليلات جماعية', 'تحديد الاتجاهات على مستوى الدفعة في الاهتمامات والمهارات والتوافق مع المواد.'],
      ['dashboard', 'لوحة بيانات بصرية', 'بيانات بصرية واضحة لدعم استشارات مدرسية عالية الجودة.'],
    ] as Array<[string, string, string]>,
    requestDemo: 'طلب عرض توضيحي',

    successTag: 'قصص النجاح',
    successTitle: 'رحلات حقيقية، وضوح حقيقي',
    successSubtitle:
      'استمع مباشرة إلى الطلاب وأولياء الأمور والمعلمين الذين وجدوا طريقهم مع طريقي 360.',
    videoTestimonialsTitle: 'شهادات فيديو',
  },
} satisfies Record<Lang, unknown>;
