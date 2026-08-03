import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';

const meta: Meta<typeof ProjectCard> = {
  title: 'Molecules/ProjectCard',
  component: ProjectCard,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};
export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const WithLiveDemoAndRepo: Story = {
  args: {
    project: {
      slug: 'sample-project-one',
      name: 'Sample Project One',
      pitch: 'A placeholder project pitch.',
      category: 'personal',
      stack: ['React', 'TypeScript'],
      liveUrl: 'https://example.com',
      repoUrl: 'https://github.com/kristiancolville1/sample-project-one',
      caseStudy: { problem: '', approach: '', decisions: '', outcome: '' },
    },
  },
};

export const WithoutLiveDemo: Story = {
  args: {
    project: {
      slug: 'sample-project-two',
      name: 'Sample Project Two',
      pitch: 'A second placeholder project pitch.',
      category: 'personal',
      stack: ['Python', 'PostgreSQL'],
      repoUrl: 'https://github.com/kristiancolville1/sample-project-two',
      caseStudy: { problem: '', approach: '', decisions: '', outcome: '' },
    },
  },
};

export const WithoutRepo: Story = {
  args: {
    project: {
      slug: 'churchcamlive',
      name: 'ChurchCamLive.ie',
      pitch: 'Live-streaming and archiving platform for churches.',
      category: 'client',
      stack: ['PHP', 'React', 'Linux', 'WebRTC'],
      liveUrl: 'https://churchcamlive.ie',
      caseStudy: { problem: '', approach: '', decisions: '', outcome: '' },
    },
  },
};
