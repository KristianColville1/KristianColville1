type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
};

export function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <a
      href={href}
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
