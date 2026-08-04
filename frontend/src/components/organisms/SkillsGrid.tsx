import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { SkillGroupCard } from '../molecules/SkillGroupCard';
import type { SkillGroup } from '../../content/types';

type SkillsGridProps = {
  groups: SkillGroup[];
  summary: string;
};

export function SkillsGrid({ groups, summary }: SkillsGridProps) {
  return (
    <RevealSection id="skills" className="bg-neutral-50 px-6 py-24 dark:bg-neutral-900/40">
      <Heading level={2}>Skills</Heading>
      <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300">{summary}</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <SkillGroupCard key={group.title} group={group} />
        ))}
      </div>
    </RevealSection>
  );
}
