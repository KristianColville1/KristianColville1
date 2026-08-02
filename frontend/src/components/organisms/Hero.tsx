import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { RevealSection } from '../atoms/RevealSection';

type HeroProps = {
  headline: string;
};

export function Hero({ headline }: HeroProps) {
  return (
    <RevealSection id="hero" className="flex flex-col gap-6 px-6 py-24 md:py-32">
      <Heading level={1}>{headline}</Heading>
      <Button href="#contact" variant="primary" className="w-fit">
        Get in touch
      </Button>
    </RevealSection>
  );
}
