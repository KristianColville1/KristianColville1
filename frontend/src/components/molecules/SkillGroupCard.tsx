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
      className="flex cursor-pointer flex-col gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900"
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
