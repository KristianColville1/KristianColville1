import type { SkillGroup } from './types';

export const skillsSummary =
  'Most of my work leans toward backend and integrations — building APIs, wiring up third-party services, and running the Linux infrastructure underneath — with solid frontend knowledge in React for when the work reaches the browser.';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript', usage: 'Core language for both React front ends and Node.js services.' },
      { name: 'TypeScript', usage: 'Default choice for new frontend and backend work.' },
      { name: 'PHP', usage: 'Primary language behind AV Star Systems’ client-facing applications.' },
      { name: 'Python', usage: 'Backend services and automation — the employee management system runs on it.' },
      { name: 'Java', usage: 'Used during coursework and smaller backend exercises.' },
      { name: 'HTML5', usage: 'Foundational markup for every frontend project.' },
      { name: 'CSS3', usage: 'Styling and layout across client and personal projects.' },
    ],
  },
  {
    title: 'Frameworks & Tools',
    items: [
      { name: 'React', usage: 'Learned independently to move into frontend work; used daily for client UIs.' },
      { name: 'Node.js', usage: 'Learned alongside React; powers backend services and APIs.' },
      { name: 'Django', usage: 'Backend and admin layer behind the employee management system.' },
      { name: 'WordPress', usage: 'Built and maintained client sites earlier in my career.' },
    ],
  },
  {
    title: 'Cloud & Hosting',
    items: [
      { name: 'AWS', usage: 'Cloud infrastructure underpinning client systems and archiving.' },
      { name: 'EC2', usage: 'Linux servers running application and streaming infrastructure.' },
      { name: 'S3', usage: 'Object storage for streaming recordings and long-term archives.' },
      { name: 'ElastiCache', usage: 'Managed in-memory caching to keep load off the database.' },
      { name: 'Bunny CDN', usage: 'Edge storage and CDN delivery — this site ships to it on every push.' },
      { name: 'OVH', usage: 'Hosting and infrastructure for client-facing applications.' },
    ],
  },
  {
    title: 'Containers & Orchestration',
    items: [
      { name: 'Docker', usage: 'Containerising services for consistent deploys across environments.' },
      { name: 'Kubernetes', usage: 'Scaling streaming and portal workloads with high availability.' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'PostgreSQL', usage: 'Relational data storage for application backends.' },
      { name: 'MySQL', usage: 'Relational data storage, particularly alongside PHP/WordPress work.' },
      { name: 'MongoDB', usage: 'Document storage where a flexible schema suited the data better than tables.' },
      { name: 'DynamoDB', usage: 'Managed key-value storage on AWS for workloads needing scale without server management.' },
    ],
  },
  {
    title: 'Systems & Networking',
    items: [
      { name: 'Linux', usage: 'Day-to-day server administration and recording infrastructure.' },
      { name: 'Windows', usage: 'Desktop and Windows Server administration for internal IT.' },
      { name: 'macOS', usage: 'Daily development environment.' },
      { name: 'Networking fundamentals', usage: 'SSL deployment, Nginx configuration, and general troubleshooting.' },
    ],
  },
  {
    title: 'Practices',
    items: [
      { name: 'Git', usage: 'Version control across every project.' },
      { name: 'CI/CD', usage: 'Automating build and deployment pipelines.' },
      { name: 'REST APIs', usage: 'Designing and integrating APIs for scheduling and third-party services.' },
      { name: 'Agile/Scrum', usage: 'Working in sprints with a small product team.' },
    ],
  },
  {
    title: 'AI Tooling',
    items: [
      {
        name: 'Claude Code',
        usage:
          'Agentic programming every day since the tooling emerged — iterating through solutions far faster, saving serious company time while I focus on architecture and bigger-picture flows. Using the Claude CLI to run local code and test solutions before shipping them to production, and using the Claude API to build agentic workflows that can run autonomously on a schedule.',
      },
      {
        name: 'Claude',
        usage: 'Deeper technical reasoning, design discussions and working through trade-offs.',
      },
      {
        name: 'ChatGPT',
        usage: 'Research, boilerplate and templates — the everyday quick answers.',
      },
    ],
  },
];
