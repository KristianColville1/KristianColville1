type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
};

export function NavLink({ href, label, active, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${
        active
          ? 'text-blue-700 dark:text-blue-400'
          : 'text-neutral-600 hover:text-blue-700 dark:text-neutral-300 dark:hover:text-blue-400'
      }`}
    >
      {label}
    </a>
  );
}
