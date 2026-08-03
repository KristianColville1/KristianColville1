import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Percentage: Story = { args: { label: 'Backend & Integrations', percentage: 75 } };

export const QualitativeLevel: Story = {
  args: { label: 'React', percentage: 75, valueLabel: 'Proficient' },
};
