import type { SkillLevel } from '../../content/types';

type SkillLevelIndicatorProps = {
  level: SkillLevel;
};

const LEVELS: SkillLevel[] = ['Familiar', 'Comfortable', 'Proficient', 'Expert'];

export function SkillLevelIndicator({ level }: SkillLevelIndicatorProps) {
  const filled = LEVELS.indexOf(level) + 1;

  return (
    <div className="flex items-center gap-3" aria-label={`Proficiency: ${level}`}>
      <div className="flex gap-1">
        {LEVELS.map((step, index) => (
          <span
            key={step}
            className={`h-1.5 w-6 rounded-full ${
              index < filled ? 'bg-accent-purple' : 'bg-neutral-200 dark:bg-neutral-800'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{level}</span>
    </div>
  );
}
