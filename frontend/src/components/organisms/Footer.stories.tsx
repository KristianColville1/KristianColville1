import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';
import { contactLinks } from '../../content/contact';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = { args: { links: contactLinks } };
