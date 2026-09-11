/**
 * =============================================================
 *  SITE DATA  —  هذا هو الملف الوحيد الذي تعدّله لإضافة محتوى
 * =============================================================
 *  كل نص قابل للترجمة يُكتب ككائن: { ar: '…', en: '…' }
 *
 *  الصور والبانرات والألوان تُجلب تلقائياً من ديسكورد:
 *      1. ضع معرّف العضو في socials.discord
 *      2. شغّل:  npm run seed
 *      3. يُحدَّث assets/data/discord.json تلقائياً
 * =============================================================
 */

export const SITE = {
  name: 'FiveM Code Hub',
  domain: 'team.fivemcodehub.com',
  email: '777m@vndel.com',
  discordInvite: 'https://discord.gg/5cc',
};

/** الأدوار التي تُكتب تلقائياً في الواجهة الرئيسية */
export const HERO_ROLES = {
  ar: ['مطوّرو فايف إم', 'مهندسو أنظمة خلفية', 'مبرمجو Lua', 'صنّاع أدوات ديسكورد'],
  en: ['FiveM Developers', 'Backend Engineers', 'Lua Programmers', 'Discord Tooling Builders'],
};

export const STATS = [
  { value: 40, suffix: '+', label: { ar: 'سكربت منشور', en: 'Scripts Released' } },
  { value: 5284, suffix: '+', label: { ar: 'عضو في المجتمع', en: 'Community Members' } },
  { value: 99, suffix: '.9%', label: { ar: 'نسبة التشغيل', en: 'Uptime Delivered' } },
  { value: 6, suffix: '+', label: { ar: 'سنوات خبرة', en: 'Years of Experience' } },
];

/* ============================== TEAM ============================== */

export const TEAM = [
  {
    name: { ar: 'يزن البخيت', en: 'Yazan Al-Bakheet' },
    role: { ar: 'مؤسس ومطوّر فايف إم أول', en: 'Founder & Lead FiveM Developer' },
    age: 41,
    location: { ar: 'الأردن', en: 'Gordan' },
    initials: 'YB',
    accent: 'amber',
    bio: {
      ar: 'مالك CodeHub Studio وصاحب الخبرة الأطول في الفريق. متخصّص في برمجة Lua وبناء أنظمة فايف إم المعقّدة من الصفر — من أنظمة السرقات والعقارات إلى المهام والمكافآت. أطلق عشرات السكربتات التي تعمل اليوم على مئات السيرفرات.',
      en: 'Owner of CodeHub Studio and the most experienced member of the team. Specialises in Lua and building complex FiveM systems from scratch — robbery, real-estate, missions, and reward systems. Has shipped dozens of scripts now running on hundreds of servers.',
    },
    focus: {
      ar: ['برمجة Lua المتقدّمة', 'أنظمة فايف إم المتكاملة', 'تصميم آليات اللعب'],
      en: ['Advanced Lua', 'End-to-End FiveM Systems', 'Gameplay Mechanics'],
    },
    stack: ['Lua', 'FiveM', 'ESX', 'MySQL', 'JavaScript', 'Server Infrastructure'],
    socials: {
      discord: '548192595403210752',
    },
  },
  {
    name: { ar: 'محمد نفيس', en: 'Mohammed Nafees' },
    role: { ar: 'مطوّر واجهات برمجية وعلوم حاسب', en: 'API & Computer Science Developer' },
    age: 21,
    location: { ar: 'سوريا', en: 'Syria' },
    initials: 'MN',
    accent: 'violet',
    bio: {
      ar: 'مسؤول الأنظمة الخلفية وبوتات ديسكورد في الفريق. يبني الواجهات البرمجية وأنظمة التراخيص ولوحات التحكم التي تربط السيرفرات بديسكورد. صاحب نظام القطاعات CoreMind.',
      en: 'Owns the backend and Discord tooling side of the team. Builds the APIs, licensing systems, and control panels that connect game servers to Discord. Author of the CoreMind sector-management system.',
    },
    focus: {
      ar: ['واجهات REST والزمن الحقيقي', 'بوتات ديسكورد', 'أنظمة التراخيص والحماية'],
      en: ['REST & Realtime APIs', 'Discord Bots', 'Licensing & Security Systems'],
    },
    stack: ['JavaScript', 'TypeScript', 'Node.js', 'Discord.js', 'MySQL', 'Express', 'EJS', 'Docker'],
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
   *   stack: ['Lua'],
   *   socials: { discord: 'USER_ID' },   // ثم شغّل: npm run seed
   * },
   */
];

/* ============================= SKILLS ============================= */

