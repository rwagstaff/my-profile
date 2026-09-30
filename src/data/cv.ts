export type Technology = {
  name: string;
  years: number;
  icon: string;
  color: number;
  accent: number;
};

export type Experience = {
  years: string;
  company: string;
  role: string;
  project: string;
  stack: string;
  summary: string;
  highlights: string[];
};

export type AboutCard = {
  title: string;
  accent: string;
  icon?: string;
  iconDisplay?: 'mask' | 'image';
  href?: string;
  backTitle?: string;
  backItems?: string[];
};

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: 'Richard Wagstaff',
  role: 'Lead Developer | Full Stack',
  email: 'richardwagstaff1984@gmail.com',
  printableCvUrl: 'https://rwagstaff.github.io/my-cv/',
  headline:
    'Lead full-stack engineer turning complex business problems into secure, scalable products across finance, cloud infrastructure and retail.',
  summary:
    'Cards show my favourite things. Press for more inforamtion',
  education: 'Aston University — BSc (Hons), 2:1',
  links: [
    { label: 'GitHub', url: 'https://github.com/rwagstaff' },
    { label: 'GitLab', url: 'https://gitlab.com/RichardWagstaff' },
  ],
};

export const aboutCards: AboutCard[] = [
  {
    title: 'GitLab',
    accent: '20, 184, 166',
    icon: publicAsset('about-icons/gitlab.svg'),
    href: 'https://gitlab.com/RichardWagstaff',
  },
  {
    title: 'Video Games',
    accent: '168, 85, 247',
    icon: publicAsset('about-icons/game-controller.svg'),
    backTitle: 'Favourite Games',
    backItems: ['God of War', 'Astro Bot', 'Metal Gear Solid'],
  },
  {
    title: 'Football',
    accent: '34, 197, 94',
    icon: publicAsset('about-icons/football.svg'),
    iconDisplay: 'image',
    backItems: ['Still playing in my 40s :)'],
  },
  {
    title: 'GitHub',
    accent: '96, 165, 250',
    icon: publicAsset('about-icons/github.svg'),
    href: 'https://github.com/rwagstaff',
  },
  {
    title: 'LCFC',
    accent: '59, 130, 246',
    icon: publicAsset('about-icons/leicester-city-crest.svg'),
    iconDisplay: 'image',
    backTitle: 'Favourite Players',
    backItems: ['Jamie Vardy', "N'Golo Kanté"],
  },
  {
    title: 'Running',
    accent: '251, 146, 60',
    icon: publicAsset('about-icons/running.svg'),
    backItems: ['Completed several half marathons', 'Best time 1:40'],
  },
];

export const technologies: Technology[] = [
  { name: 'Java', years: 18, icon: publicAsset('tech-icons/java.svg'), color: 0xffb86c, accent: 0xffedd5 },
  { name: 'Spring', years: 15, icon: publicAsset('tech-icons/spring.svg'), color: 0x8ee6a6, accent: 0xdcfce7 },
  { name: 'SQL', years: 15, icon: publicAsset('tech-icons/postgresql.svg'), color: 0x9bdcff, accent: 0xe0f2fe },
  { name: 'JavaScript', years: 10, icon: publicAsset('tech-icons/javascript.svg'), color: 0xffe66d, accent: 0xfef9c3 },
  { name: 'TypeScript', years: 8, icon: publicAsset('tech-icons/typescript.svg'), color: 0x8fb8ff, accent: 0xdbeafe },
  { name: 'Angular', years: 7, icon: publicAsset('tech-icons/angular.svg'), color: 0xff9da7, accent: 0xfee2e2 },
  { name: 'Kotlin', years: 5, icon: publicAsset('tech-icons/kotlin.svg'), color: 0xc4a7ff, accent: 0xede9fe },
  { name: 'Node.js', years: 5, icon: publicAsset('tech-icons/nodejs.svg'), color: 0x8fe8c0, accent: 0xbbf7d0 },
  { name: 'Python', years: 5, icon: publicAsset('tech-icons/python.svg'), color: 0xffd36e, accent: 0xfef3c7 },
  { name: 'Gradle', years: 5, icon: publicAsset('tech-icons/gradle.svg'), color: 0x8de7de, accent: 0xccfbf1 },
  { name: 'Vue', years: 5, icon: publicAsset('tech-icons/vue.svg'), color: 0x95edc9, accent: 0xd1fae5 },
  { name: 'AWS', years: 3, icon: publicAsset('tech-icons/aws.svg'), color: 0xffc08a, accent: 0xffedd5 },
  { name: 'Docker', years: 3, icon: publicAsset('tech-icons/docker.svg'), color: 0x94d8ff, accent: 0xe0f2fe },
  { name: 'Kafka', years: 3, icon: publicAsset('tech-icons/kafka.svg'), color: 0xd4d4ff, accent: 0xf1f5f9 },
];

export const experiences: Experience[] = [
  {
    years: '2006 - 2013',
    company: 'Dion Global Solutions',
    role: 'Software Developer',
    project: 'Front Office Wealth Management',
    stack: 'Java, Spring, Virgo Web Server, OSGi, Oracle',
    summary: 'Built and supported front-office wealth management and document warehousing systems for high-value portfolios.',
    highlights: [
      'Integrated stock exchange quote flows using QuickFIX/J.',
      'Promoted event-driven design and CQRS practices.',
      'Led placement-student recruitment and internal technical training.',
    ],
  },
  {
    years: '2013 - 2015',
    company: 'Databarracks',
    role: 'Full Stack Developer',
    project: 'Infrastructure as a Service Portal',
    stack: 'Java, Spring, Tomcat, AngularJS, Bootstrap, MySQL',
    summary: 'Re-designed the IaaS portal used by clients to manage infrastructure hosted on VMware, working independently across the full stack.',
    highlights: ['Transformed an outsourced project into a modern SPA.', 'Introduced continuous integration and Kanban practices.'],
  },
  {
    years: '2015 - 2022',
    company: 'Capitalab / BGC Partners',
    role: 'Senior Developer',
    project: 'Secure Portal',
    stack: 'Java 17, Spring Boot, Angular, SQL Server',
    summary: 'Joined as the second developer at a fast-paced financial services start-up and helped build the secure client trading portal.',
    highlights: [
      'Migrated a client portal from AngularJS to Angular.',
      'Led annual penetration-test remediation and security hardening.',
      'Established high standards across frontend, backend and testing.',
    ],
  },
  {
    years: '2022 - 2023',
    company: 'Genesis Global',
    role: 'Lead Developer',
    project: 'No-Code Web Application DSL',
    stack: 'Kotlin, Gradle, TypeScript, Web Components',
    summary: 'Built platform features for a no-code web application DSL, connecting backend schema design with frontend component generation.',
    highlights: ['Developed a Kotlin DSL for web application generation.', 'Added JSON schema tests to protect frontend/backend compatibility.'],
  },
  {
    years: '2023 - Present',
    company: 'Holland & Barrett',
    role: 'Lead Developer | Full Stack',
    project: 'H&B Retail',
    stack: 'Kotlin, Spring, TypeScript, Vue, AWS, Kafka',
    summary: 'Delivering backend and frontend retail systems used by in-store colleagues while shaping architectural direction.',
    highlights: [
      'Moved into a leadership role for architectural decisions.',
      'Delivered chip-and-pin integration and connected-store messaging.',
      'Created a self-checkout system with a two-screen interface.',
    ],
  },
];
