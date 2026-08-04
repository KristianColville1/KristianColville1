import { TechChip } from '../atoms/TechChip';
import type { SkillGroup } from '../../content/types';

type SkillGroupCardProps = {
  group: SkillGroup;
};

export function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{group.title}</h3>
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <TechChip key={skill.name} label={skill.name} />
        ))}
      </div>
    </div>
  );
}
