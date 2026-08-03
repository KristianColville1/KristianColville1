import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

type SectionBackdropProps = {
  src: string;
  flipX?: boolean;
  flipY?: boolean;
};

export function SectionBackdrop({ src, flipX = false, flipY = false }: SectionBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Progress from this backdrop entering the viewport to leaving it.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // ±18% of a 160%-tall image is roughly a third of the section's height in
  // travel — enough to actually read as movement at these low opacities.
  const y = useTransform(scrollYProgress, [0, 1], ['-18%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.12, 1.04]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      {/* The flip lives on a wrapper so it can't fight the animated transform below. */}
      <div
        className={`absolute inset-0 ${flipX ? 'scale-x-[-1]' : ''} ${flipY ? 'scale-y-[-1]' : ''}`}
      >
        <motion.img
          src={src}
          alt=""
          loading="lazy"
          style={prefersReducedMotion ? undefined : { y, scale }}
          // Oversized and offset so the drift never exposes an edge: at maximum
          // travel the image still overhangs the section top and bottom.
          className="absolute inset-x-0 top-[-35%] h-[170%] w-full object-cover opacity-20 will-change-transform dark:opacity-[0.14]"
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-neutral-950" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-neutral-950" />
    </div>
  );
}
