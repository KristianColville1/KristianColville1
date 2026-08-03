import { FiMail, FiGithub, FiLinkedin, FiLink } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { ContactLink } from '../../content/types';

type FooterProps = {
  links: ContactLink[];
};

const ICONS: Record<string, IconType> = {
  Email: FiMail,
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
};

export function Footer({ links }: FooterProps) {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-base font-bold text-neutral-50">Kristian Colville</p>
            <p className="mt-1 text-sm text-neutral-400">Software Engineer · Ireland</p>
          </div>

          <nav aria-label="Contact" className="flex flex-col gap-3">
            <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-neutral-500">
              Get in touch
            </h2>
            {links.map((link) => {
              const isExternal = !link.href.startsWith('mailto:');
              const Icon = ICONS[link.label] ?? FiLink;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-blue-400"
                >
                  <Icon aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Kristian Colville. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
