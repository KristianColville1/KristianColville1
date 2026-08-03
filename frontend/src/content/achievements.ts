import type { Achievement } from './types';

export const achievements: Achievement[] = [
  {
    name: 'Promoted to Software Engineer',
    issuer: 'AV Star Systems Ltd',
    date: '2025-05',
    description:
      'Promoted from Junior Software Engineer to Software Engineer after independently learning React and Node.js and taking on significantly more responsibility across the team’s full-stack and infrastructure work.',
  },
  {
    name: 'Hackathon — 2nd Place',
    issuer: 'Code Institute',
    date: '2022-02-02',
    description: 'Placed 2nd in the January 2022 Code Institute hackathon.',
    image: '/images/hackathon-award.png',
  },
];
