import type { Meta, StoryObj } from '@storybook/react-vite';
import { Offcanvas } from './Offcanvas';

const meta: Meta<typeof Offcanvas> = {
  title: 'Atoms/Offcanvas',
  component: Offcanvas,
};
export default meta;

type Story = StoryObj<typeof Offcanvas>;

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Languages',
    onClose: () => {},
    children: <p>Panel content goes here.</p>,
  },
};
