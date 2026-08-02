import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Get in touch', variant: 'primary', href: 'https://example.com' },
};

export const Secondary: Story = {
  args: { children: 'View source', variant: 'secondary', href: 'https://example.com' },
};

export const AsButton: Story = {
  args: { children: 'Toggle theme', variant: 'secondary' },
};
