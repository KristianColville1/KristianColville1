import { FiExternalLink } from 'react-icons/fi';
import type { Certification } from '../../content/types';

type CertificationRowProps = {
  certification: Certification;
};

export function CertificationRow({ certification }: CertificationRowProps) {
  return (
    <li className="flex items-center gap-4 border-b border-neutral-200 py-3 last:border-b-0 dark:border-neutral-800">
      {certification.image && (
        <img
          src={certification.image}
          alt=""
          loading="lazy"
          className="h-10 w-10 shrink-0 object-contain"
        />
      )}
      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-neutral-900 dark:text-neutral-50">{certification.name}</h4>
        {certification.date && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{certification.date}</p>
        )}
      </div>
      {certification.verifyUrl && (
        <a
          href={certification.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
        >
          Verify
          <FiExternalLink size={14} aria-hidden="true" />
        </a>
      )}
    </li>
  );
}
