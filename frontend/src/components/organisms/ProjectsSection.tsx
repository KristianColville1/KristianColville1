import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { ProjectCard } from '../molecules/ProjectCard';
import type { Project } from '../../content/types';

type ProjectsSectionProps = {
  projects: Project[];
};

const GROUPS: { title: string; match: (project: Project) => boolean }[] = [
  {
    title: 'Active Client Work',
    match: (project) => project.category === 'client' && project.status === 'active',
  },
  {
    title: 'Completed Client Work',
    match: (project) => project.category === 'client' && project.status === 'completed',
  },
  { title: 'Personal Projects', match: (project) => project.category === 'personal' },
];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <RevealSection id="projects" className="px-6 py-16">
      <Heading level={2}>Projects</Heading>
      <div className="mt-8 flex flex-col gap-10">
        {GROUPS.map((group) => {
          const items = projects.filter(group.match);
          if (items.length === 0) return null;

          return (
            <div key={group.title}>
              <Heading level={3}>{group.title}</Heading>
              <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </RevealSection>
  );
}
