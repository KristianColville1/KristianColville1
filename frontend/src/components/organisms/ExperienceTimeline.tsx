import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import type { ExperienceEntry } from '../../content/types';

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <RevealSection id="experience" className="px-6 py-16">
      <Heading level={2}>Experience</Heading>
      <ol className="mt-8 space-y-6 border-l border-neutral-200 pl-6 dark:border-neutral-800">
        {entries.map((entry) => (
          <li key={`${entry.company}-${entry.start}`}>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-50">
              {entry.role} · {entry.company}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {entry.start} — {entry.end}
            </p>
            <p className="mt-1 text-neutral-700 dark:text-neutral-300">{entry.summary}</p>
          </li>
        ))}
      </ol>
    </RevealSection>
  );
}
