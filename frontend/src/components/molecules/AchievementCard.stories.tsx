import type { Meta, StoryObj } from '@storybook/react-vite';
import { AchievementCard } from './AchievementCard';

const meta: Meta<typeof AchievementCard> = {
  title: 'Molecules/AchievementCard',
  component: AchievementCard,
};
export default meta;

type Story = StoryObj<typeof AchievementCard>;

export const Default: Story = {
  args: {
    achievement: {
      name: 'Hackathon — 2nd Place',
      issuer: 'Code Institute',
      date: '2022-02-02',
      description: 'Placed 2nd in the January 2022 Code Institute hackathon.',
      image: '/images/hackathon-award.png',
    },
  },
};
