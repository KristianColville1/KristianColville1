import { projects } from '../content/projects';
import type { Project } from '../content/types';

export function useProjects(): Project[] {
  return projects;
}

/** The handful that lead the home page — the rest live on /projects. */
export function useFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
