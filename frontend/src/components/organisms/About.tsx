import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';

type AboutProps = {
  about: string;
};

export function About({ about }: AboutProps) {
  return (
    <RevealSection id="about" className="px-6 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Heading level={2}>About</Heading>
          <p className="mt-4 text-neutral-700 dark:text-neutral-300">{about}</p>
        </div>
        <img
          src="/images/abstract-about.jpg"
          alt=""
          loading="lazy"
          className="hidden h-64 w-full rounded-lg object-cover shadow-lg md:block"
        />
      </div>
    </RevealSection>
  );
}
