import { useState } from 'react';
import { Heading } from '../atoms/Heading';
import { ProgressBar } from '../atoms/ProgressBar';
import { Offcanvas } from '../atoms/Offcanvas';
import { RevealSection } from '../atoms/RevealSection';
import { SkillGroupCard } from '../molecules/SkillGroupCard';
import type { SkillGroup, SkillLevel, FocusArea } from '../../content/types';

type SkillsGridProps = {
  groups: SkillGroup[];
  focusAreas: FocusArea[];
};

const LEVEL_PERCENTAGE: Record<SkillLevel, number> = {
  Familiar: 25,
  Comfortable: 50,
  Proficient: 75,
  Expert: 100,
};

export function SkillsGrid({ groups, focusAreas }: SkillsGridProps) {
  const [openGroup, setOpenGroup] = useState<SkillGroup | null>(null);

  return (
    <RevealSection id="skills" className="px-6 py-16">
      <Heading level={2}>Skills</Heading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {focusAreas.map((area) => (
          <ProgressBar key={area.label} label={area.label} percentage={area.percentage} />
        ))}
      </div>
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
              <div className="mt-3">
                <ProgressBar label="Proficiency" percentage={LEVEL_PERCENTAGE[skill.level]} valueLabel={skill.level} />
              </div>
            </li>
          ))}
        </ul>
      </Offcanvas>
    </RevealSection>
  );
}
