import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
};
export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = { args: { level: 1, children: 'Software engineer building things that work.' } };
export const H2: Story = { args: { level: 2, children: 'Projects' } };
export const H3: Story = { args: { level: 3, children: 'Problem' } };
