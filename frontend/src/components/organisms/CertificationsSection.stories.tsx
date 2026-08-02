import type { Meta, StoryObj } from '@storybook/react-vite';
import { CertificationsSection } from './CertificationsSection';
import { certifications } from '../../content/certifications';

const meta: Meta<typeof CertificationsSection> = {
  title: 'Organisms/CertificationsSection',
  component: CertificationsSection,
};
export default meta;

type Story = StoryObj<typeof CertificationsSection>;

export const Default: Story = { args: { certifications } };
