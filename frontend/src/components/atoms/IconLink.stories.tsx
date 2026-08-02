import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconLink } from './IconLink';

const meta: Meta<typeof IconLink> = {
  title: 'Atoms/IconLink',
  component: IconLink,
};
export default meta;

type Story = StoryObj<typeof IconLink>;

export const Default: Story = {
  args: { href: 'https://github.com/kristiancolville1', label: 'GitHub' },
};
