/**
 * Blog page copy.
 *
 * The article data itself comes from Sanity — this file only holds the
 * surrounding page furniture (headings, labels, empty state) plus the same
 * placeholder articles the old React site shipped, used when Sanity has no
 * posts yet so the page never looks broken.
 */
import type { Lang } from '~/lib/i18n';

export const BLOG = {
  en: {
    metaTitle: 'Blog — Career Guidance, Parenting & Future Skills',
    metaDescription:
      'Practical guidance for parents, students and schools navigating career decisions in a fast-changing world. New articles from the Tariki 360 team every week.',

    heroTag: 'Blog',
    heroTitle: 'Stories, Insights & Advice for the Journey Ahead',
    heroSubtitle:
      'Practical guidance for parents, students, and schools navigating career decisions in a fast-changing world.',

    featuredTag: 'Featured',
    readArticle: 'Read Article',
    latestTitle: 'Latest Articles',
    latestSubtitle: 'Fresh perspectives, every week.',
    allPosts: 'All Posts',
    read: 'Read',
    emptyState: 'No articles published yet — check back soon.',

    newsletterTitle: 'Never Miss an Update',
    newsletterSub:
      'Subscribe to get new articles on career guidance, education trends, and success stories delivered to your inbox.',
    thanks: 'Thanks for subscribing!',
    emailPh: 'you@example.com',
    subscribe: 'Subscribe',
    browseResources: 'Browse Resources',
    startCareerMapping: 'Start Career Mapping',

    /* Used only when Sanity has no posts for this language. */
    fallbackFeatured: {
      badge: 'Career Guidance',
      icon: 'insights',
      title:
        'Why 65% of Students Feel Lost When Choosing a Major — And How to Fix It',
      desc: "A deep dive into the data behind student indecision, and the AI-driven framework that's helping thousands of UAE families turn uncertainty into a clear, confident plan.",
      date: 'Feb 4, 2025',
      read: '8 min read',
      author: 'Dr. Amina Al Farsi',
      authorRole: 'Head of Curriculum, Tariki 360',
      initials: 'AF',
      slug: null as string | null,
    },
    fallbackPosts: [
      { badge: 'Career Guidance', icon: 'route', c: 'lime', title: '5 Signs Your Teen Is Ready to Start Exploring Career Paths', desc: 'Spotting the right moment to introduce career conversations can make all the difference. Here are the signals parents should watch for.', date: 'Jan 28, 2025', read: '5 min read', author: 'Sara Haddad', initials: 'SH', slug: null as string | null },
      { badge: 'Future Skills', icon: 'smart_toy', c: 'green', title: 'How AI Is Reshaping Career Guidance Across the Middle East', desc: 'From psychometric mapping to real-time labour market data, artificial intelligence is making career advice more precise than ever.', date: 'Jan 20, 2025', read: '7 min read', author: 'Dr. Amina Al Farsi', initials: 'AF', slug: null as string | null },
      { badge: 'Parenting', icon: 'family_restroom', c: 'gold', title: 'Marks vs. Direction: Helping Your Child Look Beyond Grades', desc: 'Academic performance tells only part of the story. Discover how to balance grades with genuine interest and aptitude.', date: 'Jan 12, 2025', read: '4 min read', author: 'Layla Mansour', initials: 'LM', slug: null as string | null },
      { badge: 'Education Trends', icon: 'trending_up', c: 'dark', title: 'UAE Education in 2025: The Shift Toward Skills-Based Learning', desc: 'Schools across the region are rethinking curricula to prioritise real-world skills. Here is what it means for students today.', date: 'Dec 30, 2024', read: '6 min read', author: 'Yousef Khan', initials: 'YK', slug: null as string | null },
      { badge: 'Psychology', icon: 'psychology', c: 'red', title: 'The Science Behind Psychometric Career Assessments', desc: 'What actually happens during a career aptitude test, and why the results are more reliable than a gut feeling.', date: 'Dec 18, 2024', read: '5 min read', author: 'Dr. Amina Al Farsi', initials: 'AF', slug: null as string | null },
      { badge: 'Success Story', icon: 'emoji_events', c: 'lime', title: "From Undecided to Unstoppable: Omar's Career Mapping Journey", desc: 'A Grade 12 student in Dubai shares how a 25-minute assessment helped him choose a university major with confidence.', date: 'Dec 5, 2024', read: '3 min read', author: 'Sara Haddad', initials: 'SH', slug: null as string | null },
    ],
  },

  ar: {
    metaTitle: 'المدونة — التوجيه المهني والتربية ومهارات المستقبل',
    metaDescription:
      'إرشادات عملية لأولياء الأمور والطلاب والمدارس في مواجهة قرارات المسار المهني في عالم سريع التغير. مقالات جديدة من فريق طريقي 360 كل أسبوع.',

    heroTag: 'المدونة',
    heroTitle: 'قصص ورؤى ونصائح لرحلتك المقبلة',
    heroSubtitle:
      'إرشادات عملية لأولياء الأمور والطلاب والمدارس في مواجهة قرارات المسار المهني في عالم سريع التغير.',

    featuredTag: 'مميز',
    readArticle: 'قراءة المقال',
    latestTitle: 'أحدث المقالات',
    latestSubtitle: 'وجهات نظر جديدة كل أسبوع.',
    allPosts: 'كل المقالات',
    read: 'قراءة',
    emptyState: 'لا توجد مقالات منشورة بعد — تابعنا قريباً.',

    newsletterTitle: 'لا تفوّت أي تحديث',
    newsletterSub:
      'اشترك لتصلك أحدث المقالات حول التوجيه المهني واتجاهات التعليم وقصص النجاح مباشرة إلى بريدك الإلكتروني.',
    thanks: 'شكراً لاشتراكك!',
    emailPh: 'you@example.com',
    subscribe: 'اشترك',
    browseResources: 'استعرض الموارد',
    startCareerMapping: 'ابدأ رسم مسارك المهني',

    fallbackFeatured: {
      badge: 'التوجيه المهني',
      icon: 'insights',
      title: 'لماذا يشعر 65% من الطلاب بالحيرة عند اختيار التخصص — وكيف يمكن حل ذلك',
      desc: 'نظرة معمّقة على البيانات الكامنة وراء حيرة الطلاب، والإطار المعتمد على الذكاء الاصطناعي الذي يساعد آلاف العائلات في الإمارات على تحويل عدم اليقين إلى خطة واضحة وواثقة.',
      date: '4 فبراير 2025',
      read: '8 دقائق قراءة',
      author: 'د. أمينة الفارسي',
      authorRole: 'رئيسة المناهج، طريقي 360',
      initials: 'AF',
      slug: null as string | null,
    },
    fallbackPosts: [
      { badge: 'التوجيه المهني', icon: 'route', c: 'lime', title: '5 إشارات تدل على استعداد ابنك المراهق لاستكشاف المسارات المهنية', desc: 'تحديد اللحظة المناسبة لبدء الحديث عن المسار المهني قد يُحدث فرقاً كبيراً. هذه هي العلامات التي ينبغي على أولياء الأمور مراقبتها.', date: '28 يناير 2025', read: '5 دقائق قراءة', author: 'سارة حداد', initials: 'SH', slug: null as string | null },
      { badge: 'مهارات المستقبل', icon: 'smart_toy', c: 'green', title: 'كيف يعيد الذكاء الاصطناعي تشكيل التوجيه المهني في الشرق الأوسط', desc: 'من رسم القياسات النفسية إلى بيانات سوق العمل في الوقت الفعلي، يجعل الذكاء الاصطناعي النصائح المهنية أكثر دقة من أي وقت سابق.', date: '20 يناير 2025', read: '7 دقائق قراءة', author: 'د. أمينة الفارسي', initials: 'AF', slug: null as string | null },
      { badge: 'التربية', icon: 'family_restroom', c: 'gold', title: 'الدرجات أم الاتجاه: مساعدة طفلك على النظر إلى ما هو أبعد من العلامات', desc: 'الأداء الأكاديمي يروي جزءاً فقط من القصة. تعرّف على كيفية التوازن بين الدرجات والاهتمام الحقيقي والقدرات.', date: '12 يناير 2025', read: '4 دقائق قراءة', author: 'ليلى منصور', initials: 'LM', slug: null as string | null },
      { badge: 'اتجاهات التعليم', icon: 'trending_up', c: 'dark', title: 'التعليم في الإمارات عام 2025: التحول نحو التعلم القائم على المهارات', desc: 'تعيد المدارس في المنطقة صياغة مناهجها لإعطاء الأولوية للمهارات العملية. هذا ما يعنيه ذلك للطلاب اليوم.', date: '30 ديسمبر 2024', read: '6 دقائق قراءة', author: 'يوسف خان', initials: 'YK', slug: null as string | null },
      { badge: 'علم النفس', icon: 'psychology', c: 'red', title: 'العلم وراء اختبارات القياس النفسي المهني', desc: 'ما الذي يحدث فعلياً أثناء اختبار الميول المهنية، ولماذا تُعد نتائجه أكثر موثوقية من الحدس.', date: '18 ديسمبر 2024', read: '5 دقائق قراءة', author: 'د. أمينة الفارسي', initials: 'AF', slug: null as string | null },
      { badge: 'قصة نجاح', icon: 'emoji_events', c: 'lime', title: 'من الحيرة إلى الانطلاق: رحلة عمر في رسم مساره المهني', desc: 'يشارك طالب في الصف الثاني عشر في دبي كيف ساعده تقييم مدته 25 دقيقة على اختيار تخصصه الجامعي بثقة.', date: '5 ديسمبر 2024', read: '3 دقائق قراءة', author: 'سارة حداد', initials: 'SH', slug: null as string | null },
    ],
  },
} satisfies Record<Lang, unknown>;
