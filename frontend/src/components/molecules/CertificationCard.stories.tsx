import type { Meta, StoryObj } from '@storybook/react-vite';
import { CertificationCard } from './CertificationCard';
import { certifications } from '../../content/certifications';

const meta: Meta<typeof CertificationCard> = {
  title: 'Molecules/CertificationCard',
  component: CertificationCard,
};
export default meta;

type Story = StoryObj<typeof CertificationCard>;

export const WithBadgeImage: Story = { args: { certification: certifications[0] } };

export const WithoutImageOrDate: Story = {
  args: { certification: certifications[certifications.length - 1] },
};

export const WithoutVerifyLink: Story = {
  args: { certification: { name: 'Unverified Certification', issuer: 'Sample Issuer', date: 'June 2023' } },
};
