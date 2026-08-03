import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
};

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-accent-orange text-neutral-950 hover:bg-accent-orange/90',
  secondary:
    'border border-blue-600/50 text-blue-700 hover:bg-blue-600/10 dark:border-blue-400/50 dark:text-blue-400',
};

export function Button({ children, variant = 'primary', href, onClick, className = '' }: ButtonProps) {
  const classes = `inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${VARIANT_CLASSES[variant]} ${className}`;

  if (href) {
    const isExternal = !href.startsWith('#') && !href.startsWith('mailto:');
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
