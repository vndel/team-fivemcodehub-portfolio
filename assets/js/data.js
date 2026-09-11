/**
 * =============================================================
 *  SITE DATA  —  هذا هو الملف الوحيد الذي تعدّله لإضافة محتوى
 * =============================================================
 *  لإضافة عضو جديد: أضف كائن جديد داخل مصفوفة TEAM.
 *  لإضافة مشروع:    أضف كائن جديد داخل مصفوفة PROJECTS.
 * =============================================================
 */

export const SITE = {
  name: 'FiveM Code Hub',
  tagline: 'Team Portfolio',
  domain: 'team.fivemcodehub.com',
  email: 'contact@fivemcodehub.com',
  description:
    'A collective of developers building high-performance APIs, backend systems, and FiveM infrastructure.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/vndel', icon: 'github' },
    { label: 'Discord', href: '#', icon: 'discord' },
    { label: 'Email', href: 'mailto:contact@fivemcodehub.com', icon: 'mail' },
  ],
};

/** الأدوار التي تُكتب تلقائياً في الواجهة الرئيسية */
export const HERO_ROLES = [
  'API Developers',
  'Backend Engineers',
  'FiveM Specialists',
  'System Architects',
];

export const STATS = [
  { value: 40, suffix: '+', label: 'Projects Shipped' },
  { value: 12, suffix: '+', label: 'APIs in Production' },
  { value: 99, suffix: '.9%', label: 'Uptime Delivered' },
  { value: 5, suffix: '+', label: 'Years Combined' },
];

/* ============================== TEAM ============================== */

export const TEAM = [
  {
    name: 'Mohammed Nafees',
    role: 'API & Computer Science Developer',
    age: 21,
    location: 'Syria',
    // avatar: 'assets/img/members/nafees.jpg',  // optional — falls back to initials
    initials: 'MN',
    accent: 'violet',
    bio: 'Founder of FiveM Code Hub. Focused on API architecture, secure backend systems, and developer tooling. Turns complex requirements into clean, documented, production-ready services.',
    focus: ['REST & Realtime APIs', 'Backend Architecture', 'Anti-Cheat Systems'],
    stack: ['Node.js', 'Lua', 'MySQL', 'Express', 'Redis', 'Docker'],
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
   *   name: 'Full Name',
   *   role: 'Role Title',
   *   age: 22,
   *   location: 'Country',
   *   initials: 'FN',
   *   accent: 'cyan',            // violet | cyan | pink | amber | lime
   *   bio: 'Short professional bio.',
   *   focus: ['Area 1', 'Area 2'],
   *   stack: ['Tech', 'Tech'],
   *   socials: { github: '#', discord: '#', email: 'mailto:' },
   * },
   */
];

/* ============================= SKILLS ============================= */

export const SKILLS = [
  {
    category: 'Backend & APIs',
    icon: 'server',
    accent: 'violet',
    items: [
      { name: 'Node.js / Express', level: 92 },
      { name: 'REST & WebSocket APIs', level: 90 },
      { name: 'Authentication & Security', level: 85 },
      { name: 'Redis / Caching', level: 78 },
    ],
  },
  {
    category: 'Databases',
    icon: 'database',
    accent: 'cyan',
    items: [
      { name: 'MySQL / MariaDB', level: 88 },
      { name: 'Schema & Index Design', level: 82 },
      { name: 'Query Optimization', level: 80 },
      { name: 'Migrations', level: 76 },
    ],
  },
  {
    category: 'FiveM Ecosystem',
    icon: 'gamepad',
    accent: 'pink',
    items: [
      { name: 'Lua Scripting', level: 90 },
      { name: 'Server Infrastructure', level: 85 },
      { name: 'Anti-Cheat Engineering', level: 83 },
      { name: 'Resource Optimization', level: 87 },
    ],
  },
  {
    category: 'Tooling & DevOps',
    icon: 'terminal',
    accent: 'amber',
    items: [
      { name: 'Git / GitHub Actions', level: 84 },
      { name: 'Linux / PM2', level: 86 },
      { name: 'Docker', level: 74 },
      { name: 'Monitoring & Logging', level: 79 },
    ],
  },
];

/* ============================ PROJECTS ============================ */

export const PROJECT_FILTERS = ['All', 'API', 'FiveM', 'Security', 'Tooling'];

export const PROJECTS = [
  {
    title: 'CodeHub Core API',
    tags: ['API', 'Tooling'],
    accent: 'violet',
    year: '2025',
    summary:
      'Central REST API powering authentication, licensing, and resource delivery for the whole platform. Token-based auth, rate limiting, and full request auditing.',
    stack: ['Node.js', 'Express', 'MySQL', 'Redis'],
    links: { repo: '#', demo: null },
    featured: true,
  },
  {
    title: 'Guardian Anti-Cheat',
    tags: ['FiveM', 'Security'],
    accent: 'pink',
    year: '2025',
    summary:
      'Server-side detection layer for FiveM. Behavioural heuristics, event validation, and encrypted payload verification with near-zero false positives.',
    stack: ['Lua', 'Node.js', 'MySQL'],
    links: { repo: '#', demo: null },
    featured: true,
  },
  {
    title: 'Discord Bridge Bot',
    tags: ['API', 'Tooling'],
    accent: 'cyan',
    year: '2024',
    summary:
      'Two-way bridge between game servers and Discord: live status, role sync, ticket automation, and staff command relay.',
    stack: ['Node.js', 'Discord.js', 'WebSocket'],
    links: { repo: '#', demo: null },
  },
  {
    title: 'Resource Encryption Suite',
    tags: ['Security', 'FiveM'],
    accent: 'amber',
    year: '2024',
    summary:
      'Obfuscation and runtime-decryption pipeline that protects Lua resources from extraction while keeping startup cost negligible.',
    stack: ['Lua', 'Node.js'],
    links: { repo: '#', demo: null },
  },
  {
    title: 'Server Metrics Dashboard',
    tags: ['Tooling', 'API'],
    accent: 'lime',
    year: '2024',
    summary:
      'Realtime dashboard for player counts, resource timings, and crash traces. Streams metrics over WebSocket with historical rollups.',
    stack: ['Node.js', 'Chart.js', 'MySQL'],
    links: { repo: '#', demo: null },
  },
  {
    title: 'License Key Manager',
    tags: ['Security', 'API'],
    accent: 'violet',
    year: '2023',
    summary:
      'Hardware-bound licensing service with issuance, revocation, and offline grace periods. Built for resellable script distribution.',
    stack: ['Node.js', 'MySQL', 'JWT'],
    links: { repo: '#', demo: null },
  },
];

/* ============================ PROCESS ============================= */

export const PROCESS = [
  {
    step: '01',
    title: 'Discover',
    text: 'We map the requirement, constraints, and success metrics before a single line is written.',
  },
  {
    step: '02',
    title: 'Architect',
    text: 'Schema, endpoints, and failure modes are designed up front — documented and reviewed.',
  },
  {
    step: '03',
    title: 'Build',
    text: 'Small, reviewable increments. Clean code, meaningful commits, no surprise rewrites.',
  },
  {
    step: '04',
    title: 'Harden',
    text: 'Load testing, security review, logging, and monitoring before anything reaches production.',
  },
];
