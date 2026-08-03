import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavDropdown } from './NavDropdown';

const meta: Meta<typeof NavDropdown> = {
  title: 'Molecules/NavDropdown',
  component: NavDropdown,
};
export default meta;

type Story = StoryObj<typeof NavDropdown>;

const sections = [
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
];

export const Default: Story = { args: { label: 'Background', sections, activeId: '' } };
export const WithActiveChild: Story = { args: { label: 'Background', sections, activeId: 'education' } };
