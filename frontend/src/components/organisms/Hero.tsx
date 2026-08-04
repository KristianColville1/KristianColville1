import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { RevealSection } from '../atoms/RevealSection';
import { SectionBackdrop } from '../atoms/SectionBackdrop';

type HeroProps = {
  headline: string;
  headlineSupport: string;
  identity: {
    name: string;
    role: string;
    disciplines: string[];
  };
};

export function Hero({ headline, headlineSupport, identity }: HeroProps) {
  return (
    <RevealSection id="hero" className="relative isolate overflow-hidden px-6 py-24 md:py-32">
      {/* The one place the abstract image still appears — reusing the section
          backdrop keeps its scroll parallax rather than dropping the effect. */}
      <SectionBackdrop src="/images/abstract-backdrop.jpg" flipY strong />

      {/* The layout lives here, not on the section: RevealSection puts its
          children inside a single wrapper, so flex classes on the section had
          nothing to space out and the headline's descenders ran into the CTA. */}
      <div className="flex flex-col gap-8">
        {/* Name the person and the discipline before the claim — the headline on
            its own left the first screenful anonymous. */}
        <div>
          <p className="font-display text-lg font-bold text-neutral-900 dark:text-neutral-50">
            {identity.name}
          </p>
          <p className="mt-1.5 text-sm text-neutral-700 dark:text-neutral-300">
            {identity.role}
            {identity.disciplines.map((discipline) => (
              <span key={discipline}>
                <span aria-hidden="true" className="mx-2 text-neutral-400 dark:text-neutral-600">
                  |
                </span>
                {discipline}
              </span>
            ))}
          </p>
        </div>

        <div>
          {/* pb-2 clears the descenders on the last line, which the line box
              doesn't account for. */}
          <Heading level={1} className="max-w-4xl pb-2">
            {headline}
          </Heading>
          <p className="mt-4 max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
            {headlineSupport}
          </p>
        </div>

        <Button href="#contact" variant="primary" size="lg" className="w-fit">
          Get in touch
        </Button>
      </div>
    </RevealSection>
  );
}
