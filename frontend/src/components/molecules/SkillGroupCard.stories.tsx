import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillGroupCard } from './SkillGroupCard';
import { skillGroups } from '../../content/skills';

const meta: Meta<typeof SkillGroupCard> = {
  title: 'Molecules/SkillGroupCard',
  component: SkillGroupCard,
};
export default meta;

type Story = StoryObj<typeof SkillGroupCard>;

export const Default: Story = { args: { group: skillGroups[0], onOpen: () => {} } };
