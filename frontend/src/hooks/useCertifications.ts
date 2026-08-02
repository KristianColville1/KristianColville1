import { certifications } from '../content/certifications';
import type { Certification } from '../content/types';

export function useCertifications(): Certification[] {
  return certifications;
}
