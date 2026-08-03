import { useReducedMotion } from 'framer-motion';
import { Heading } from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { RevealSection } from '../atoms/RevealSection';
import { useTypewriter } from '../../hooks/useTypewriter';
import type { Headline } from '../../content/types';

type HeroProps = {
  headline: Headline;
};

export function Hero({ headline }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const typedWord = useTypewriter(headline.words, !prefersReducedMotion);
  const longestWord = headline.words.reduce((a, b) => (b.length > a.length ? b : a), '');

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

      <Heading level={1}>
        {/* Screen readers get the sentence as prose; the animation is decorative. */}
        <span className="sr-only">
          {headline.prefix} {headline.words[0]} {headline.suffix}
        </span>
        <span aria-hidden="true">
          {headline.prefix}{' '}
          {/* Reserve the widest word so the rest of the sentence never reflows. */}
          <span className="relative inline-block whitespace-nowrap align-bottom">
            <span className="invisible">{longestWord}</span>
            <span className="absolute inset-y-0 left-0 text-blue-700 dark:text-blue-400">
              {typedWord}
              <span className="ml-0.5 inline-block h-[0.85em] w-[0.5ch] translate-y-[0.08em] animate-cursor bg-blue-700 align-middle dark:bg-blue-400" />
            </span>
          </span>{' '}
          {headline.suffix}
        </span>
      </Heading>

      <Button href="#contact" variant="primary" size="lg" className="w-fit">
        Get in touch
      </Button>
    </RevealSection>
  );
}