export const SKILLS = [
  {
    category: { ar: 'فايف إم و Lua', en: 'FiveM & Lua' },
    icon: 'gamepad',
    accent: 'amber',
    items: [
      { name: { ar: 'برمجة Lua', en: 'Lua Scripting' }, level: 95 },
      { name: { ar: 'إطار ESX', en: 'ESX Framework' }, level: 92 },
      { name: { ar: 'تحسين أداء الموارد', en: 'Resource Optimization' }, level: 88 },
      { name: { ar: 'بنية الخوادم', en: 'Server Infrastructure' }, level: 86 },
    ],
  },
  {
    category: { ar: 'الأنظمة الخلفية والواجهات', en: 'Backend & APIs' },
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
    category: { ar: 'ديسكورد والأتمتة', en: 'Discord & Automation' },
    icon: 'terminal',
    accent: 'cyan',
    items: [
      { name: { ar: 'Discord.js', en: 'Discord.js' }, level: 90 },
      { name: { ar: 'أنظمة التذاكر', en: 'Ticket Systems' }, level: 88 },
      { name: { ar: 'لوحات التحكم', en: 'Control Panels' }, level: 85 },
      { name: { ar: 'ربط اللعبة بديسكورد', en: 'Game ↔ Discord Bridges' }, level: 87 },
    ],
  },
  {
    category: { ar: 'قواعد البيانات', en: 'Databases' },
    icon: 'database',
    accent: 'pink',
    items: [
      { name: { ar: 'MySQL / MariaDB', en: 'MySQL / MariaDB' }, level: 88 },
      { name: { ar: 'تصميم المخططات والفهارس', en: 'Schema & Index Design' }, level: 82 },
      { name: { ar: 'تحسين الاستعلامات', en: 'Query Optimization' }, level: 80 },
      { name: { ar: 'الترحيلات', en: 'Migrations' }, level: 76 },
    ],
  },
];

/* ============================ PROJECTS ============================ */

/** مفاتيح ثابتة — تُترجم عبر FILTER_LABELS في i18n.js */
export const PROJECT_FILTERS = ['All', 'FiveM', 'Discord', 'Web', 'Security'];

/**
 * المشاريع الحقيقية المنشورة في CodeHub Studio.
 * owner: يطابق initials العضو — تُعرض نسبة العمل تلقائياً.
 */
