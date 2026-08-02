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
        active ? 'text-accent-orange' : 'text-neutral-600 hover:text-accent-orange dark:text-neutral-300'
      }`}
    >
      {label}
    </a>
  );
}
