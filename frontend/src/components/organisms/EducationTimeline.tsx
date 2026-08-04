import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import type { EducationEntry } from '../../content/types';

type EducationTimelineProps = {
  entries: EducationEntry[];
};

export function EducationTimeline({ entries }: EducationTimelineProps) {
  return (
    <RevealSection id="education" className="px-6 py-16">
      <Heading level={2}>Education</Heading>
      <ol className="mt-8 space-y-6 border-l border-neutral-200 pl-6 dark:border-neutral-800">
        {entries.map((entry) => (
          <li key={`${entry.institution}-${entry.start}`}>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{entry.qualification}</h3>
            {entry.body && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{entry.body}</p>
            )}
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {entry.institution} · {entry.start} — {entry.end}
            </p>
          </li>
        ))}
      </ol>
    </RevealSection>
  );
}
