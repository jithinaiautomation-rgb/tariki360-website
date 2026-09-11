/** Home page copy, lifted verbatim from the old React Home screen. */
import type { Lang } from '~/lib/i18n';

export type HomeCopy = typeof HOME.en;

export const HOME = {
  en: {
    metaTitle: 'AI-Driven Career Mapping for Students in the UAE',
    metaDescription:
      "Uncover your child's career path with the Middle East's most advanced AI-driven educational assessment. Bilingual, 20–30 minutes, video report.",

    heroTag: 'AI-driven career mapping',
    heroTitleA: 'Is your child choosing a future,',
    heroTitleLead: 'or just',
    heroTitleHl: 'following the crowd?',
    heroSub:
      "Uncover their unique career path through the Middle East's most advanced AI-driven educational assessment — built for the prestige of tomorrow.",
    startMapping: 'Start Career Mapping',
    seeSample: 'See Sample Report',
    heroFeats: [
      ['translate', 'Arabic & English'],
      ['timer', '20–30 min'],
      ['videocam', 'Video Report'],
    ] as Array<[string, string]>,
    hchipA: '94%',
    hchipASub: 'Success Clarity',
    hchipB: 'Video Report',
    hchipBSub: 'Personalised',

    stats: [
      ['94%', 'Success Clarity'],
      ['360°', 'Holistic Profile'],
      ['20–30m', 'Fast Results'],
      ['5,000+', 'Parents Trust Us'],
    ] as Array<[string, string]>,

    quotes: [
      'Marks show performance. Tariki 360 shows direction.',
      'A data-driven future for UAE students.',
      'Bridging the gap between grades and careers.',
    ],

    problemTag: 'The Problem',
    problemTitle:
      'Teenagers are asked to choose careers before understanding themselves.',
    problemBody:
      "The pressure of high-stakes testing often masks a student's true potential. We move beyond academic grades to find the natural alignment between personality, skill, and market demand.",
    problemImgAlt: 'Tariki 360 — turning confusion into clarity',
    insight1Pct: '65%',
    insight1Text: 'of students feel overwhelmed by subject selection.',
    insight2Lead: 'Typical career advice is often',
    insight2Hl: 'outdated',
    insight2Trail: 'by the time they graduate.',

    featuresTag: 'What Tariki 360 gives you',
    featuresTitle: 'Tailored paths for the three pillars of education.',
    featuresSub:
      'From self-understanding to a structured plan — for students, parents, and schools.',
    forStudentsLbl: 'For Students',
    discoverDna: 'Discover your Career DNA',
    feats: [
      ['target', 'Your Top Career Matches', 'Career areas that align with your unique strengths.'],
      ['menu_book', 'Your Ideal Subject Streams', 'The exact high-school subjects to stay on track.'],
      ['lightbulb', 'Your Strength Breakdown', 'A map of your innate skills, talents, and growth areas.'],
      ['description', 'Detailed PDF Report', 'A shareable report you and your parents can revisit.'],
      ['videocam', 'Video-Based Report', 'Results explained simply and engagingly in a video.'],
      ['smart_toy', 'AI Career Counsellor', 'Instant answers to your career questions, anytime.'],
    ] as Array<[string, string, string]>,

    forParentsTitle: 'For Parents',
    forParentsBody:
      "Make informed decisions with less stress and better family conversations about your child's future.",
    forParentsList: [
      'Actionable insight reports',
      'Investment clarity for tuition',
      'Peace of mind for the future',
    ],
    trustedBy: 'Trusted by 5,000+ parents',

    forSchoolsTitle: 'For Schools',
    forSchoolsBody:
      'Equip your school with the power of AI-driven career mapping. Our Institutional Career Assessment program is designed for seamless group implementation — giving educators deep insights into student potential at both the individual and classroom level.',
    bookSchoolDemo: 'Book a School Demo',
    schoolFeatures: [
      ['desktop_windows', 'Dedicated Admin Portal', 'Manage student cohorts with ease'],
      ['analytics', 'Batch-Wise Analytics', 'Compare performance across classes'],
      ['monitoring', 'Visual Group Dashboard', 'Real-time progress tracking'],
    ] as Array<[string, string, string]>,

    appUrlLabel: 'app.tariki360.com/report',
    aiCounsellorTitle: 'AI Career Counsellor',
    aiCounsellorSub: 'Available 24/7 · Arabic & English',
    instantAccess: 'Instant Access',
    studentImgAlt: 'Student pointing to career report',

    journeyTag: 'How it works',
    journeyTitle: 'Your journey to clarity',
    journey: [
      { n: 'person', num: 1, t: 'Registration', d: 'Create a profile and select your regional curriculum.' },
      { n: 'psychology', num: 2, t: 'Assessment', d: 'Engaging 25-minute psychometric & skill mapping.' },
      { n: 'hub', num: 3, t: 'AI Processing', d: 'Our engine maps results against global industry trends.' },
      { n: 'play_circle', num: 4, t: 'Video Report', d: 'Instant access to your personalized pathway video.' },
      { n: 'smart_toy', num: 5, t: 'Virtual AI Mentor', d: 'Chat anytime with your AI mentor for ongoing, personalised guidance.' },
    ],

    reportTag: 'The Report',
    reportTitle: "The Report Parents Can't Put Down",
    reportBody:
      "We don't just give you a PDF. We give you a cinematic experience of your child's potential.",
    reportItems: [
      ['play_circle', 'Video report screen'],
      ['description', 'Downloadable PDF preview'],
      ['map', 'Career pathway card'],
      ['psychology', 'Strength mapping card'],
    ] as Array<[string, string]>,
    careerDnaProfile: 'Career DNA Profile',
    careerDnaTags: ['Creative Thinking', 'Systems Design', 'Leadership', 'Analytics'],
    topCareerMatches: 'Top Career Matches',
    topCareerList: [
      ['UX / Product Designer', '98%'],
      ['Data Scientist', '94%'],
      ['Architect', '91%'],
    ] as Array<[string, string]>,
    strengthBreakdown: 'Strength Breakdown',
    strengthList: [
      ['Creativity', '85%'],
      ['Logic', '78%'],
      ['Empathy', '92%'],
      ['Focus', '71%'],
    ] as Array<[string, string]>,

    counselorSuiteTag: 'For Schools',
    counselorSuiteTitle: 'School Counselor Suite',
    studentAnalytics: 'Student Analytics',
    studentAnalyticsSub: 'Real-time cohort insights',
    counselorSuiteItems: ['Engagement Heatmap', 'Career Trends Report'],
    requestPartnerDemo: 'Request Partner Demo',
    cohortOverview: 'Cohort Overview',
    liveTag: 'Live',
    cohortStats: [
      ['142', 'Students'],
      ['89%', 'Completed'],
      ['34', 'Schools'],
    ] as Array<[string, string]>,
    careerInterestDist: 'Career Interest Distribution',
    careerInterestList: [
      ['Engineering & Tech', '72%'],
      ['Business', '54%'],
      ['Creative Arts', '41%'],
      ['Healthcare', '38%'],
    ] as Array<[string, string]>,

    successTag: 'Success Stories',
    successTitle: 'Real journeys, real clarity',
    successSub:
      'Hear directly from students, parents, and educators who found their path with Tariki 360.',
    videoTestimonialsTitle: 'Video Testimonials',

    faqTag: 'FAQ',
    faqTitle: 'Frequently asked questions',
    faqs: [
      ['How long does the assessment take?', 'The core psychometric assessment takes approximately 20–30 minutes and can be taken on any device.'],
      ['Is it available in Arabic?', 'Yes — the entire platform, assessment, and final report are available in both Arabic and English.'],
      ['What age group is this for?', 'We cater to students aged 13–18, focusing on middle and high school transitions.'],
    ] as Array<[string, string]>,

    ctaTitle: 'Ready to help your child choose with clarity?',
    ctaBody:
      "Join thousands of families in the UAE who have discovered their child's path to success.",
    ctaStart: 'Start Mapping Now',
    ctaSchoolDemo: 'Book a School Demo',
    ctaImgAlt: 'Choose your path with Tariki 360',

    fallbackTestimonials: [
      {
        name: 'Omar A.',
        role: 'Grade 12 Student, Dubai',
        initials: 'OA',
        quote:
          '"The clarity I gained from Tariki 360 didn\'t just help me choose a major; it gave my family peace of mind and a roadmap we all believe in."',
      },
      {
        name: 'Dr. Sarah L.',
        role: 'Career Counselor, Abu Dhabi',
        initials: 'SL',
        quote:
          '"It transformed our counseling department from reactive to proactive. We now have a precise navigation system for every student\'s journey."',
      },
      {
        name: 'Fatima R.',
        role: 'Parent, Sharjah',
        initials: 'FR',
        quote:
          '"For the first time, my daughter\'s career conversation wasn\'t a debate — it was backed by real data we could all agree on."',
      },
    ],
    fallbackVideoTestimonials: [
      { name: 'Yusuf K.', role: 'Grade 11 Student, Abu Dhabi' },
      { name: 'Layla M.', role: 'Parent, Dubai' },
      { name: 'Mr. Hassan T.', role: 'Principal, Sharjah' },
    ],
    fallbackHomeVideo: {
      sectionHeading: "Watch your child's path come to life.",
      badgeLabel: 'Career DNA Report',
      captionTitle: 'Your Career Pathway Report',
      captionSubtitle: 'Personalised · 3 min · AI-generated',
      careerTags: ['UX Designer', 'Data Analyst', 'Architect'],
      videoUrl: null as string | null,
      posterUrl: null as string | null,
    },
  },

  ar: {
    metaTitle: 'تخطيط المسار المهني بالذكاء الاصطناعي لطلاب الإمارات',
    metaDescription:
      'اكشف المسار المهني الفريد لطفلك من خلال أكثر تقييم تعليمي تطوراً في الشرق الأوسط مدعوم بالذكاء الاصطناعي. بلغتين، من 20 إلى 30 دقيقة، مع تقرير فيديو مخصص.',

    heroTag: 'تخطيط مهني مدعوم بالذكاء الاصطناعي',
    heroTitleA: 'هل يختار طفلك مستقبله،',
    // Intentionally empty: the Arabic highlighted phrase already begins with
    // "أم". The React site had both, so the headline read "أم أم يسير…".
    heroTitleLead: '',
    heroTitleHl: 'أم يسير مع التيار فقط؟',
    heroSub:
      'اكشف مساره المهني الفريد من خلال أكثر تقييم تعليمي تطوراً في الشرق الأوسط مدعوم بالذكاء الاصطناعي — مصمم لرقيّ الغد.',
    startMapping: 'ابدأ التخطيط المهني',
    seeSample: 'شاهد نموذج التقرير',
    heroFeats: [
      ['translate', 'العربية والإنجليزية'],
      ['timer', '20–30 دقيقة'],
      ['videocam', 'تقرير بالفيديو'],
    ] as Array<[string, string]>,
    hchipA: '94%',
    hchipASub: 'وضوح النجاح',
    hchipB: 'تقرير بالفيديو',
    hchipBSub: 'مخصص لك',

    stats: [
      ['94%', 'وضوح النجاح'],
      ['360°', 'ملف شامل'],
      ['20–30 د', 'نتائج سريعة'],
      ['+5,000', 'ولي أمر يثقون بنا'],
    ] as Array<[string, string]>,

    quotes: [
      'الدرجات تُظهر الأداء. طريقي 360 يُظهر الاتجاه.',
      'مستقبل قائم على البيانات لطلاب الإمارات.',
      'سدّ الفجوة بين الدرجات والمسارات المهنية.',
    ],

    problemTag: 'المشكلة',
    problemTitle: 'يُطلب من المراهقين اختيار مساراتهم المهنية قبل أن يفهموا أنفسهم.',
    problemBody:
      'غالباً ما يحجب ضغط الاختبارات المصيرية القدرات الحقيقية للطالب. نحن نتجاوز الدرجات الأكاديمية للعثور على التوافق الطبيعي بين الشخصية والمهارة وطلب السوق.',
    problemImgAlt: 'طريقي 360 — من الحيرة إلى الوضوح',
    insight1Pct: '65%',
    insight1Text: 'من الطلاب يشعرون بالإرهاق عند اختيار المواد الدراسية.',
    insight2Lead: 'غالباً ما تكون النصائح المهنية التقليدية',
    insight2Hl: 'قديمة',
    insight2Trail: 'بحلول وقت تخرجهم.',

    featuresTag: 'ما يقدمه لك طريقي 360',
    featuresTitle: 'مسارات مصممة خصيصاً لأركان التعليم الثلاثة.',
    featuresSub: 'من فهم الذات إلى خطة منظمة — للطلاب وأولياء الأمور والمدارس.',
    forStudentsLbl: 'للطلاب',
    discoverDna: 'اكتشف حمضك المهني',
    feats: [
      ['target', 'أفضل المسارات المهنية لك', 'مجالات مهنية تتوافق مع نقاط قوتك الفريدة.'],
      ['menu_book', 'مساراتك الدراسية المثالية', 'المواد الدراسية الدقيقة التي تضمن بقاءك على المسار الصحيح.'],
      ['lightbulb', 'تحليل نقاط قوتك', 'خريطة لمهاراتك الفطرية ومواهبك ومجالات نموك.'],
      ['description', 'تقرير PDF تفصيلي', 'تقرير قابل للمشاركة يمكنك ووالديك الرجوع إليه.'],
      ['videocam', 'تقرير بالفيديو', 'نتائج مُفسّرة بطريقة سهلة وجذابة عبر الفيديو.'],
      ['smart_toy', 'مرشد مهني بالذكاء الاصطناعي', 'إجابات فورية على أسئلتك المهنية، في أي وقت.'],
    ] as Array<[string, string, string]>,

    forParentsTitle: 'لأولياء الأمور',
    forParentsBody:
      'اتخذوا قرارات مدروسة بضغط أقل ومحادثات عائلية أفضل حول مستقبل طفلكم.',
    forParentsList: [
      'تقارير برؤى قابلة للتنفيذ',
      'وضوح في الاستثمار للرسوم الدراسية',
      'راحة بال بشأن المستقبل',
    ],
    trustedBy: 'موثوق به من أكثر من 5,000 ولي أمر',

    forSchoolsTitle: 'للمدارس',
    forSchoolsBody:
      'زوّد مدرستك بقوة التخطيط المهني المدعوم بالذكاء الاصطناعي. برنامج التقييم المهني المؤسسي لدينا مصمم للتطبيق الجماعي السلس — مما يمنح المعلمين رؤى عميقة حول إمكانات الطلاب على المستوى الفردي ومستوى الفصل.',
    bookSchoolDemo: 'احجز عرضاً تجريبياً للمدرسة',
    schoolFeatures: [
      ['desktop_windows', 'بوابة إدارية مخصصة', 'إدارة مجموعات الطلاب بسهولة'],
      ['analytics', 'تحليلات لكل دفعة', 'مقارنة الأداء بين الفصول'],
      ['monitoring', 'لوحة بيانات جماعية مرئية', 'تتبع التقدم في الوقت الفعلي'],
    ] as Array<[string, string, string]>,

    appUrlLabel: 'app.tariki360.com/report',
    aiCounsellorTitle: 'مرشد مهني بالذكاء الاصطناعي',
    aiCounsellorSub: 'متاح على مدار الساعة · العربية والإنجليزية',
    instantAccess: 'وصول فوري',
    studentImgAlt: 'طالب يشير إلى تقرير المسار المهني',

    journeyTag: 'كيف تعمل المنصة',
    journeyTitle: 'رحلتك نحو الوضوح',
    journey: [
      { n: 'person', num: 1, t: 'التسجيل', d: 'أنشئ ملفك الشخصي واختر منهجك الدراسي الإقليمي.' },
      { n: 'psychology', num: 2, t: 'التقييم', d: 'تقييم نفسي وتحليل مهارات تفاعلي يستغرق 25 دقيقة.' },
      { n: 'hub', num: 3, t: 'معالجة الذكاء الاصطناعي', d: 'يقارن محركنا نتائجك باتجاهات الصناعة العالمية.' },
      { n: 'play_circle', num: 4, t: 'تقرير الفيديو', d: 'وصول فوري إلى فيديو مسارك المهني الشخصي.' },
      { n: 'smart_toy', num: 5, t: 'مرشد الذكاء الاصطناعي', d: 'تحدث في أي وقت مع مرشدك الذكي للحصول على توجيه شخصي مستمر.' },
    ],

    reportTag: 'التقرير',
    reportTitle: 'التقرير الذي لن يستطيع أولياء الأمور تركه',
    reportBody: 'نحن لا نقدم لك ملف PDF فقط. نقدم لك تجربة سينمائية لإمكانات طفلك.',
    reportItems: [
      ['play_circle', 'شاشة تقرير الفيديو'],
      ['description', 'معاينة ملف PDF قابل للتحميل'],
      ['map', 'بطاقة المسار المهني'],
      ['psychology', 'بطاقة تحليل نقاط القوة'],
    ] as Array<[string, string]>,
    careerDnaProfile: 'ملف الحمض المهني',
    careerDnaTags: ['التفكير الإبداعي', 'تصميم الأنظمة', 'القيادة', 'التحليل'],
    topCareerMatches: 'أفضل المسارات المهنية المطابقة',
    topCareerList: [
      ['مصمم منتجات / تجربة المستخدم', '98%'],
      ['عالم بيانات', '94%'],
      ['مهندس معماري', '91%'],
    ] as Array<[string, string]>,
    strengthBreakdown: 'تحليل نقاط القوة',
    strengthList: [
      ['الإبداع', '85%'],
      ['المنطق', '78%'],
      ['التعاطف', '92%'],
      ['التركيز', '71%'],
    ] as Array<[string, string]>,

    counselorSuiteTag: 'للمدارس',
    counselorSuiteTitle: 'منصة المرشد المدرسي',
    studentAnalytics: 'تحليلات الطلاب',
    studentAnalyticsSub: 'رؤى فورية للمجموعات',
    counselorSuiteItems: ['خريطة حرارية للتفاعل', 'تقرير اتجاهات المسارات المهنية'],
    requestPartnerDemo: 'طلب عرض تجريبي للشركاء',
    cohortOverview: 'نظرة عامة على المجموعة',
    liveTag: 'مباشر',
    cohortStats: [
      ['142', 'طالب'],
      ['89%', 'نسبة الإكمال'],
      ['34', 'مدرسة'],
    ] as Array<[string, string]>,
    careerInterestDist: 'توزيع الاهتمامات المهنية',
    careerInterestList: [
      ['الهندسة والتقنية', '72%'],
      ['الأعمال', '54%'],
      ['الفنون الإبداعية', '41%'],
      ['الرعاية الصحية', '38%'],
    ] as Array<[string, string]>,

    successTag: 'قصص النجاح',
    successTitle: 'رحلات حقيقية، وضوح حقيقي',
    successSub:
      'استمع مباشرة إلى الطلاب وأولياء الأمور والمعلمين الذين وجدوا مسارهم مع طريقي 360.',
    videoTestimonialsTitle: 'شهادات بالفيديو',

    faqTag: 'الأسئلة الشائعة',
    faqTitle: 'الأسئلة المتكررة',
    faqs: [
      ['كم تستغرق مدة التقييم؟', 'يستغرق التقييم النفسي الأساسي حوالي 20–30 دقيقة ويمكن إجراؤه على أي جهاز.'],
      ['هل هو متوفر باللغة العربية؟', 'نعم — المنصة بأكملها والتقييم والتقرير النهائي متوفرة باللغتين العربية والإنجليزية.'],
      ['لأي فئة عمرية هذا البرنامج؟', 'نخدم الطلاب من عمر 13 إلى 18 عاماً، مع التركيز على مراحل الانتقال في المدرسة المتوسطة والثانوية.'],
    ] as Array<[string, string]>,

    ctaTitle: 'هل أنت مستعد لمساعدة طفلك على الاختيار بوضوح؟',
    ctaBody: 'انضم إلى آلاف العائلات في الإمارات التي اكتشفت مسار طفلها نحو النجاح.',
    ctaStart: 'ابدأ التخطيط الآن',
    ctaSchoolDemo: 'احجز عرضاً تجريبياً للمدرسة',
    ctaImgAlt: 'اختر مسارك مع طريقي 360',

    fallbackTestimonials: [
      {
        name: 'عمر أ.',
        role: 'طالب الصف الثاني عشر، دبي',
        initials: 'عأ',
        quote:
          '"الوضوح الذي حصلت عليه من طريقي 360 لم يساعدني فقط في اختيار التخصص؛ بل أعطى عائلتي راحة بال وخارطة طريق نؤمن بها جميعاً."',
      },
      {
        name: 'د. سارة ل.',
        role: 'مستشارة مهنية، أبوظبي',
        initials: 'سل',
        quote:
          '"حوّل قسم التوجيه لدينا من رد الفعل إلى الاستباقية. لدينا الآن نظام توجيه دقيق لرحلة كل طالب."',
      },
      {
        name: 'فاطمة ر.',
        role: 'ولية أمر، الشارقة',
        initials: 'فر',
        quote:
          '"للمرة الأولى، لم يكن الحديث عن مستقبل ابنتي المهني نقاشاً جدلياً — بل كان مدعوماً ببيانات حقيقية اتفقنا عليها جميعاً."',
      },
    ],
    fallbackVideoTestimonials: [
      { name: 'يوسف ك.', role: 'طالب الصف الحادي عشر، أبوظبي' },
      { name: 'ليلى م.', role: 'ولية أمر، دبي' },
      { name: 'الأستاذ حسن ت.', role: 'مدير مدرسة، الشارقة' },
    ],
    fallbackHomeVideo: {
      sectionHeading: 'شاهد مستقبل طفلك يتجسد أمام عينيك.',
      badgeLabel: 'تقرير الحمض المهني',
      captionTitle: 'تقرير مسارك المهني',
      captionSubtitle: 'مخصص · 3 دقائق · بالذكاء الاصطناعي',
      careerTags: ['مصمم تجربة المستخدم', 'محلل بيانات', 'مهندس معماري'],
      videoUrl: null as string | null,
      posterUrl: null as string | null,
    },
  },
} satisfies Record<Lang, unknown>;
