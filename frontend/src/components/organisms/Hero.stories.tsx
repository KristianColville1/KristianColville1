import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';
import { headline, headlineSupport, identity } from '../../content/bio';

const meta: Meta<typeof Hero> = {
  title: 'Organisms/Hero',
  component: Hero,
};
export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = { args: { headline, headlineSupport, identity } };
