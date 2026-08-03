import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProjectsSection } from './ProjectsSection';
import { projects } from '../../content/projects';

const meta: Meta<typeof ProjectsSection> = {
  title: 'Organisms/ProjectsSection',
  component: ProjectsSection,
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
};
export default meta;

type Story = StoryObj<typeof ProjectsSection>;

export const Default: Story = { args: { projects } };

export const ClientAndPersonal: Story = {
  args: {
    projects: [
      ...projects,
      {
        slug: 'sample-personal-project',
        name: 'Sample Personal Project',
        pitch: 'A self-directed project shown to demonstrate the Personal Projects grouping.',
        category: 'personal',
        stack: ['TypeScript', 'React'],
        liveUrl: 'https://example.com',
        repoUrl: 'https://github.com/kristiancolville1/sample-personal-project',
        caseStudy: { problem: '', approach: '', decisions: '', outcome: '' },
      },
    ],
  },
};
