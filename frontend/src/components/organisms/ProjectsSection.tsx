import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { ProjectCard } from '../molecules/ProjectCard';
import type { Project } from '../../content/types';

type ProjectsSectionProps = {
  projects: Project[];
};

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <RevealSection id="projects" className="px-6 py-16">
      <Heading level={2}>Projects</Heading>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </RevealSection>
  );
}
