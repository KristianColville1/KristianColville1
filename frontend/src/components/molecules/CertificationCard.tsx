import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import type { Certification } from '../../content/types';

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900">
      {certification.image && (
        <img
          src={certification.image}
          alt={certification.name}
          loading="lazy"
          className="h-40 w-full bg-white object-contain"
        />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{certification.name}</h3>
          {certification.verifyUrl && <Badge tone="success">Verified</Badge>}
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {certification.issuer}
          {certification.date && ` · ${certification.date}`}
        </p>
        {certification.verifyUrl && (
          <Button href={certification.verifyUrl} variant="secondary" className="mt-auto w-fit">
            Verify
          </Button>
        )}
      </div>
    </div>
  );
}
