import type { ReactNode } from 'react';
import { isExternalLink } from '../../lib/links';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-orange-500 font-semibold text-neutral-950 shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 hover:bg-orange-400 hover:shadow-xl hover:shadow-orange-500/40',
  secondary:
    'border border-blue-600/50 text-blue-700 hover:bg-blue-600/10 dark:border-blue-400/50 dark:text-blue-400',
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  md: 'px-4 py-2 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const classes = `inline-flex cursor-pointer items-center gap-2 rounded-md font-medium transition-all duration-200 ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    const isExternal = isExternalLink(href);
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
