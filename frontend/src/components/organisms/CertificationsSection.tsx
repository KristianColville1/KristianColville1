import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { SectionBackdrop } from '../atoms/SectionBackdrop';
import { CertificationCard } from '../molecules/CertificationCard';
import type { Certification } from '../../content/types';

type CertificationsSectionProps = {
  certifications: Certification[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <RevealSection id="certifications" className="relative isolate overflow-hidden px-6 py-24">
      <SectionBackdrop src="/images/abstract-backdrop.jpg" flipX />
      <Heading level={2}>Certifications</Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <CertificationCard key={cert.name} certification={cert} />
        ))}
      </div>
    </RevealSection>
  );
}
