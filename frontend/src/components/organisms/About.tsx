import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';

type AboutProps = {
  about: string;
};

export function About({ about }: AboutProps) {
  return (
    <RevealSection id="about" className="px-6 py-16">
      <Heading level={2}>About</Heading>
      <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300">{about}</p>
    </RevealSection>
  );
}
