import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import type { Certification } from '../../content/types';

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{certification.name}</h3>
        {certification.verifyUrl && <Badge tone="success">Verified</Badge>}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {certification.issuer} · {certification.date}
      </p>
      {certification.verifyUrl && (
        <Button href={certification.verifyUrl} variant="secondary" className="w-fit">
          Verify
        </Button>
      )}
    </div>
  );
}
