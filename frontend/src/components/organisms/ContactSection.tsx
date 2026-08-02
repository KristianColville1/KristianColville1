import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import type { ContactLink } from '../../content/types';

type ContactSectionProps = {
  links: ContactLink[];
};

export function ContactSection({ links }: ContactSectionProps) {
  return (
    <RevealSection id="contact" className="px-6 py-24 text-center">
      <Heading level={2}>Get in touch</Heading>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {links.map((link) => {
          const isExternal = !link.href.startsWith('mailto:');
          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="text-accent-purple hover:underline"
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </RevealSection>
  );
}
