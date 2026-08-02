import type { Meta, StoryObj } from '@storybook/react-vite';
import { RevealSection } from './RevealSection';

const meta: Meta<typeof RevealSection> = {
  title: 'Atoms/RevealSection',
  component: RevealSection,
};
export default meta;

type Story = StoryObj<typeof RevealSection>;

export const Default: Story = {
  args: { id: 'preview', children: <p className="p-6">Scroll me into view to see the reveal animation.</p> },
};
