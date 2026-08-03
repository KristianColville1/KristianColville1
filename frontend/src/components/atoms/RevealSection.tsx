import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function RevealSection({ id, children, className = '' }: RevealSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </motion.section>
  );
}
