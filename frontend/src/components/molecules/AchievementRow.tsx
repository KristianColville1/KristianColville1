import type { Achievement } from '../../content/types';

type AchievementRowProps = {
  achievement: Achievement;
};

export function AchievementRow({ achievement }: AchievementRowProps) {
  return (
    <li className="flex gap-4 border-b border-neutral-200 py-4 last:border-b-0 dark:border-neutral-800">
      {achievement.image && (
        <img
          src={achievement.image}
          alt=""
          loading="lazy"
          className="h-10 w-10 shrink-0 object-contain"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h4 className="font-medium text-neutral-900 dark:text-neutral-50">{achievement.name}</h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {achievement.issuer} · {achievement.date}
          </p>
        </div>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{achievement.description}</p>
      </div>
    </li>
  );
}
