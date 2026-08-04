import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';

type RevealSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function RevealSection({ id, children, className = '' }: RevealSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isRevealed } = useRevealOnScroll();

  // MotionConfig's reducedMotion only drops the transform, not the fade, which
  // left these visitors reading a page gated behind an animation they had asked
  // not to have. Content should never depend on motion to become visible.
  if (prefersReducedMotion) {
    return (
      <section id={id} className={className}>
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </motion.section>
  );
}
