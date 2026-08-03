import { FiMail, FiGithub, FiLinkedin, FiLink } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import type { ContactLink } from '../../content/types';

type ContactSectionProps = {
  links: ContactLink[];
};

const ICONS: Record<string, IconType> = {
  Email: FiMail,
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
};

export function ContactSection({ links }: ContactSectionProps) {
  return (
    <RevealSection id="contact" className="px-6 py-24 text-center">
      <Heading level={2}>Get in touch</Heading>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {links.map((link) => {
          const isExternal = !link.href.startsWith('mailto:');
          const Icon = ICONS[link.label] ?? FiLink;
          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 text-violet-700 hover:underline dark:text-violet-300"
            >
              <Icon aria-hidden="true" />
              {link.label}
            </a>
          );
        })}
      </div>
    </RevealSection>
  );
}
