import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { ProjectCard } from '../molecules/ProjectCard';
import type { Project } from '../../content/types';

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const clientProjects = projects.filter((project) => project.category === 'client');
  const personalProjects = projects.filter((project) => project.category === 'personal');

  return (
    <RevealSection id="projects" className="px-6 py-16">
      <Heading level={2}>Projects</Heading>
      {clientProjects.length > 0 && (
        <div className="mt-8">
          <Heading level={3}>Client Work</Heading>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {clientProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
      {personalProjects.length > 0 && (
        <div className="mt-10">
          <Heading level={3}>Personal Projects</Heading>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {personalProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
    </RevealSection>
  );
}
