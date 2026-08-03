import type { Achievement } from '../../content/types';

type AchievementCardProps = {
  achievement: Achievement;
};

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      {achievement.image && (
        <img
          src={achievement.image}
          alt={achievement.name}
          loading="lazy"
          className="h-56 w-full rounded-md bg-white object-contain p-3"
        />
      )}
      <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{achievement.name}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {achievement.issuer} · {achievement.date}
      </p>
      <p className="text-sm text-neutral-700 dark:text-neutral-300">{achievement.description}</p>
    </div>
  );
}
