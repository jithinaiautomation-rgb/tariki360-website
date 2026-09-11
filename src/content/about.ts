/** About page copy, lifted from the old React About screen. */
import type { Lang } from '~/lib/i18n';

export const ABOUT = {
  en: {
    metaTitle: 'About Tariki 360',
    metaDescription:
      'A regional initiative between NABD Consultancies & Training and CLAP Smart Learn, mapping the futures of tomorrow’s leaders across the Middle East.',

    storyTag: 'Our story',
    title: 'About Tariki 360',
    /** Split so the two partner names can be bolded inside the sentence. */
    introLead: 'A regional initiative between ',
    introStrong1: 'NABD Consultancies & Training',
    introMid: ' and ',
    introStrong2: 'CLAP Smart Learn',
    introTrail:
      ', dedicated to mapping the futures of tomorrow’s leaders across the UAE and the broader Middle East.',
    tagline: 'طريقي — "my path" — since 2015',
    getInTouch: 'Get in Touch',
    heroImgAlt: 'Tariki 360 counselling session',

    initiativeTag: 'The Initiative',
    whatIsTitle: 'What is Tariki 360?',
    whatIsP1:
      'Tariki 360 is more than just a platform; it is a movement toward educational clarity. Born from the strategic alliance between NABD and CLAP, we provide a holistic 360-degree approach to career mapping.',
    whatIsP2:
      'By leveraging advanced psychometrics and regional market data, we ensure that students in the Gulf and Middle East aren’t just choosing jobs — they are discovering their purpose.',
    clarityTitle: 'Clarity',
    clarityDesc:
      'Removing the noise from career decision-making through scientific validation.',
    growthTitle: 'Growth',
    growthDesc:
      'Continuous upskilling pathways tailored to regional economic shifts.',

    partnersTag: 'Partners',
    partnersTitle: 'The power of partnership',
    partners: [
      ['NABD Consultancies & Training', 'Established 2015 · Upskilling the Gulf', 'Specializing in advanced human-capital assessments and professional training across the Gulf’s educational transformation.'],
      ['CLAP Smart Learn', '10+ years · Career Mapping Pioneers', 'A decade-long track record across India and the Middle East in psychometric design and intelligent learning systems.'],
    ] as Array<[string, string, string]>,

    leadershipTag: 'Leadership',
    boardTitle: 'Board of Directors',
    boardSubtitle: 'Distinguished leadership driving educational innovation',
    board: [
      {
        name: 'Eng. Ali Alsuwaidi',
        role: 'CHAIRMAN',
        desc: 'A visionary leader in the Middle East’s engineering and training sectors, committed to sustainable human capital development.',
      },
      {
        name: 'Mr. Mohammed Abdul Karim Julfar',
        role: 'DIRECTOR',
        desc: 'Pioneering innovative career mapping strategies for over a decade, with a deep focus on student empowerment and institutional growth.',
      },
    ],
  },

  ar: {
    metaTitle: 'عن طريقي 360',
    metaDescription:
      'طريقي 360 مبادرة إقليمية بين NABD Consultancies & Training و CLAP Smart Learn، ترسم مستقبل قادة الغد في الإمارات والشرق الأوسط.',

    storyTag: 'قصتنا',
    title: 'عن طريقي 360',
    introLead: 'مبادرة إقليمية بين ',
    introStrong1: 'NABD Consultancies & Training',
    introMid: ' و ',
    introStrong2: 'CLAP Smart Learn',
    introTrail:
      '، مكرّسة لرسم مستقبل قادة الغد في الإمارات العربية المتحدة ومنطقة الشرق الأوسط الأوسع.',
    tagline: 'طريقي — "مساري" — منذ عام 2015',
    getInTouch: 'تواصل معنا',
    heroImgAlt: 'جلسة إرشاد من طريقي 360',

    initiativeTag: 'المبادرة',
    whatIsTitle: 'ما هو طريقي 360؟',
    whatIsP1:
      'طريقي 360 هو أكثر من مجرد منصة؛ إنه حركة نحو الوضوح التعليمي. وُلد من التحالف الاستراتيجي بين NABD و CLAP، ونوفر نهجاً شاملاً بزاوية 360 درجة لرسم المسار المهني.',
    whatIsP2:
      'من خلال الاستفادة من القياسات النفسية المتقدمة وبيانات السوق الإقليمية، نضمن أن طلاب الخليج والشرق الأوسط لا يختارون وظائف فقط — بل يكتشفون هدفهم.',
    clarityTitle: 'الوضوح',
    clarityDesc: 'إزالة الضوضاء من عملية اتخاذ القرار المهني من خلال التحقق العلمي.',
    growthTitle: 'النمو',
    growthDesc:
      'مسارات تطوير مهارات مستمرة مصممة لتتوافق مع التحولات الاقتصادية الإقليمية.',

    partnersTag: 'الشركاء',
    partnersTitle: 'قوة الشراكة',
    partners: [
      ['NABD Consultancies & Training', 'تأسست عام 2015 · تطوير مهارات الخليج', 'متخصصون في التقييمات المتقدمة لرأس المال البشري والتدريب المهني عبر التحول التعليمي في دول الخليج.'],
      ['CLAP Smart Learn', 'أكثر من 10 سنوات · روّاد رسم المسار المهني', 'سجل حافل لأكثر من عقد في الهند والشرق الأوسط في تصميم القياسات النفسية وأنظمة التعلم الذكية.'],
    ] as Array<[string, string, string]>,

    leadershipTag: 'القيادة',
    boardTitle: 'مجلس الإدارة',
    boardSubtitle: 'قيادة متميزة تقود الابتكار التعليمي',
    board: [
      {
        name: 'Eng. Ali Alsuwaidi',
        role: 'رئيس مجلس الإدارة',
        desc: 'قائد ذو رؤية في قطاعي الهندسة والتدريب بالشرق الأوسط، ملتزم بتنمية رأس المال البشري المستدامة.',
      },
      {
        name: 'Mr. Mohammed Abdul Karim Julfar',
        role: 'عضو مجلس الإدارة',
        desc: 'رائد في وضع استراتيجيات مبتكرة لرسم المسار المهني لأكثر من عقد، مع تركيز عميق على تمكين الطلاب والنمو المؤسسي.',
      },
    ],
  },
} satisfies Record<Lang, unknown>;
