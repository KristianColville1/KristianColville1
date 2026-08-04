import { motion, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiDocker,
  SiFfmpeg,
  SiKubernetes,
  SiLinux,
  SiPhp,
  SiPython,
  SiReact,
  SiPostgresql,
  SiNodedotjs,
} from 'react-icons/si';

// The stack the day job actually runs on, not everything I've touched.
const ICONS: { Icon: IconType; label: string }[] = [
  { Icon: SiLinux, label: 'Linux' },
  { Icon: SiFfmpeg, label: 'FFmpeg' },
  { Icon: SiKubernetes, label: 'Kubernetes' },
  { Icon: SiDocker, label: 'Docker' },
  { Icon: SiPhp, label: 'PHP' },
  { Icon: SiPython, label: 'Python' },
  { Icon: SiReact, label: 'React' },
  { Icon: SiPostgresql, label: 'PostgreSQL' },
  { Icon: SiNodedotjs, label: 'Node.js' },
];

const RADIUS = 40;

export function TechRing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      // Decorative: the same technologies are already listed in Skills as text.
      aria-hidden="true"
      // Explicit size: as a shrink-0 flex item there's no parent width for a
      // percentage to resolve against, and the ring collapsed to a dot.
      className="relative h-60 w-60 md:h-72 md:w-72"
    >
      <div className="absolute inset-[10%] rounded-full border border-neutral-200 dark:border-neutral-800" />
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
      >
        {ICONS.map(({ Icon, label }, index) => {
          const angle = (index / ICONS.length) * 2 * Math.PI - Math.PI / 2;
          const left = 50 + Math.cos(angle) * RADIUS;
          const top = 50 + Math.sin(angle) * RADIUS;

          return (
            <motion.span
              key={label}
              className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
              style={{ left: `${left}%`, top: `${top}%` }}
              // Counter-rotate so the marks stay upright as the ring turns.
              animate={prefersReducedMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 70, ease: 'linear', repeat: Infinity }}
            >
              <Icon size={20} />
            </motion.span>
          );
        })}
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-xs font-medium uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
          Stack
        </span>
      </div>
    </div>
  );
}
