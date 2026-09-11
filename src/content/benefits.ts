/** Benefits page copy, lifted from the old React Benefits screen. */
import type { Lang } from '~/lib/i18n';

export const BENEFITS = {
  en: {
    metaTitle: 'Benefits for Students, Parents & Schools',
    metaDescription:
      'Real strengths for students, calmer decisions for parents, and cohort-wide insight for schools — how Tariki 360 turns self-understanding into direction.',

    heroTag: 'Transforming Futures',
    heroTitle: 'Every student deserves a clear path forward',
    heroSubtitle:
      'Tariki 360 turns self-understanding into structured direction — for students, parents, and the institutions that guide them.',
    startAssessment: 'Start Assessment',
    institutionalDemo: 'Institutional Demo',
    heroImgAlt: 'Student celebrating career clarity',
    stats: [
      ['20–30m', 'Fast Results'],
      ['360°', 'Holistic Profile'],
      ['3-in-1', 'Cognitive · Emotional · Skill'],
    ] as Array<[string, string]>,

    benefitsTag: 'Benefits',
    benefitsTitle: 'Empowering Every Stakeholder',
    benefitsSubtitle:
      "Whether you're navigating your own path or managing a thousand, Tariki 360 provides the clarity needed to excel.",

    aiFeatureTag: 'Premium AI Feature',
    aiMentorTitle: 'Your AI Career Mentor',
    aiMentorDesc:
      'A specialized educational companion that understands regional job markets and global university landscapes, available at the touch of a button.',
    aiMentorImgAlt: 'AI Career Mentor',
    aiMentorFeatures: [
      ['translate', 'Bilingual Support (Arabic & English)'],
      ['update', '24/7 Real-time Pathway Refinement'],
    ] as Array<[string, string]>,

    forStudents: 'For Students',
    studentCards: [
      ['explore', 'Know Your Real Strengths', 'Uncover latent talents beyond standard grades through our 360° mapping algorithm.'],
      ['school', 'Understand Subject Fit', 'See direct correlations between your unique personality and global academic curriculums.'],
      ['verified', 'Gain True Confidence', 'Enter interviews and university applications knowing exactly what makes you unique.'],
      ['auto_graph', 'Plan Your Skillset', 'Identify profile gaps early and receive actionable steps to bridge them before graduation.'],
    ] as Array<[string, string, string]>,

    forParents: 'For Parents',
    parentCards: [
      ['chat_bubble', 'Better Conversations', "Transition from questioning to collaborating on your child's future path with data."],
      ['visibility', 'Reveal Potential', "See the objective evidence behind your child's interests and cognitive capabilities."],
      ['payments', 'Informed Investments', 'Direct your resources toward the right education and extracurriculars based on evidence.'],
      ['spa', 'Reduce Family Stress', 'Neutralize high-stakes anxiety with a clear, objective roadmap and shared goals.'],
    ] as Array<[string, string, string]>,

    transformationTag: 'Transformation',
    transformationTitle: 'Before & after Tariki 360',
    transformationSubtitle: 'The journey from confusion to crystal-clear direction.',
    beforeLabel: 'The chaos (before)',
    afterLabel: 'The clarity (after)',
    before: [
      ['Random Advice', 'Conflicting suggestions from social media, trends, and peer pressure.'],
      ['Family Tension', 'Conflict caused by unmet expectations and a lack of clarity.'],
      ['Subject Indecision', 'Choosing high-stakes courses based on popularity, not talent.'],
    ] as Array<[string, string]>,
    after: [
      ['Evidence-Based Insight', 'A scientific roadmap built on validated cognitive and emotional data.'],
      ['Harmonious Dialogue', 'Constructive future planning based on mutual understanding.'],
      ['Purposeful Education', 'Subjects that lead directly to fulfilling career success.'],
    ] as Array<[string, string]>,

    instTag: 'For Institutions',
    instTitle: 'Empower your school with data-driven guidance.',
    instSubtitle:
      'Give counselors the tools to understand entire cohorts at a glance and provide high-fidelity advice at scale.',
    instList: [
      'Standardize guidance quality institution-wide.',
      'Improve student university placement rates.',
      'Automated reporting for accreditation reviews.',
    ],
    requestAccess: 'Request Institutional Access',
    grid: [
      ['dashboard', 'Institutional Dashboard', 'Real-time overview of all student progress and assessment status.'],
      ['leaderboard', 'Cohort Analytics', 'Identify trends in interests and skills across grade levels.'],
      ['groups', 'Counseling Support', 'Visual data to facilitate high-stakes family discussions.'],
      ['picture_as_pdf', 'Smart Profiles', 'Data-backed student profiles for university transcripts.'],
      ['download', 'Downloadable Reports', 'Professional reports ready for accreditation reviews.'],
      ['language', 'Arabic & English Ready', 'A fully localized experience for every school.'],
    ] as Array<[string, string, string]>,
  },

  ar: {
    metaTitle: 'المزايا للطلاب وأولياء الأمور والمدارس',
    metaDescription:
      'كيف يحوّل طريقي 360 فهم الذات إلى توجيه منظم — نقاط قوة حقيقية للطلاب، وقرارات أهدأ لأولياء الأمور، ورؤى شاملة للمدارس.',

    heroTag: 'نحوّل المستقبل',
    heroTitle: 'كل طالب يستحق مساراً واضحاً نحو المستقبل',
    heroSubtitle:
      'يحوّل طريقي 360 فهمك لذاتك إلى توجيه منظم — للطلاب وأولياء الأمور والمؤسسات التي ترشدهم.',
    startAssessment: 'بدء التقييم',
    institutionalDemo: 'عرض توضيحي للمؤسسات',
    heroImgAlt: 'طالبة تحتفل بوضوح مسارها المهني',
    stats: [
      ['20–30 دقيقة', 'نتائج سريعة'],
      ['360°', 'ملف شامل'],
      ['3 في 1', 'معرفي · عاطفي · مهاري'],
    ] as Array<[string, string]>,

    benefitsTag: 'الفوائد',
    benefitsTitle: 'تمكين كل صاحب مصلحة',
    benefitsSubtitle:
      'سواء كنت تشق طريقك الخاص أو تدير ألف طريق، يوفر طريقي 360 الوضوح اللازم للتميز.',

    aiFeatureTag: 'ميزة ذكاء اصطناعي مميزة',
    aiMentorTitle: 'مرشدك المهني بالذكاء الاصطناعي',
    aiMentorDesc:
      'مرافق تعليمي متخصص يفهم أسواق العمل الإقليمية ومشهد الجامعات العالمية، متاح بضغطة زر.',
    aiMentorImgAlt: 'المرشد المهني بالذكاء الاصطناعي',
    aiMentorFeatures: [
      ['translate', 'دعم ثنائي اللغة (العربية والإنجليزية)'],
      ['update', 'تحسين المسار في الوقت الفعلي على مدار الساعة'],
    ] as Array<[string, string]>,

    forStudents: 'للطلاب',
    studentCards: [
      ['explore', 'تعرّف على نقاط قوتك الحقيقية', 'اكشف عن المواهب الكامنة بعيداً عن الدرجات التقليدية من خلال خوارزمية رسمنا الشاملة 360°.'],
      ['school', 'فهم التوافق مع المواد الدراسية', 'اطّلع على العلاقة المباشرة بين شخصيتك الفريدة والمناهج الأكاديمية العالمية.'],
      ['verified', 'اكتسب ثقة حقيقية', 'دخول المقابلات وطلبات الالتحاق بالجامعات بمعرفة دقيقة لما يميزك.'],
      ['auto_graph', 'خطط لمهاراتك', 'حدد الفجوات في ملفك الشخصي مبكراً واحصل على خطوات عملية لتجاوزها قبل التخرج.'],
    ] as Array<[string, string, string]>,

    forParents: 'لأولياء الأمور',
    parentCards: [
      ['chat_bubble', 'محادثات أفضل', 'تحوّل من التساؤل إلى التعاون في رسم مستقبل طفلك بالاعتماد على البيانات.'],
      ['visibility', 'اكتشاف الإمكانات', 'شاهد الأدلة الموضوعية وراء اهتمامات طفلك وقدراته المعرفية.'],
      ['payments', 'استثمارات مدروسة', 'وجّه مواردك نحو التعليم والأنشطة اللامنهجية المناسبة بناءً على الأدلة.'],
      ['spa', 'تقليل ضغوط الأسرة', 'تخفيف القلق المرتبط بالقرارات المصيرية بخارطة طريق واضحة وموضوعية وأهداف مشتركة.'],
    ] as Array<[string, string, string]>,

    transformationTag: 'التحول',
    transformationTitle: 'قبل وبعد طريقي 360',
    transformationSubtitle: 'الرحلة من الحيرة إلى الوضوح التام.',
    beforeLabel: 'الفوضى (قبل)',
    afterLabel: 'الوضوح (بعد)',
    before: [
      ['نصائح عشوائية', 'اقتراحات متضاربة من وسائل التواصل الاجتماعي والاتجاهات وضغط الأصدقاء.'],
      ['توتر عائلي', 'خلافات ناتجة عن توقعات غير محققة وغياب الوضوح.'],
      ['تردد في اختيار المواد', 'اختيار مواد مصيرية بناءً على الشعبية لا الموهبة.'],
    ] as Array<[string, string]>,
    after: [
      ['رؤية مبنية على الأدلة', 'خارطة طريق علمية مبنية على بيانات معرفية وعاطفية موثقة.'],
      ['حوار متناغم', 'تخطيط بنّاء للمستقبل يقوم على التفاهم المتبادل.'],
      ['تعليم هادف', 'مواد دراسية تقود مباشرة إلى نجاح مهني مُرضٍ.'],
    ] as Array<[string, string]>,

    instTag: 'للمؤسسات',
    instTitle: 'مكّن مدرستك بإرشاد مبني على البيانات.',
    instSubtitle:
      'زوّد المرشدين بالأدوات اللازمة لفهم الدفعات بأكملها بنظرة واحدة وتقديم نصائح دقيقة على نطاق واسع.',
    instList: [
      'توحيد جودة الإرشاد على مستوى المؤسسة.',
      'تحسين معدلات قبول الطلاب في الجامعات.',
      'تقارير تلقائية لمراجعات الاعتماد الأكاديمي.',
    ],
    requestAccess: 'طلب الوصول للمؤسسات',
    grid: [
      ['dashboard', 'لوحة بيانات المؤسسة', 'نظرة شاملة في الوقت الفعلي على تقدم جميع الطلاب وحالة التقييمات.'],
      ['leaderboard', 'تحليلات الدفعات', 'تحديد الاتجاهات في الاهتمامات والمهارات على مستوى الصفوف الدراسية.'],
      ['groups', 'دعم الإرشاد', 'بيانات بصرية لتسهيل النقاشات العائلية المصيرية.'],
      ['picture_as_pdf', 'ملفات شخصية ذكية', 'ملفات طلابية مبنية على البيانات لاستخدامها في السجلات الجامعية.'],
      ['download', 'تقارير قابلة للتحميل', 'تقارير مهنية جاهزة لمراجعات الاعتماد الأكاديمي.'],
      ['language', 'جاهز بالعربية والإنجليزية', 'تجربة محلية بالكامل لكل مدرسة.'],
    ] as Array<[string, string, string]>,
  },
} satisfies Record<Lang, unknown>;
