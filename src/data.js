// Single source of truth for all portfolio content.
export const PROFILE = {
  name: 'Kamran Ali',
  roles: ['Senior .NET Developer', 'Lead AI Engineer', 'ML Engineer'],
  email: 'rajakamranali755@gmail.com',
  phone: '+92 314 5247142',
  location: 'Islamabad, Pakistan',
  linkedin: 'https://www.linkedin.com/in/kamran-ali-557b70212',
  // TODO: replace with your real GitHub profile URL
  github: 'https://github.com/',
  grammora: 'https://grammora.ai/',
}

export const NAV = [
  ['about', 'About'], ['stack', 'Stack'], ['services', 'Services'],
  ['projects', 'Projects'], ['experience', 'Experience'], ['contact', 'Contact'],
]

export const STACK = [
  { group: 'AI / ML', items: ['LLM fine-tuning', 'Generative AI', 'Urdu NLP', 'Summarization', 'Paraphrasing', 'Dataset preparation', 'Qwen3-8B'] },
  { group: 'Backend', items: ['C#', '.NET 8', 'ASP.NET Core', 'REST APIs', 'Custom middleware', 'ABA file generation'] },
  { group: 'Data', items: ['SQL Server', 'Stored procedures', 'Indexing', 'Views and UDFs', 'Schema migration'] },
  { group: 'Cloud & DevOps', items: ['Azure Key Vault', 'Azure Repos', 'Jenkins', 'Azure Pipelines', 'GitLab CI', 'Docker', 'IIS', 'VMware'] },
  { group: 'Languages & Tools', items: ['Python', 'Shell scripting', 'Git', 'TFS', 'Linux', 'Windows', 'React'] },
]

export const DOTNET_POINTS = [
  ['Web APIs that last', 'Design, reorganize and extend ASP.NET Core APIs on live systems without breaking the clients that depend on them.'],
  ['Middleware and performance', 'Custom middleware and targeted optimization keep response times predictable under real load.'],
  ['Secrets done properly', 'Azure Key Vault holds connection strings and keys, so nothing sensitive sits in config files.'],
  ['Payments that settle', 'ABA file generation for payment processing, plus PDF generation for compliance paperwork.'],
]

export const SQL_POINTS = [
  'Stored procedures, functions and views for compliance workloads',
  'Indexing and normalization that cut query execution time',
  'Refactoring legacy SQL into tested, optimized procedures',
  'Safe schema changes: type changes, computed columns, nullability',
]

export const AI_MODULES = [
  'Summarization', 'Paraphrasing', 'Synonyms', 'Grammar', 'Translation aid',
  'Rewriting', 'Vocabulary', 'Text assistance', 'Dataset QA',
]

export const PROJECTS = [
  {
    id: 'grammora', cat: 'AI', title: 'Grammora.ai', kind: 'Urdu AI platform', href: 'https://grammora.ai/', feature: true,
    blurb: 'An Urdu paraphrasing model trained from scratch and shipped as a live product. I led model design, training and deployment.',
    stack: ['Python', 'Transformer', 'Urdu NLP', 'Production deploy'],
  },
  {
    id: 'urdu-llm', cat: 'AI', title: 'Urdu LLM', kind: 'Language model', href: null,
    blurb: 'A broad Urdu model built on Qwen3-8B and trained on a large multi-task instruction dataset.',
    stack: ['Qwen3-8B', 'Fine-tuning', 'Instruction data'],
  },
  {
    id: 'survey', cat: '.NET', title: 'Federal Education Survey', kind: 'React + ASP.NET Core', href: 'https://languagepolicyframework.com',
    blurb: 'Presents national language-teaching policy findings from Islamabad as charts and key insights. I designed the architecture and the SQL database.',
    stack: ['React', 'ASP.NET Core', 'SQL Server'],
  },
  {
    id: 'formpanda', cat: '.NET', title: 'Form Panda', kind: 'Compliance platform', href: 'https://account-dev.formpanda.com.au',
    blurb: 'A platform for Australia’s Small-scale Technology Certificate (STC) scheme. .NET APIs, SQL Server procedures and Azure integrations.',
    stack: ['.NET 8', 'SQL Server', 'Azure'],
  },
  {
    id: 'lekhari', cat: 'AI', title: 'Lekhari', kind: 'Writing assistant', href: null,
    blurb: 'An Urdu writing and text-assistance app for Pakistani-language users, built end to end.',
    stack: ['Urdu NLP', 'Full stack'],
  },
]

export const PRODUCTION = [
  { note: 'Urdu paraphraser trained from scratch. I led design, training and deployment.', name: 'Grammora.ai', tag: 'Live Urdu AI', status: 'Live' },
  { note: '.NET APIs, SQL Server procedures and Azure integrations for the STC scheme.', name: 'Form Panda', tag: 'STC compliance', status: 'Live' },
  { note: 'React and ASP.NET Core app. I designed the architecture and the SQL database.', name: 'Language Policy Survey', tag: 'Federal education', status: 'Live' },
  { note: 'Summarization, paraphrasing, synonyms and more, shipped as one system.', name: '9-module Urdu language system', tag: 'AIOU CeLTS', status: 'Deployed' },
  { note: 'SQL Server procedures for NSW Peak Demand Reduction compliance.', name: 'PDRS compliance database', tag: 'NSW, Australia', status: 'Live' },
]

export const EXPERIENCE = [
  { role: 'AI Engineer (Lead Developer)', org: 'AIOU CeLTS', when: '04/2025 – Present',
    points: ['Led LLM development for local Pakistani languages, from dataset preparation to deployment.', 'Built a 9-module Urdu language system: summarization, paraphrasing, synonyms and more.', 'Managed the team: planned work, assigned tasks, reviewed every module before release.'] },
  { role: '.NET Developer', org: 'Aussource Enterprises PTY LTD', when: '01/2024 – Present',
    points: ['Built and extended .NET Web APIs, with custom middleware and performance work.', 'Secured secrets with Azure Key Vault; built ABA payment file generation.', 'Worked across GitHub, TFS and Azure Repos.'] },
  { role: 'SQL Server Developer', org: 'Aussource Enterprises PTY LTD', when: '01/2024 – Present',
    points: ['Wrote complex stored procedures, functions and views.', 'Tuned indexes and normalized schemas to cut execution time.', 'Refactored legacy SQL and migrated business logic into procedures.'] },
]

export const ACHIEVEMENTS = [
  ['Led a 6-month build', 'Delivered a full production system on time, including product and database.'],
  ['Trained a model from scratch', 'Grammora’s paraphraser runs in production.'],
  ['Shipped 9 NLP modules', 'One Urdu language system, one team, one release plan.'],
  ['Federal-level delivery', 'Architecture and database for a national education survey.'],
]

export const EDUCATION = [
  ['MS Computer Science', 'CASE University, Islamabad', '2026 – Present'],
  ['B.Ed.', 'Allama Iqbal Open University', '2024 – 2025'],
  ['BS Computer Science', 'Allama Iqbal Open University', '2019 – 2023'],
]
export const CERTS = ['Linux for Beginners', 'Git and GitHub Training', 'Introduction to DevOps', 'Docker Essential Training', 'Introduction to C#']

export const TECH_MARQUEE = ['ASP.NET Core', 'Urdu LLMs', 'SQL Server', 'Azure Key Vault', 'Qwen3-8B', 'C# · .NET 8', 'Generative AI', 'Docker', 'Python', 'REST APIs']
