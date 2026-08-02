import { projects } from '../content/projects';
import type { Project } from '../content/types';

export function useProjects(): Project[] {
  return projects;
}
