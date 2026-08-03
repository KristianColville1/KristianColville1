import { Link } from 'react-router-dom';
import { Heading } from '../atoms/Heading';
import { TechChip } from '../atoms/TechChip';
import { Button } from '../atoms/Button';
import type { Project } from '../../content/types';

type ProjectDetailTemplateProps = {
  project: Project;
};

export function ProjectDetailTemplate({ project }: ProjectDetailTemplateProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16" data-testid="project-detail-page">
      <Link to="/" className="text-sm text-blue-700 hover:underline dark:text-blue-400">
        ← Back home
      </Link>
      <Heading level={1} className="mt-4">
        {project.name}
      </Heading>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TechChip key={tech} label={tech} />
        ))}
      </div>
      <div className="mt-4 flex gap-3">
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

      <section className="mt-10 space-y-8">
        <div>
          <Heading level={3}>Problem</Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.problem}</p>
        </div>
        <div>
          <Heading level={3}>Approach</Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.approach}</p>
        </div>
        <div>
          <Heading level={3}>Key decisions</Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.decisions}</p>
        </div>
        <div>
          <Heading level={3}>Outcome</Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.outcome}</p>
        </div>
      </section>
    </article>
  );
}
