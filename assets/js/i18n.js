/**
 * =============================================================
 *  i18n — الترجمة (عربي / English)
 * =============================================================
 *  اللغة الافتراضية: العربية (RTL)
 *  لإضافة نص جديد: أضفه في القسمين ar و en بنفس المفتاح.
 * =============================================================
 */

export const DEFAULT_LANG = 'ar';
export const LANGS = { ar: { label: 'العربية', dir: 'rtl' }, en: { label: 'English', dir: 'ltr' } };

export const T = {
  ar: {
    /* واجهة عامة */
    'meta.title': 'فايف إم كود هَب — بورتفوليو الفريق',
    'meta.desc': 'فايف إم كود هَب — فريق مطوّرين يبني واجهات برمجية عالية الأداء وأنظمة خلفية وبنية تحتية لخوادم FiveM.',
    'nav.about': 'من نحن',
    'nav.team': 'الفريق',
    'nav.skills': 'المهارات',
    'nav.projects': 'الأعمال',
    'nav.process': 'منهجية العمل',
    'nav.contact': 'تواصل',
    'nav.open': 'فتح القائمة',
    'nav.close': 'إغلاق القائمة',
    'a11y.skip': 'تخطَّ إلى المحتوى',
    'a11y.toTop': 'العودة للأعلى',
    'a11y.langSwitch': 'تغيير اللغة',

    /* الواجهة الرئيسية */
    'hero.badge': 'متاحون لمشاريع جديدة',
    'hero.title.1': 'نبني',
    'hero.title.grad': 'الأنظمة',
    'hero.title.2': 'التي تقف خلف الخوادم.',
    'hero.weAre': 'نحن',
    'hero.lead': 'فايف إم كود هَب فريق صغير بعقلية احترافية، نطلق واجهات برمجية تعمل فعلياً في الإنتاج، وأنظمة خلفية محصّنة، وبنية تحتية لخوادم الألعاب تصمد تحت الضغط.',
    'hero.cta.work': 'شاهد أعمالنا',
    'hero.cta.start': 'ابدأ مشروعك',

    /* من نحن */
    'about.kicker': '٠١ — من نحن',
    'about.title': 'هندسة، لا ارتجال.',
    'about.p1': 'أسّسنا فايف إم كود هَب لأن جزءاً كبيراً من هذا المجال يطلق كوداً يعمل على سيرفر تجريبي ثم ينهار على سيرفر حقيقي. جوابنا بسيط ومملّ بالمعنى الجيد: مخططات قواعد بيانات مدروسة، ونقاط وصول موثّقة، ومعالجة أخطاء حقيقية، ومراقبة من اليوم الأول.',
    'about.p2': 'كل مشروع يمرّ بنفس المسار — استكشاف، ثم تصميم معماري، ثم بناء تدريجي، ثم تحصين. لا صناديق مغلقة ولا تسليم ثم اختفاء. تستلم كوداً مقروءاً وتوثيقاً يخوّلك امتلاكه بالكامل.',
    'about.point1.b': 'جاهز للإنتاج.',
    'about.point1.t': 'مبني للأحمال، ومسجَّل للتتبّع.',
    'about.point2.b': 'موثَّق.',
    'about.point2.t': 'كل نقطة وصول وكل جدول مشروح.',
    'about.point3.b': 'ملكك أنت.',
    'about.point3.t': 'كود نظيف بلا ارتباط بمزوّد.',

    /* الفريق */
    'team.kicker': '٠٢ — الفريق',
    'team.title': 'من يكتب الكود فعلاً.',
    'team.sub': 'صغير عن قصد. كل عضو مسؤول عمّا يطلقه.',
    'team.lead': 'القائد',
    'team.focus': 'التخصص',
    'team.stack': 'الأدوات',
    'team.years': 'سنة',
    'team.copied': 'تم نسخ معرّف ديسكورد',

    /* المهارات */
    'skills.kicker': '٠٣ — المهارات',
    'skills.title': 'ما نستخدمه فعلياً.',
    'skills.sub': 'أدوات نشغّلها في الإنتاج — لا قائمة بأشياء قرأنا عنها.',

    /* الأعمال */
    'projects.kicker': '٠٤ — الأعمال',
    'projects.title': 'أعمال مختارة.',
    'projects.sub': 'نماذج من أنظمة تعمل حالياً في بيئة الإنتاج.',
    'projects.featured': 'مميّز',
    'projects.source': 'الكود',
    'projects.private': 'مستودع خاص',
    'projects.filters': 'تصنيفات الأعمال',

    /* منهجية العمل */
    'process.kicker': '٠٥ — منهجية العمل',
    'process.title': 'كيف يسير المشروع.',

    /* تواصل */
    'contact.kicker': '٠٦ — تواصل',
    'contact.title': 'عندك شيء تبي تبنيه؟',
    'contact.sub': 'اشرح لنا المشكلة والموعد النهائي والقيود. بتوصلك إجابة صريحة عن النطاق والمدة — غالباً خلال ٢٤ ساعة.',
    'form.name': 'الاسم',
    'form.email': 'البريد الإلكتروني',
    'form.subject': 'الموضوع',
    'form.message': 'تفاصيل المشروع',
    'form.send': 'إرسال الرسالة',
    'form.err.name': 'الرجاء إدخال اسمك.',
    'form.err.email': 'الرجاء إدخال بريد إلكتروني صحيح.',
    'form.err.subject': 'الرجاء إدخال الموضوع.',
    'form.err.message': 'الرجاء كتابة ٢٠ حرفاً على الأقل من التفاصيل.',
    'form.err.fix': 'الرجاء تصحيح الحقول المحدّدة.',
    'form.sending': 'جارٍ فتح برنامج البريد لديك…',

    /* التذييل */
    'footer.tag': 'أنظمة مبنية لتبقى تعمل.',
    'footer.rights': 'جميع الحقوق محفوظة.',
  },

  en: {
    'meta.title': 'FiveM Code Hub — Team Portfolio',
    'meta.desc': 'FiveM Code Hub — a collective of developers building high-performance APIs, backend systems, and FiveM infrastructure.',
    'nav.about': 'About',
    'nav.team': 'Team',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'nav.open': 'Open menu',
    'nav.close': 'Close menu',
    'a11y.skip': 'Skip to content',
    'a11y.toTop': 'Back to top',
    'a11y.langSwitch': 'Switch language',

    'hero.badge': 'Available for new projects',
    'hero.title.1': 'We build the',
    'hero.title.grad': 'systems',
    'hero.title.2': 'behind the servers.',
    'hero.weAre': 'We are',
    'hero.lead': 'FiveM Code Hub is a small, senior-minded team shipping production APIs, hardened backends, and game-server infrastructure that actually holds up under load.',
    'hero.cta.work': 'View our work',
    'hero.cta.start': 'Start a project',

    'about.kicker': '01 — About',
    'about.title': 'Engineering, not improvisation.',
    'about.p1': 'We started FiveM Code Hub because too much of this ecosystem ships code that works on a test server and collapses on a real one. Our answer is boring in the best way: designed schemas, documented endpoints, real error handling, and monitoring from day one.',
    'about.p2': 'Every project goes through the same path — discovery, architecture, incremental build, then hardening. No black boxes, no abandoned handovers. You get readable code and the documentation to own it.',
    'about.point1.b': 'Production-first.',
    'about.point1.t': 'Built for load, logged for debugging.',
    'about.point2.b': 'Documented.',
    'about.point2.t': 'Every endpoint and table explained.',
    'about.point3.b': 'Owned by you.',
    'about.point3.t': 'Clean source, no vendor lock-in.',

    'team.kicker': '02 — Team',
    'team.title': 'The people writing the code.',
    'team.sub': 'Small by design. Every member owns what they ship.',
    'team.lead': 'Lead',
    'team.focus': 'Focus',
    'team.stack': 'Stack',
    'team.years': 'yrs',
    'team.copied': 'Discord ID copied',

    'skills.kicker': '03 — Skills',
    'skills.title': 'What we actually use.',
    'skills.sub': 'Tools we run in production — not a list of things we read about.',

    'projects.kicker': '04 — Projects',
    'projects.title': 'Selected work.',
    'projects.sub': 'A sample of systems currently running in production.',
    'projects.featured': 'Featured',
    'projects.source': 'Source',
    'projects.private': 'Private repository',
    'projects.filters': 'Project filters',

    'process.kicker': '05 — Process',
    'process.title': 'How a project runs.',

    'contact.kicker': '06 — Contact',
    'contact.title': 'Have something to build?',
    'contact.sub': "Tell us the problem, the deadline, and the constraints. You'll get an honest answer on scope and timeline — usually within 24 hours.",
    'form.name': 'Name',
    'form.email': 'Email',
    'form.subject': 'Subject',
    'form.message': 'Project details',
    'form.send': 'Send message',
    'form.err.name': 'Please enter your name.',
    'form.err.email': 'Please enter a valid email address.',
    'form.err.subject': 'Please enter a subject.',
    'form.err.message': 'Please give at least 20 characters of detail.',
    'form.err.fix': 'Please fix the highlighted fields.',
    'form.sending': 'Opening your mail client…',

    'footer.tag': 'Systems built to stay up.',
    'footer.rights': 'All rights reserved.',
  },
};

/** الفلاتر مترجمة: المفتاح ثابت (للمنطق) والقيمة معروضة */
export const FILTER_LABELS = {
  ar: { All: 'الكل', API: 'واجهات برمجية', FiveM: 'فايف إم', Security: 'الحماية', Tooling: 'أدوات', Discord: 'ديسكورد' },
  en: { All: 'All', API: 'API', FiveM: 'FiveM', Security: 'Security', Tooling: 'Tooling', Discord: 'Discord' },
};

/** الأرقام العربية الهندية للعرض في الواجهة العربية */
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
export const localizeDigits = (str, lang) =>
  lang === 'ar' ? String(str).replace(/\d/g, (d) => AR_DIGITS[+d]) : String(str);
