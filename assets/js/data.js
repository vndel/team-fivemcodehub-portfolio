/**
 * =============================================================
 *  SITE DATA  —  هذا هو الملف الوحيد الذي تعدّله لإضافة محتوى
 * =============================================================
 *  كل نص قابل للترجمة يُكتب ككائن: { ar: '…', en: '…' }
 *
 *  لإضافة عضو جديد: أضف كائناً جديداً داخل مصفوفة TEAM.
 *  لإضافة مشروع:    أضف كائناً جديداً داخل مصفوفة PROJECTS.
 * =============================================================
 */

export const SITE = {
  name: 'FiveM Code Hub',
  domain: 'team.fivemcodehub.com',
  email: '777m@vndel.com',
};

/** الأدوار التي تُكتب تلقائياً في الواجهة الرئيسية */
export const HERO_ROLES = {
  ar: ['مطوّرو واجهات برمجية', 'مهندسو أنظمة خلفية', 'مختصّو فايف إم', 'معماريو أنظمة'],
  en: ['API Developers', 'Backend Engineers', 'FiveM Specialists', 'System Architects'],
};

export const STATS = [
  { value: 22, suffix: '+', label: { ar: 'مشروع منجز', en: 'Projects Shipped' } },
  { value: 12, suffix: '+', label: { ar: 'نظام في الإنتاج', en: 'Systems in Production' } },
  { value: 99, suffix: '.9%', label: { ar: 'نسبة التشغيل', en: 'Uptime Delivered' } },
  { value: 6,  suffix: '+', label: { ar: 'سنوات خبرة', en: 'Years of Experience' } },
];

/* ============================== TEAM ============================== */

export const TEAM = [
  {
    name: { ar: 'محمد نفيس', en: 'Mohammed Nafees' },
    role: { ar: 'مطوّر واجهات برمجية وعلوم حاسب', en: 'API & Computer Science Developer' },
    age: 21,
    location: { ar: 'سوريا', en: 'Syria' },
    // صورة ديسكورد — تُجلب مباشرة من CDN الخاص بديسكورد
    avatar: 'https://cdn.discordapp.com/avatars/398520151236149249/eae453267f7cca2cc6395d6b01e5a940.png?size=256',
    initials: 'MN',
    accent: 'violet',
    bio: {
      ar: 'مؤسّس فايف إم كود هَب. متخصّص في تصميم الواجهات البرمجية والأنظمة الخلفية المحصّنة وأدوات المطوّرين. يحوّل المتطلبات المعقّدة إلى خدمات نظيفة وموثّقة وجاهزة للإنتاج.',
      en: 'Founder of FiveM Code Hub. Focused on API architecture, secure backend systems, and developer tooling. Turns complex requirements into clean, documented, production-ready services.',
    },
    focus: {
      ar: ['واجهات REST والزمن الحقيقي', 'معمارية الأنظمة الخلفية', 'أنظمة مكافحة الغش'],
      en: ['REST & Realtime APIs', 'Backend Architecture', 'Anti-Cheat Systems'],
    },
    stack: ['JavaScript', 'TypeScript', 'Node.js', 'Lua', 'MySQL', 'Express', 'EJS', 'Docker'],
    socials: {
      github: 'https://github.com/vndel',
      discord: '398520151236149249',
      email: 'mailto:777m@vndel.com',
    },
    lead: true,
  },
  /*
   * ── قالب لإضافة عضو جديد ─────────────────────────────────────
   * {
   *   name: { ar: 'الاسم', en: 'Full Name' },
   *   role: { ar: 'الدور', en: 'Role Title' },
   *   age: 22,
   *   location: { ar: 'الدولة', en: 'Country' },
   *   initials: 'FN',
   *   accent: 'cyan',            // violet | cyan | pink | amber | lime
   *   bio: { ar: '…', en: '…' },
   *   focus: { ar: ['…'], en: ['…'] },
   *   stack: ['Node.js'],
   *   socials: { github: '#', discord: 'USER_ID', email: 'mailto:' },
   * },
   */
];

/* ============================= SKILLS ============================= */

