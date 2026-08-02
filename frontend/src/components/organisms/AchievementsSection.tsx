import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { AchievementCard } from '../molecules/AchievementCard';
import type { Achievement } from '../../content/types';

type AchievementsSectionProps = {
  achievements: Achievement[];
};

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <RevealSection id="achievements" className="px-6 py-16">
      <Heading level={2}>Achievements</Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.name} achievement={achievement} />
        ))}
      </div>
    </RevealSection>
  );
}
