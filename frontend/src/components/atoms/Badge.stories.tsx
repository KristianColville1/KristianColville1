import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { children: 'New', tone: 'neutral' } };
export const Success: Story = { args: { children: 'Verified', tone: 'success' } };