export const SKILLS = [
  {
    category: { ar: 'الأنظمة الخلفية والواجهات البرمجية', en: 'Backend & APIs' },
    icon: 'server',
    accent: 'violet',
    items: [
      { name: { ar: 'Node.js / Express', en: 'Node.js / Express' }, level: 92 },
      { name: { ar: 'واجهات REST و WebSocket', en: 'REST & WebSocket APIs' }, level: 90 },
      { name: { ar: 'المصادقة والحماية', en: 'Authentication & Security' }, level: 85 },
      { name: { ar: 'TypeScript', en: 'TypeScript' }, level: 82 },
    ],
  },
  {
    category: { ar: 'قواعد البيانات', en: 'Databases' },
    icon: 'database',
    accent: 'cyan',
    items: [
      { name: { ar: 'MySQL / MariaDB', en: 'MySQL / MariaDB' }, level: 88 },
      { name: { ar: 'تصميم المخططات والفهارس', en: 'Schema & Index Design' }, level: 82 },
      { name: { ar: 'تحسين الاستعلامات', en: 'Query Optimization' }, level: 80 },
      { name: { ar: 'الترحيلات', en: 'Migrations' }, level: 76 },
    ],
  },
  {
    category: { ar: 'منظومة فايف إم', en: 'FiveM Ecosystem' },
    icon: 'gamepad',
    accent: 'pink',
    items: [
      { name: { ar: 'برمجة Lua', en: 'Lua Scripting' }, level: 90 },
      { name: { ar: 'بنية الخوادم', en: 'Server Infrastructure' }, level: 85 },
      { name: { ar: 'هندسة مكافحة الغش', en: 'Anti-Cheat Engineering' }, level: 83 },
      { name: { ar: 'تحسين أداء الموارد', en: 'Resource Optimization' }, level: 87 },
    ],
  },
  {
    category: { ar: 'الواجهات الأمامية والأدوات', en: 'Frontend & Tooling' },
    icon: 'terminal',
    accent: 'amber',
    items: [
      { name: { ar: 'EJS / HTML / CSS', en: 'EJS / HTML / CSS' }, level: 86 },
      { name: { ar: 'Git / GitHub', en: 'Git / GitHub' }, level: 84 },
      { name: { ar: 'Linux / PM2', en: 'Linux / PM2' }, level: 86 },
      { name: { ar: 'Docker', en: 'Docker' }, level: 74 },
    ],
  },
];

/* ============================ PROJECTS ============================ */

/** مفاتيح ثابتة — تُترجم عبر FILTER_LABELS في i18n.js */
export const PROJECT_FILTERS = ['All', 'API', 'FiveM', 'Discord', 'Security', 'Tooling'];

