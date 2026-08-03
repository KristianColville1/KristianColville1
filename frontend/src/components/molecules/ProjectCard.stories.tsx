import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import { projects } from '../../content/projects';

const meta: Meta<typeof ProjectCard> = {
  title: 'Molecules/ProjectCard',
  component: ProjectCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="max-w-md">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const WithScreenshot: Story = {
  args: { project: projects.find((project) => project.image)! },
};

export const WithLiveLinkOnly: Story = {
  args: { project: projects.find((project) => project.liveUrl && !project.image)! },
};

export const WithRepoLink: Story = {
  args: {
    project: {
      slug: 'sample-personal-project',
      name: 'Sample Personal Project',
      pitch: 'Shown to cover the personal-project card variant.',
      category: 'personal',
      status: 'completed',
      stack: ['TypeScript', 'React'],
      repoUrl: 'https://github.com/KristianColville1/sample',
      caseStudy: { problem: '', approach: '', decisions: '', outcome: '' },
    },
  },
};
