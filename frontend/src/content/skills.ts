import type { SkillGroup } from './types';

export const skillsSummary =
  'Most of my work leans toward backend and integrations — building APIs, wiring up third-party services, and running the Linux infrastructure underneath — with solid frontend knowledge in React for when the work reaches the browser.';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript', usage: 'Core language for both React front ends and Node.js services.', level: 'Proficient' },
      { name: 'TypeScript', usage: 'Default choice for new frontend and backend work.', level: 'Proficient' },
      { name: 'PHP', usage: 'Primary language behind AV Star Systems’ client-facing applications.', level: 'Proficient' },
      { name: 'Python', usage: 'Backend services and automation — the employee management system runs on it.', level: 'Comfortable' },
      { name: 'Java', usage: 'Used during coursework and smaller backend exercises.', level: 'Familiar' },
      { name: 'HTML5', usage: 'Foundational markup for every frontend project.', level: 'Proficient' },
      { name: 'CSS3', usage: 'Styling and layout across client and personal projects.', level: 'Proficient' },
    ],
  },
  {
    title: 'Frameworks & Tools',
    items: [
      { name: 'React', usage: 'Learned independently to move into frontend work; used daily for client UIs.', level: 'Proficient' },
      { name: 'Node.js', usage: 'Learned alongside React; powers backend services and APIs.', level: 'Proficient' },
      { name: 'Django', usage: 'Backend and admin layer behind the employee management system.', level: 'Comfortable' },
      { name: 'WordPress', usage: 'Built and maintained client sites earlier in my career.', level: 'Comfortable' },
    ],
  },
  {
    title: 'Cloud & Hosting',
    items: [
      { name: 'AWS', usage: 'Cloud infrastructure underpinning client systems and archiving.', level: 'Comfortable' },
      { name: 'EC2', usage: 'Linux servers running application and streaming infrastructure.', level: 'Comfortable' },
      { name: 'S3', usage: 'Object storage for streaming recordings and long-term archives.', level: 'Comfortable' },
      { name: 'ElastiCache', usage: 'Managed in-memory caching to keep load off the database.', level: 'Familiar' },
      { name: 'Bunny CDN', usage: 'Edge storage and CDN delivery — this site ships to it on every push.', level: 'Comfortable' },
      { name: 'OVH', usage: 'Hosting and infrastructure for client-facing applications.', level: 'Comfortable' },
    ],
  },
  {
    title: 'Containers & Orchestration',
    items: [
      { name: 'Docker', usage: 'Containerising services for consistent deploys across environments.', level: 'Comfortable' },
      { name: 'Kubernetes', usage: 'Scaling streaming and portal workloads with high availability.', level: 'Comfortable' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'PostgreSQL', usage: 'Relational data storage for application backends.', level: 'Comfortable' },
      { name: 'MySQL', usage: 'Relational data storage, particularly alongside PHP/WordPress work.', level: 'Comfortable' },
      { name: 'MongoDB', usage: 'Document storage where a flexible schema suited the data better than tables.', level: 'Comfortable' },
      { name: 'DynamoDB', usage: 'Managed key-value storage on AWS for workloads needing scale without server management.', level: 'Familiar' },
    ],
  },
  {
    title: 'Systems & Networking',
    items: [
      { name: 'Linux', usage: 'Day-to-day server administration and recording infrastructure.', level: 'Proficient' },
      { name: 'Windows', usage: 'Desktop and Windows Server administration for internal IT.', level: 'Comfortable' },
      { name: 'macOS', usage: 'Daily development environment.', level: 'Familiar' },
      { name: 'Networking fundamentals', usage: 'SSL deployment, Nginx configuration, and general troubleshooting.', level: 'Comfortable' },
    ],
  },
  {
    title: 'Practices',
    items: [
      { name: 'Git', usage: 'Version control across every project.', level: 'Proficient' },
      { name: 'CI/CD', usage: 'Automating build and deployment pipelines.', level: 'Comfortable' },
      { name: 'REST APIs', usage: 'Designing and integrating APIs for scheduling and third-party services.', level: 'Proficient' },
      { name: 'Agile/Scrum', usage: 'Working in sprints with a small product team.', level: 'Comfortable' },
    ],
  },
  {
    title: 'AI Tooling',
    items: [
      {
        name: 'Claude Code',
        usage:
          'Agentic programming every day since the tooling emerged — iterating through solutions far faster, saving serious company time while I focus on architecture and bigger-picture flows.',
        level: 'Expert',
      },
      {
        name: 'Claude',
        usage: 'Deeper technical reasoning, design discussions and working through trade-offs.',
        level: 'Proficient',
      },
      {
        name: 'ChatGPT',
        usage: 'Research, boilerplate and templates — the everyday quick answers.',
        level: 'Proficient',
      },
    ],
  },
];
