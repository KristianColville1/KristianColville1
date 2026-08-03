import type { Meta, StoryObj } from '@storybook/react-vite';
import { CertificationRow } from './CertificationRow';
import { certifications } from '../../content/certifications';

const meta: Meta<typeof CertificationRow> = {
  title: 'Molecules/CertificationRow',
  component: CertificationRow,
  decorators: [
    (Story) => (
      <ul className="max-w-2xl">
        <Story />
      </ul>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CertificationRow>;

export const WithBadge: Story = { args: { certification: certifications[0] } };

export const WithoutBadgeOrDate: Story = {
  args: { certification: { name: 'Pending Certification', issuer: 'Microsoft' } },
};
