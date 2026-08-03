import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: [
      { name: 'JavaScript', usage: 'Core language for both React front ends and Node.js services.', level: 'Proficient' },
      { name: 'TypeScript', usage: 'Default choice for new frontend and backend work.', level: 'Proficient' },
      { name: 'PHP', usage: 'Primary language behind AV Star Systems’ client-facing applications.', level: 'Proficient' },
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
      { name: 'WordPress', usage: 'Built and maintained client sites earlier in my career.', level: 'Comfortable' },
    ],
  },
  {
    title: 'Cloud & Containers',
    items: [
      { name: 'Docker', usage: 'Containerising services for consistent deploys.', level: 'Comfortable' },
      { name: 'Kubernetes', usage: 'Exposure to orchestrating containerised workloads.', level: 'Familiar' },
      { name: 'AWS', usage: 'S3-compatible storage and cloud infrastructure for client systems.', level: 'Comfortable' },
      { name: 'OVH', usage: 'Hosting and infrastructure for client-facing applications.', level: 'Comfortable' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'PostgreSQL', usage: 'Relational data storage for application backends.', level: 'Comfortable' },
      { name: 'MySQL', usage: 'Relational data storage, particularly alongside PHP/WordPress work.', level: 'Comfortable' },
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
];
