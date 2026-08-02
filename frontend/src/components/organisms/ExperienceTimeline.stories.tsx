import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExperienceTimeline } from './ExperienceTimeline';
import { experienceEntries } from '../../content/experience';

const meta: Meta<typeof ExperienceTimeline> = {
  title: 'Organisms/ExperienceTimeline',
  component: ExperienceTimeline,
};
export default meta;

type Story = StoryObj<typeof ExperienceTimeline>;

export const Default: Story = { args: { entries: experienceEntries } };
