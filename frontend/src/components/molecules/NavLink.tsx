import { Link } from 'react-router-dom';

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
};

export function NavLink({ href, label, active, onClick, className = '' }: NavLinkProps) {
  const classes = `focus-ring text-sm font-medium transition-colors ${
    active
      ? 'text-blue-700 dark:text-blue-300'
      : 'text-neutral-600 hover:text-blue-700 dark:text-neutral-300 dark:hover:text-blue-300'
  } ${className}`;

  // A leading slash means the section lives on another route and needs a real
  // navigation; bare hashes stay plain anchors so the browser keeps its own
  // smooth scrolling on the page we're already on.
  if (href.startsWith('/')) {
    return (
      <Link to={href} onClick={onClick} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} className={classes}>
      {label}
    </a>
  );
}
