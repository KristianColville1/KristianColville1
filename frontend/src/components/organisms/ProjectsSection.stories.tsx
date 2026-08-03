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

export const WithPersonalProject: Story = {
  args: {
    projects: [
      ...projects,
      {
        slug: 'sample-personal-project',
        name: 'Sample Personal Project',
        pitch: 'Shows the Personal Projects grouping alongside client work.',
        category: 'personal',
        status: 'completed',
        stack: ['TypeScript', 'React'],
        repoUrl: 'https://github.com/KristianColville1/sample',
        caseStudy: { problem: '', approach: '', decisions: '', outcome: '' },
      },
    ],
  },
};
