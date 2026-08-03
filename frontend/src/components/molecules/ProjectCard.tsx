import { Link } from 'react-router-dom';
import { TechChip } from '../atoms/TechChip';
import { Button } from '../atoms/Button';
import type { Project } from '../../content/types';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900">
      <h3 className="font-display text-xl font-semibold text-neutral-900 dark:text-neutral-50">{project.name}</h3>
      <p className="text-neutral-600 dark:text-neutral-300">{project.pitch}</p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={`/projects/${project.slug}`}
          className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-400"
        >
          Read case study
        </Link>
        {project.liveUrl && (
          <Button href={project.liveUrl} variant="primary">
            Live demo
          </Button>
        )}
        {project.repoUrl && (
          <Button href={project.repoUrl} variant="secondary">
            GitHub
          </Button>
        )}
      </div>
    </article>
  );
}
