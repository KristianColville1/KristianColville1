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
          ? 'text-orange-700 dark:text-orange-300'
          : 'text-neutral-600 hover:text-orange-700 dark:text-neutral-300 dark:hover:text-orange-300'
      }`}
    >
      {label}
    </a>
  );
}
