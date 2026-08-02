type IconLinkProps = {
  href: string;
  label: string;
};

export function IconLink({ href, label }: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-neutral-500 transition-colors hover:text-accent-purple dark:text-neutral-400"
    >
      {label}
    </a>
  );
}
