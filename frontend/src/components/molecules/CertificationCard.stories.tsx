import type { Meta, StoryObj } from '@storybook/react-vite';
import { CertificationCard } from './CertificationCard';

const meta: Meta<typeof CertificationCard> = {
  title: 'Molecules/CertificationCard',
  component: CertificationCard,
};
export default meta;

type Story = StoryObj<typeof CertificationCard>;

export const WithVerifyLink: Story = {
  args: {
    certification: {
      name: 'Sample Certification',
      issuer: 'Sample Issuer',
      date: '2024-01-01',
      verifyUrl: 'https://example.com/verify',
    },
  },
};

export const WithoutVerifyLink: Story = {
  args: {
    certification: { name: 'Unverified Certification', issuer: 'Sample Issuer', date: '2023-06-01' },
  },
};
