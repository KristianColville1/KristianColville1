import { Heading } from '../atoms/Heading';
import { TechChip } from '../atoms/TechChip';
import { RevealSection } from '../atoms/RevealSection';
import type { SkillGroup } from '../../content/types';

type SkillsGridProps = {
  groups: SkillGroup[];
};

export function SkillsGrid({ groups }: SkillsGridProps) {
  return (
    <RevealSection id="skills" className="px-6 py-16">
      <Heading level={2}>Skills</Heading>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.title} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{group.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <TechChip key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