export const PROJECTS = [
  {
    title: { ar: 'CoreMind — نظام القطاعات', en: 'CoreMind — Sector System' },
    tags: ['Discord', 'Web'],
    accent: 'violet',
    year: '2026',
    owner: 'MN',
    image: 'assets/img/projects/coremind-sectors.webp',
    summary: {
      ar: 'نظام الإدارة المتكامل لسيرفرات فايف إم داخل ديسكورد: لوحة موحّدة لإدارة الأعضاء والتقارير والتوظيف والإجازات، مع نظام صلاحيات يمنع الرتبة الأقل من التحكم بالأعلى وسجل تفصيلي لكل عملية.',
      en: 'A complete management system for FiveM servers inside Discord: one panel for members, reports, hiring, and leave, with a permission model that stops lower ranks acting on higher ones and logs every decision.',
    },
    stack: ['Node.js', 'Discord.js', 'MySQL'],
    links: { discord: 'https://discord.gg/5cc' },
    featured: true,
  },
  {
    title: { ar: 'نظام العصابات والاحتلال', en: 'Gang & Territory System' },
    tags: ['FiveM'],
    accent: 'pink',
    year: '2026',
    owner: 'YB',
    image: 'assets/img/projects/gang-system.webp',
    summary: {
      ar: 'نظام عصابات متكامل لـ ESX: إنشاء العصابات وإدارة الأعضاء والرتب، مع آلية احتلال مناطق وصراع على النفوذ بين العصابات.',
      en: 'A full ESX gang system: creation, member and rank management, plus territory capture and ongoing conflict between rival gangs.',
    },
    stack: ['Lua', 'ESX', 'MySQL'],
    links: { discord: 'https://discord.gg/5cc' },
    featured: true,
  },
  {
    title: { ar: 'نظام متجر العملات', en: 'Coin Store System' },
    tags: ['FiveM'],
    accent: 'amber',
    year: '2026',
    owner: 'YB',
    image: 'assets/img/projects/coin-store.webp',
    summary: {
      ar: 'متجر عملات داخل اللعبة يتيح للاعبين شراء العناصر والمزايا بعملة خاصة، مع لوحة تحكم كاملة بالأسعار والمخزون.',
      en: 'An in-game coin store letting players buy items and perks with a dedicated currency, backed by full admin control over pricing and stock.',
    },
    stack: ['Lua', 'ESX', 'MySQL'],
    links: { discord: 'https://discord.gg/5cc' },
  },
  {
    title: { ar: 'نظام ملصقات السيارات', en: 'Car Sticker System' },
    tags: ['FiveM'],
    accent: 'cyan',
    year: '2026',
    owner: 'YB',
    image: 'assets/img/projects/car-stickers.webp',
    summary: {
      ar: 'نظام يمكّن اللاعبين من إضافة ملصقات مخصّصة على مركباتهم والتحكّم بموضعها وحجمها، مع حفظ التصميم على المركبة.',
      en: 'Lets players apply custom stickers to their vehicles with control over placement and scale, persisting the design on the vehicle.',
    },
    stack: ['Lua', 'ESX'],
    links: { discord: 'https://discord.gg/5cc' },
  },
  {
    title: { ar: 'صانع السرقات', en: 'Advanced Robbery System' },
    tags: ['FiveM'],
    accent: 'pink',
    year: '2026',
    owner: 'YB',
    summary: {
      ar: 'نظام سرقات متقدّم يسمح ببناء عمليات سرقة كاملة وتخصيصها: المواقع، المراحل، المكافآت، وردّ فعل الشرطة.',
      en: 'An advanced robbery framework for building and customising complete heists: locations, stages, rewards, and police response.',
    },
    stack: ['Lua', 'ESX', 'MySQL'],
    links: { video: 'https://youtu.be/z7QbndY6rRU', discord: 'https://discord.gg/5cc' },
    featured: true,
  },
  {
    title: { ar: 'نظام البيوت والعقارات', en: 'Housing & Real Estate' },
    tags: ['FiveM'],
    accent: 'lime',
    year: '2026',
    owner: 'YB',
    summary: {
      ar: 'نظام يجمع البيوت والعقارات والفنادق في حزمة واحدة: شراء وبيع وتأجير وإدارة الممتلكات داخل اللعبة.',
      en: 'Houses, real estate, and hotels in a single package: buying, selling, renting, and managing property in-game.',
    },
    stack: ['Lua', 'ESX', 'MySQL'],
    links: { discord: 'https://discord.gg/5cc' },
  },
  {
    title: { ar: 'نظام مكافآت اللعب والمهام', en: 'Rewards & Missions System' },
    tags: ['FiveM'],
    accent: 'amber',
    year: '2026',
    owner: 'YB',
    summary: {
      ar: 'نظام مهام ومكافآت مرن: تنشئ مهام يومية أو أسبوعية وتربطها بأي نشاط داخل السيرفر دون خبرة برمجية تُذكر.',
      en: 'A flexible missions and rewards engine: define daily or weekly objectives and bind them to any in-server activity with almost no coding.',
    },
    stack: ['Lua', 'ESX', 'MySQL'],
    links: { discord: 'https://discord.gg/5cc' },
  },
  {
    title: { ar: 'نظام تبديل اللوحات', en: 'Plate Swap System' },
    tags: ['FiveM'],
    accent: 'cyan',
    year: '2026',
    owner: 'YB',
    summary: {
      ar: 'سكربت يتيح تبديل لوحات المركبات داخل اللعبة، مفيد لسيناريوهات التخفّي والهروب وأدوار العصابات.',
      en: 'Swaps vehicle plates in-game — useful for disguise, escape, and gang roleplay scenarios.',
    },
    stack: ['Lua', 'ESX'],
    links: { discord: 'https://discord.gg/5cc' },
  },
  {
    title: { ar: 'صلاتك', en: 'Salatak — Prayer Times' },
    tags: ['FiveM'],
    accent: 'lime',
    year: '2026',
    owner: 'YB',
    summary: {
      ar: 'سكربت مجاني ومفتوح المصدر بالكامل يعرض أوقات الصلاة داخل السيرفر — متاح للتعديل والاستخدام دون أي مقابل.',
      en: 'A fully free and open-source script that surfaces prayer times in-server — free to modify and use, no purchase required.',
    },
    stack: ['Lua', 'ESX'],
    links: { discord: 'https://discord.gg/5cc' },
  },
  {
    title: { ar: 'بوت ديسكورد حسب الطلب', en: 'Custom Discord Bots' },
    tags: ['Discord'],
    accent: 'violet',
    year: '2026',
    owner: 'MN',
    summary: {
      ar: 'خدمة بناء بوتات ديسكورد مخصّصة: أنظمة تذاكر، ربط الرتب، أتمتة الإدارة، ولوحات تحكم مرتبطة بالسيرفر.',
      en: 'Custom Discord bot development: ticket systems, role syncing, moderation automation, and control panels wired into the game server.',
    },
    stack: ['Node.js', 'Discord.js', 'MySQL'],
    links: { discord: 'https://discord.gg/5cc' },
  },
  {
    title: { ar: 'نظام التراخيص', en: 'Licensing System' },
    tags: ['Security', 'Web'],
    accent: 'pink',
    year: '2026',
    owner: 'MN',
    summary: {
      ar: 'نظام ربط وتراخيص يحمي السكربتات الموزّعة: إصدار المفاتيح وربطها بالسيرفر وسحبها، مع تحقّق مستمر من صلاحية النسخ.',
      en: 'A licensing layer protecting distributed scripts: key issuance, server binding, revocation, and continuous validation of deployed copies.',
    },
    stack: ['Node.js', 'MySQL', 'JWT'],
    links: { repo: 'https://github.com/vndel/codehub-licenses' },
  },
  {
    title: { ar: 'إنشاء المواقع المخصّصة', en: 'Custom Web Development' },
    tags: ['Web'],
    accent: 'cyan',
    year: '2026',
    owner: 'MN',
    summary: {
      ar: 'خدمة بناء مواقع ومتاجر مخصّصة لمطوّري ومالكي سيرفرات فايف إم، مع لوحات إدارة ومزامنة مع اللعبة.',
      en: 'Custom websites and storefronts for FiveM server owners and developers, with admin panels and in-game synchronisation.',
    },
    stack: ['Node.js', 'EJS', 'Express', 'MySQL'],
    links: { discord: 'https://discord.gg/5cc' },
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
