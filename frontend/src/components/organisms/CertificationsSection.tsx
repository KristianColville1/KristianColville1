import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { CertificationCard } from '../molecules/CertificationCard';
import type { Certification } from '../../content/types';

type CertificationsSectionProps = {
  certifications: Certification[];
};

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <RevealSection id="certifications" className="px-6 py-16">
      <Heading level={2}>Certifications</Heading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <CertificationCard key={cert.name} certification={cert} />
        ))}
      </div>
    </RevealSection>
  );
}
