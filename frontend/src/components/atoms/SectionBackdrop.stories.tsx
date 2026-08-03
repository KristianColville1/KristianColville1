import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionBackdrop } from './SectionBackdrop';

const meta: Meta<typeof SectionBackdrop> = {
  title: 'Atoms/SectionBackdrop',
  component: SectionBackdrop,
  decorators: [
    (Story) => (
      <section className="relative isolate h-80 overflow-hidden">
        <Story />
        <p className="p-10">Section content sits above the backdrop.</p>
      </section>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof SectionBackdrop>;

export const Default: Story = { args: { src: '/images/abstract-backdrop.jpg' } };
export const Flipped: Story = { args: { src: '/images/abstract-backdrop.jpg', flipX: true, flipY: true } };
