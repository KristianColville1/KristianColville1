import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { RevealSection } from '../atoms/RevealSection';

type HeroProps = {
  headline: string;
};

export function Hero({ headline }: HeroProps) {
  return (
    <RevealSection
      id="hero"
      className="relative isolate flex flex-col gap-6 overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/abstract-backdrop.jpg"
          alt=""
          className="h-full w-full scale-y-[-1] object-cover opacity-35 dark:opacity-30"
        />
        <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-white to-transparent dark:from-neutral-950" />
      </div>
      <Heading level={1}>{headline}</Heading>
      <Button href="#contact" variant="primary" className="w-fit">
        Get in touch
      </Button>
    </RevealSection>
  );
}
