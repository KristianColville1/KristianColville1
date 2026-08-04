import { useEffect, useRef, useState } from 'react';

// How far into the viewport the element's top edge must come before it reveals.
const TRIGGER_OFFSET = 120;

/**
 * Reveals an element once its top edge has reached the viewport — deliberately
 * a scroll-position comparison rather than an IntersectionObserver.
 *
 * An observer only fires while an element actually intersects, which failed two
 * ways on mobile: a section taller than the screen could never satisfy a
 * fractional threshold, and a fast flick that skipped a section entirely never
 * produced a callback at all, so it stayed blank on the way back up. Comparing
 * positions instead means anything level with or above the viewport is revealed
 * no matter how abruptly we arrived there.
 */
export function useRevealOnScroll() {
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isRevealed) return;

    let frame = 0;

    const check = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      if (element.getBoundingClientRect().top < window.innerHeight - TRIGGER_OFFSET) {
        setIsRevealed(true);
      }
    };

    // Coalesce bursts of scroll events into one measurement per frame.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [isRevealed]);

  return { ref, isRevealed };
}
