import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { SectionBackdrop } from '../atoms/SectionBackdrop';
import { CertificationRow } from '../molecules/CertificationRow';
import type { Certification } from '../../content/types';

type CertificationsSectionProps = {
  certifications: Certification[];
};

function groupByIssuer(certifications: Certification[]) {
  const issuers: string[] = [];
  for (const certification of certifications) {
    if (!issuers.includes(certification.issuer)) issuers.push(certification.issuer);
  }
  return issuers.map((issuer) => ({
    issuer,
    items: certifications.filter((certification) => certification.issuer === issuer),
  }));
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const groups = groupByIssuer(certifications);

  return (
    <RevealSection id="certifications" className="relative isolate overflow-hidden px-6 py-24">
      <SectionBackdrop src="/images/abstract-backdrop.jpg" flipX />
      <Heading level={2}>Certifications</Heading>
      <div className="mt-8 flex flex-col gap-8">
        {groups.map((group) => (
          <div
            key={group.issuer}
            className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <Heading level={3}>{group.issuer}</Heading>
            <ul className="mt-3">
              {group.items.map((certification) => (
                <CertificationRow key={certification.name} certification={certification} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
