import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { AchievementRow } from '../molecules/AchievementRow';
import type { Achievement } from '../../content/types';

type AchievementsSectionProps = {
  achievements: Achievement[];
};

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <RevealSection id="achievements" className="px-6 py-16">
      <Heading level={2}>Achievements</Heading>
      <ul className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 px-6 dark:border-neutral-800 dark:bg-neutral-900">
        {achievements.map((achievement) => (
          <AchievementRow key={achievement.name} achievement={achievement} />
        ))}
      </ul>
    </RevealSection>
  );
}
