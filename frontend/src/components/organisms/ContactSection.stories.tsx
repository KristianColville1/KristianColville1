import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactSection } from './ContactSection';
import { contactLinks } from '../../content/contact';

const meta: Meta<typeof ContactSection> = {
  title: 'Organisms/ContactSection',
  component: ContactSection,
};
export default meta;

type Story = StoryObj<typeof ContactSection>;

export const Default: Story = { args: { links: contactLinks } };
