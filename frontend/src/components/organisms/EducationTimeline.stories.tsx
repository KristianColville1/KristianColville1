import type { Meta, StoryObj } from '@storybook/react-vite';
import { EducationTimeline } from './EducationTimeline';
import { educationEntries } from '../../content/education';

const meta: Meta<typeof EducationTimeline> = {
  title: 'Organisms/EducationTimeline',
  component: EducationTimeline,
};
export default meta;

type Story = StoryObj<typeof EducationTimeline>;

export const Default: Story = { args: { entries: educationEntries } };
