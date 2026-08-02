import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavLink } from './NavLink';

const meta: Meta<typeof NavLink> = {
  title: 'Molecules/NavLink',
  component: NavLink,
};
export default meta;

type Story = StoryObj<typeof NavLink>;

export const Inactive: Story = { args: { href: '#about', label: 'About', active: false } };
export const Active: Story = { args: { href: '#about', label: 'About', active: true } };
