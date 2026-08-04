import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { TechRing } from '../atoms/TechRing';

type AboutProps = {
  about: string;
};

export function About({ about }: AboutProps) {
  return (
    <RevealSection id="about" className="px-6 py-16">
      <Heading level={2}>About</Heading>
      {/* Prose keeps a readable measure; the ring occupies the space that measure
          leaves empty on a wide screen instead of letting the page run ragged. */}
      <div className="mt-4 flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-16">
        <p className="max-w-2xl text-neutral-700 dark:text-neutral-300">{about}</p>
        <TechRing />
      </div>
    </RevealSection>
  );
}
