import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
