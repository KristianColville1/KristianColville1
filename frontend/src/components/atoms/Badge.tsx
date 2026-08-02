import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  tone?: 'neutral' | 'success';
};

const TONE_CLASSES: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
  success: 'bg-accent-mint/20 text-emerald-700 dark:text-accent-mint',
};

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}>
      {children}
    </span>
  );
}