export const PROJECTS = [
  {
    title: { ar: 'CoreMind', en: 'CoreMind' },
    tags: ['FiveM', 'Security'],
    accent: 'violet',
    year: '2026',
    summary: {
      ar: 'مورد متكامل ومخصّص بالكامل لخوادم فايف إم، مبني من الصفر مع طبقة حماية وتحكّم كاملة في دورة حياة الموارد.',
      en: 'A fully custom, all-in-one FiveM resource built from scratch, with a protection layer and complete control over the resource lifecycle.',
    },
    stack: ['JavaScript', 'Lua', 'MySQL'],
    links: { repo: null },
    featured: true,
  },
  {
    title: { ar: 'نظام تراخيص كود هَب', en: 'CodeHub Licensing' },
    tags: ['API', 'Security'],
    accent: 'pink',
    year: '2026',
    summary: {
      ar: 'نظام الربط والتراخيص الخاص بـ CodeHub: إصدار المفاتيح وربطها بالأجهزة وسحبها، مع تحقّق مستمر من صلاحية النسخ.',
      en: 'The licensing and linking system behind CodeHub: key issuance, hardware binding, revocation, and continuous validation of deployed copies.',
    },
    stack: ['Node.js', 'MySQL', 'JWT'],
    links: { repo: 'https://github.com/vndel/codehub-licenses' },
    featured: true,
  },
  {
    title: { ar: 'ULG Link', en: 'ULG Link' },
    tags: ['API', 'FiveM'],
    accent: 'cyan',
    year: '2026',
    summary: {
      ar: 'نظام ربط متكامل لخادم ULG يجمع بين حسابات اللاعبين وديسكورد والخادم في هوية واحدة موحّدة.',
      en: 'A complete linking system for the ULG server, unifying player accounts, Discord identities, and in-game data under one identity.',
    },
    stack: ['JavaScript', 'Node.js', 'MySQL'],
    links: { repo: null },
  },
  {
    title: { ar: 'ULG Tickets', en: 'ULG Tickets' },
    tags: ['Discord', 'Tooling'],
    accent: 'amber',
    year: '2026',
    summary: {
      ar: 'بوت ديسكورد لإدارة التذاكر: فتح وإغلاق وأرشفة تلقائية، مع صلاحيات دقيقة لفريق الإدارة وسجلّ كامل للمحادثات.',
      en: 'A Discord ticket-management bot: open, close, and auto-archive, with fine-grained staff permissions and full conversation transcripts.',
    },
    stack: ['JavaScript', 'Discord.js'],
    links: { repo: null },
  },
  {
    title: { ar: 'موقع كود هَب', en: 'CodeHub Website' },
    tags: ['API', 'Tooling'],
    accent: 'lime',
    year: '2026',
    summary: {
      ar: 'المنصّة الرئيسية لـ CodeHub: واجهة أمامية بـ EJS وواجهة برمجية خلفية تدير المستخدمين والمنتجات والاشتراكات.',
      en: 'The main CodeHub platform: an EJS frontend backed by an API that manages users, products, and subscriptions.',
    },
    stack: ['Node.js', 'EJS', 'Express', 'MySQL'],
    links: { repo: null },
  },
  {
    title: { ar: 'DBackup', en: 'DBackup' },
    tags: ['Tooling', 'Security'],
    accent: 'violet',
    year: '2026',
    summary: {
      ar: 'أداة نسخ احتياطي مكتوبة بـ TypeScript، تؤتمت حفظ قواعد البيانات والملفات الحسّاسة وفق جدولة قابلة للضبط.',
      en: 'A TypeScript backup utility that automates scheduled snapshots of databases and sensitive files.',
    },
    stack: ['TypeScript', 'Node.js', 'Docker'],
    links: { repo: null },
  },
  {
    title: { ar: 'Discord Components', en: 'Discord Components' },
    tags: ['Discord', 'Tooling'],
    accent: 'cyan',
    year: '2023',
    summary: {
      ar: 'مكوّنات ويب مفتوحة المصدر تحاكي شكل رسائل ديسكورد بدقة، مفيدة للتوثيق وعرض الأمثلة داخل المواقع.',
      en: 'Open-source web components that faithfully replicate Discord message UI — useful for documentation and embedded examples.',
    },
    stack: ['TypeScript', 'Web Components'],
    links: { repo: 'https://github.com/vndel/discord-components' },
  },
  {
    title: { ar: 'Pterodactyl Eggs', en: 'Pterodactyl Eggs' },
    tags: ['Tooling'],
    accent: 'amber',
    year: '2022',
    summary: {
      ar: 'مجموعة ملفات خدمة جاهزة للوحة Pterodactyl تختصر إعداد الخوادم إلى خطوات قليلة.',
      en: 'A collection of ready-made service eggs for the Pterodactyl panel that reduce server setup to a few steps.',
    },
    stack: ['Docker', 'JSON'],
    links: { repo: 'https://github.com/vndel/eggs' },
  },
];

/* ============================ PROCESS ============================= */

export const PROCESS = [
  {
    step: '01',
    title: { ar: 'الاستكشاف', en: 'Discover' },
    text: {
      ar: 'نحدّد المتطلّب والقيود ومعايير النجاح قبل كتابة سطر واحد.',
      en: 'We map the requirement, constraints, and success metrics before a single line is written.',
    },
  },
  {
    step: '02',
    title: { ar: 'التصميم المعماري', en: 'Architect' },
    text: {
      ar: 'المخطط ونقاط الوصول وحالات الفشل تُصمَّم مسبقاً — موثّقة ومراجَعة.',
      en: 'Schema, endpoints, and failure modes are designed up front — documented and reviewed.',
    },
  },
  {
    step: '03',
    title: { ar: 'البناء', en: 'Build' },
    text: {
      ar: 'دفعات صغيرة قابلة للمراجعة. كود نظيف، وسجلّ تغييرات واضح، بلا إعادة كتابة مفاجئة.',
      en: 'Small, reviewable increments. Clean code, meaningful commits, no surprise rewrites.',
    },
  },
  {
    step: '04',
    title: { ar: 'التحصين', en: 'Harden' },
    text: {
      ar: 'اختبار أحمال ومراجعة أمنية وتسجيل ومراقبة قبل وصول أي شيء إلى الإنتاج.',
      en: 'Load testing, security review, logging, and monitoring before anything reaches production.',
    },
  },
];
