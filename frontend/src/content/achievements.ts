import type { Achievement } from './types';

export const achievements: Achievement[] = [
  {
    name: 'Promoted to Software Engineer',
    issuer: 'AV Star Systems Ltd',
    date: 'May 2025',
    description:
      'Promoted from Junior Software Engineer to Software Engineer after independently learning React and Node.js and taking on significantly more responsibility across the team’s full-stack and infrastructure work.',
    image: '/images/avss.png',
  },
  {
    name: 'Hackathon — 2nd Place',
    issuer: 'Code Institute',
    date: 'February 2022',
    description: 'Placed 2nd in the January 2022 Code Institute hackathon.',
    image: '/images/hackathon-award.png',
  },
];
