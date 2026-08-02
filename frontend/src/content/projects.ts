import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'sample-project-one',
    name: 'Sample Project One',
    pitch: 'A placeholder project pitch — replace with a real one-line summary.',
    stack: ['React', 'TypeScript', 'Node.js'],
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/kristiancolville1/sample-project-one',
    caseStudy: {
      problem: 'Placeholder: what problem did this project solve?',
      approach: 'Placeholder: what was the approach and stack?',
      decisions: 'Placeholder: what were the key technical decisions and trade-offs?',
      outcome: 'Placeholder: what was the measurable outcome?',
    },
  },
  {
    slug: 'sample-project-two',
    name: 'Sample Project Two',
    pitch: 'A second placeholder project pitch.',
    stack: ['Python', 'PostgreSQL'],
    repoUrl: 'https://github.com/kristiancolville1/sample-project-two',
    caseStudy: {
      problem: 'Placeholder: what problem did this project solve?',
      approach: 'Placeholder: what was the approach and stack?',
      decisions: 'Placeholder: what were the key technical decisions and trade-offs?',
      outcome: 'Placeholder: what was the measurable outcome?',
    },
  },
];
