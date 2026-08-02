import type { Meta, StoryObj } from '@storybook/react-vite';
import { AchievementsSection } from './AchievementsSection';
import { achievements } from '../../content/achievements';

const meta: Meta<typeof AchievementsSection> = {
  title: 'Organisms/AchievementsSection',
  component: AchievementsSection,
};
export default meta;

type Story = StoryObj<typeof AchievementsSection>;

export const Default: Story = { args: { achievements } };
