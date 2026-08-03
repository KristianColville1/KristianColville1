import { FiChevronRight } from 'react-icons/fi';
import { TechChip } from '../atoms/TechChip';
import type { SkillGroup } from '../../content/types';

type SkillGroupCardProps = {
  group: SkillGroup;
  onOpen: () => void;
};

export function SkillGroupCard({ group, onOpen }: SkillGroupCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-left transition-colors hover:border-accent-purple/50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-accent-purple/50"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{group.title}</h3>
        <FiChevronRight className="text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <TechChip key={skill.name} label={skill.name} />
        ))}
      </div>
    </button>
  );
}
