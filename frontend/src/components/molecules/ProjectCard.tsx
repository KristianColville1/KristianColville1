import { Link } from 'react-router-dom';
import { TechChip } from '../atoms/TechChip';
import { Button } from '../atoms/Button';
import type { Project } from '../../content/types';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900">
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} interface`}
          loading="lazy"
          className="h-44 w-full border-b border-neutral-200 object-cover object-top dark:border-neutral-800"
        />
      ) : (
        project.logo && (
          <img
            src={project.logo}
            alt={`${project.name} logo`}
            loading="lazy"
            className="h-44 w-full border-b border-neutral-200 bg-white object-contain p-8 dark:border-neutral-800 dark:bg-neutral-200"
          />
        )
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h4 className="font-display text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          {project.name}
        </h4>
        <p className="text-neutral-600 dark:text-neutral-300">{project.pitch}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <TechChip key={tech} label={tech} />
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          {/* The pseudo-element stretches this link over the whole card, so the
              card is one big tap target without nesting the buttons inside a
              link. The buttons opt back out with `relative`. */}
          <Link
            to={`/projects/${project.slug}`}
            className="focus-ring inline-flex min-h-11 items-center rounded-md text-sm font-medium text-blue-700 after:absolute after:inset-0 group-hover:underline dark:text-blue-300"
          >
            Read case study
          </Link>
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="primary" className="relative">
              Live demo
            </Button>
          )}
          {project.repoUrl && (
            <Button href={project.repoUrl} variant="secondary" className="relative">
              GitHub
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
