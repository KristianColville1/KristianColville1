import type { Meta, StoryObj } from '@storybook/react-vite';
import { AchievementRow } from './AchievementRow';
import { achievements } from '../../content/achievements';

const meta: Meta<typeof AchievementRow> = {
  title: 'Molecules/AchievementRow',
  component: AchievementRow,
  decorators: [
    (Story) => (
      <ul className="max-w-2xl">
        <Story />
      </ul>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AchievementRow>;

export const WithLogo: Story = { args: { achievement: achievements[0] } };
export const WithBadge: Story = { args: { achievement: achievements[1] } };
