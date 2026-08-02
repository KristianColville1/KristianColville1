import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillsGrid } from './SkillsGrid';
import { skillGroups } from '../../content/skills';

const meta: Meta<typeof SkillsGrid> = {
  title: 'Organisms/SkillsGrid',
  component: SkillsGrid,
};
export default meta;

type Story = StoryObj<typeof SkillsGrid>;

export const Default: Story = { args: { groups: skillGroups } };
