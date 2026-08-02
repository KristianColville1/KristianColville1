import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Organisms/Hero',
  component: Hero,
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: { headline: 'Software engineer building things that work.' },
};
