import { useState } from 'react';
import { Heading } from '../atoms/Heading';
import { Offcanvas } from '../atoms/Offcanvas';
import { RevealSection } from '../atoms/RevealSection';
import { SkillLevelIndicator } from '../atoms/SkillLevelIndicator';
import { SkillGroupCard } from '../molecules/SkillGroupCard';
import type { SkillGroup } from '../../content/types';

type SkillsGridProps = {
  groups: SkillGroup[];
  summary: string;
};

export function SkillsGrid({ groups, summary }: SkillsGridProps) {
  const [openGroup, setOpenGroup] = useState<SkillGroup | null>(null);

  return (
    <RevealSection id="skills" className="px-6 py-16">
      <Heading level={2}>Skills</Heading>
      <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300">{summary}</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <SkillGroupCard key={group.title} group={group} onOpen={() => setOpenGroup(group)} />
        ))}
      </div>
      <Offcanvas isOpen={openGroup !== null} onClose={() => setOpenGroup(null)} title={openGroup?.title}>
        <ul className="flex flex-col gap-6">
          {openGroup?.items.map((skill) => (
            <li key={skill.name}>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{skill.name}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{skill.usage}</p>
              <div className="mt-2">
                <SkillLevelIndicator level={skill.level} />
              </div>
            </li>
          ))}
        </ul>
      </Offcanvas>
    </RevealSection>
  );
}
