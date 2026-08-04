import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Heading } from '../atoms/Heading';
import { RevealSection } from '../atoms/RevealSection';
import { ProjectCard } from '../molecules/ProjectCard';
import type { Project } from '../../content/types';

type ProjectsSectionProps = {
  projects: Project[];
  totalCount: number;
};

export function ProjectsSection({ projects, totalCount }: ProjectsSectionProps) {
  const remaining = totalCount - projects.length;

  return (
    <RevealSection id="projects" className="px-6 py-16">
      {/* "Selected work" rather than a status taxonomy: whether a contract is
          still running says nothing about whether the work is worth reading. */}
      <Heading level={2}>Selected work</Heading>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {remaining > 0 && (
        <Link
          to="/projects"
          className="focus-ring mt-8 inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
        >
          See all {totalCount} projects
          <FiArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </RevealSection>
  );
}
