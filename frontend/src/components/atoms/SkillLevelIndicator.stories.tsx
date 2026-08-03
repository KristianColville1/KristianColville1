import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillLevelIndicator } from './SkillLevelIndicator';

const meta: Meta<typeof SkillLevelIndicator> = {
  title: 'Atoms/SkillLevelIndicator',
  component: SkillLevelIndicator,
};
export default meta;

type Story = StoryObj<typeof SkillLevelIndicator>;

export const Familiar: Story = { args: { level: 'Familiar' } };
export const Comfortable: Story = { args: { level: 'Comfortable' } };
export const Proficient: Story = { args: { level: 'Proficient' } };
export const Expert: Story = { args: { level: 'Expert' } };
