import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechChip } from './TechChip';

const meta: Meta<typeof TechChip> = {
  title: 'Atoms/TechChip',
  component: TechChip,
};
export default meta;

type Story = StoryObj<typeof TechChip>;

export const Default: Story = { args: { label: 'TypeScript' } };
