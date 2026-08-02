import type { ReactNode } from 'react';

type HeadingProps = {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
};

const LEVEL_CLASSES: Record<NonNullable<HeadingProps['level']>, string> = {
  1: 'text-4xl md:text-6xl font-bold tracking-tight',
  2: 'text-2xl md:text-4xl font-bold tracking-tight',
  3: 'text-lg md:text-xl font-semibold',
};

export function Heading({ level = 2, children, className = '' }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
  return (
    <Tag className={`font-display text-neutral-900 dark:text-neutral-50 ${LEVEL_CLASSES[level]} ${className}`}>
      {children}
    </Tag>
  );
}
