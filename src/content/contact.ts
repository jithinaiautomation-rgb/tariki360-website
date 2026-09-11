/** Contact page copy, lifted from the old React Contact screen. */
import type { Lang } from '~/lib/i18n';

export const CONTACT = {
  en: {
    metaTitle: 'Contact Tariki 360',
    metaDescription:
      'Talk to the Tariki 360 team — career mapping for parents and students, curriculum integration for schools, and partnership enquiries across the Gulf.',

    tag: 'Get in touch',
    title: "Let's Chart Your Journey Together",
    subtitle:
      "Whether you're a student seeking guidance or a school looking to empower your students, our team is here to help.",

    routes: [
      ['family_restroom', 'For Parents', 'Personalized career mapping and admissions guidance tailored for the UAE landscape.'],
      ['school', 'For Schools', 'Integrate the Tariki 360 assessment into your curriculum and empower your students.'],
      ['handshake', 'Partnerships', 'Join our network of educational institutions to create a holistic ecosystem for youth growth.'],
    ] as Array<[string, string, string]>,

    formTitle: 'Send us a Message',
    formSubtitle: "We'll get back to you within one business day.",
    fullName: 'Full name',
    fullNamePh: 'e.g. Sultan Al-Mansoori',
    email: 'Email address',
    emailPh: 'sultan@example.com',
    phone: 'Phone number',
    phonePh: '+971 50 000 0000',
    iAmA: 'I am a…',
    selectRole: 'Select role',
    roles: ['Parent', 'School Administrator', 'Education Consultant', 'Student'],
    org: 'Organization / School',
    orgPh: 'Company name',
    country: 'Country',
    countries: [
      'United Arab Emirates',
      'Saudi Arabia',
      'Qatar',
      'Kuwait',
      'Bahrain',
      'Oman',
    ],
    prefLang: 'Preferred Language',
    langs: [
      ['en', 'English'],
      ['ar', 'Arabic'],
    ] as Array<[string, string]>,
    message: 'Message',
    messagePh: 'How can we help you?',
    submit: 'Submit Inquiry',
    toast: "Message sent — we'll be in touch soon.",

    info: [
      ['chat_bubble', 'WhatsApp Us', 'Instant support for parents and students.', '+971 4 000 0000'],
      ['location_on', 'Office Address', 'Suite 405, Education City,\nSheikh Zayed Road, Dubai, UAE', null],
      ['mail', 'Email Us', 'Our team responds within 24 hours.', 'hello@tariki360.ae'],
    ] as Array<[string, string, string, string | null]>,
    connect: 'Connect With Us',

    mapTitle: 'Dubai International Academic City',
    mapSub: 'Sheikh Zayed Road, Dubai, UAE',
    mapFrameTitle: 'Tariki 360 office location on Google Maps',

    newsletterTitle: 'Stay Updated',
    newsletterSub:
      'Join 5,000+ parents and educators receiving our monthly career insights.',
    newsletterPh: 'Enter your email',
    subscribe: 'Subscribe',
    newsletterThanks: 'Thanks for subscribing!',
  },

  ar: {
    metaTitle: 'تواصل مع طريقي 360',
    metaDescription:
      'تحدث مع فريق طريقي 360 — رسم المسار المهني لأولياء الأمور والطلاب، ودمج المناهج للمدارس، واستفسارات الشراكات في الإمارات ومنطقة الخليج.',

    tag: 'تواصل معنا',
    title: 'لنرسم رحلتك معاً',
    subtitle:
      'سواء كنت طالباً تبحث عن التوجيه أو مدرسة تسعى لتمكين طلابها، فريقنا هنا للمساعدة.',

    routes: [
      ['family_restroom', 'لأولياء الأمور', 'رسم مسار مهني شخصي وإرشادات قبول جامعي مصممة خصيصاً لمشهد الإمارات.'],
      ['school', 'للمدارس', 'أدمج تقييم طريقي 360 في منهجك الدراسي ومكّن طلابك.'],
      ['handshake', 'الشراكات', 'انضم إلى شبكتنا من المؤسسات التعليمية لبناء منظومة شاملة لنمو الشباب.'],
    ] as Array<[string, string, string]>,

    formTitle: 'أرسل لنا رسالة',
    formSubtitle: 'سنرد عليك خلال يوم عمل واحد.',
    fullName: 'الاسم الكامل',
    fullNamePh: 'مثال: سلطان المنصوري',
    email: 'البريد الإلكتروني',
    emailPh: 'sultan@example.com',
    phone: 'رقم الهاتف',
    phonePh: '+971 50 000 0000',
    iAmA: 'أنا…',
    selectRole: 'اختر الصفة',
    roles: ['ولي أمر', 'مسؤول مدرسة', 'مستشار تعليمي', 'طالب'],
    org: 'المؤسسة / المدرسة',
    orgPh: 'اسم المؤسسة',
    country: 'الدولة',
    countries: [
      'الإمارات العربية المتحدة',
      'المملكة العربية السعودية',
      'قطر',
      'الكويت',
      'البحرين',
      'عُمان',
    ],
    prefLang: 'اللغة المفضلة',
    langs: [
      ['en', 'الإنجليزية'],
      ['ar', 'العربية'],
    ] as Array<[string, string]>,
    message: 'الرسالة',
    messagePh: 'كيف يمكننا مساعدتك؟',
    submit: 'إرسال الطلب',
    toast: 'تم إرسال الرسالة — سنتواصل معك قريباً.',

    info: [
      ['chat_bubble', 'تواصل عبر واتساب', 'دعم فوري لأولياء الأمور والطلاب.', '+971 4 000 0000'],
      ['location_on', 'عنوان المكتب', 'مكتب 405، مدينة التعليم،\nشارع الشيخ زايد، دبي، الإمارات', null],
      ['mail', 'راسلنا عبر البريد', 'يرد فريقنا خلال 24 ساعة.', 'hello@tariki360.ae'],
    ] as Array<[string, string, string, string | null]>,
    connect: 'تواصل معنا عبر',

    mapTitle: 'مدينة دبي الأكاديمية العالمية',
    mapSub: 'شارع الشيخ زايد، دبي، الإمارات',
    mapFrameTitle: 'موقع مكتب طريقي 360 على خرائط جوجل',

    newsletterTitle: 'ابقَ على اطلاع',
    newsletterSub:
      'انضم إلى أكثر من 5000 من أولياء الأمور والمعلمين الذين يستلمون رؤانا المهنية الشهرية.',
    newsletterPh: 'أدخل بريدك الإلكتروني',
    subscribe: 'اشترك',
    newsletterThanks: 'شكراً لاشتراكك!',
  },
} satisfies Record<Lang, unknown>;

/** The shape of one language's contact copy, after any Sanity overrides. */
export type ContactCopy = (typeof CONTACT)['en'];
