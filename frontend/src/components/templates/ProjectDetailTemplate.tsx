import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Heading } from '../atoms/Heading';
import { TechChip } from '../atoms/TechChip';
import { Button } from '../atoms/Button';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import type { ContactLink, Project } from '../../content/types';

type ProjectDetailTemplateProps = {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
  contactLinks: ContactLink[];
};

export function ProjectDetailTemplate({
  project,
  previousProject,
  nextProject,
  contactLinks,
}: ProjectDetailTemplateProps) {
  const emailLink = contactLinks.find((link) => link.label === 'Email');

  return (
    <div>
      <Navbar />
      <article className="mx-auto max-w-3xl px-6 py-16" data-testid="project-detail-page">
        <Link
          to="/"
          className="focus-ring inline-flex min-h-11 items-center rounded-md text-sm text-blue-700 hover:underline dark:text-blue-300"
        >
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

        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} interface`}
            className="mt-8 w-full rounded-lg border border-neutral-200 object-cover dark:border-neutral-800"
          />
        ) : (
          project.logo && (
            <img
              src={project.logo}
              alt={`${project.name} logo`}
              className="mt-8 h-40 w-full rounded-lg border border-neutral-200 bg-white object-contain p-8 dark:border-neutral-800 dark:bg-neutral-200"
            />
          )
        )}

        {/* Level 2 under the page's H1 — these were H3s, skipping a level. The
            size prop keeps them reading as subsections. */}
        <section className="mt-10 space-y-8">
          <div>
            <Heading level={2} size={3}>
              Problem
            </Heading>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.problem}</p>
          </div>
          <div>
            <Heading level={2} size={3}>
              Approach
            </Heading>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.approach}</p>
          </div>
          <div>
            <Heading level={2} size={3}>
              Key decisions
            </Heading>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.decisions}</p>
          </div>
          {project.caseStudy.challenge && (
            <div>
              <Heading level={2} size={3}>
                Notable challenge
              </Heading>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.challenge}</p>
            </div>
          )}
          <div>
            <Heading level={2} size={3}>
              Outcome
            </Heading>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">{project.caseStudy.outcome}</p>
          </div>
        </section>

        {/* Someone who read to the end previously had nowhere to go from here. */}
        <section className="mt-16 rounded-lg border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900">
          <Heading level={2} size={3}>
            Interested in work like this?
          </Heading>
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            I&rsquo;m happy to talk through how any of this was built, or what I could do for you.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {emailLink && (
              <Button href={emailLink.href} variant="primary">
                Email me
              </Button>
            )}
            <Link
              to="/#contact"
              className="focus-ring inline-flex min-h-11 items-center rounded-md text-sm font-medium text-blue-700 hover:underline dark:text-blue-300"
            >
              All contact details
            </Link>
          </div>
        </section>

        {(previousProject || nextProject) && (
          <nav
            aria-label="More projects"
            className="mt-12 flex flex-col gap-2 border-t border-neutral-200 pt-6 sm:flex-row sm:justify-between dark:border-neutral-800"
          >
            {previousProject ? (
              <Link
                to={`/projects/${previousProject.slug}`}
                className="focus-ring inline-flex min-h-11 max-w-full items-center gap-2 rounded-md text-sm text-neutral-600 hover:text-blue-700 dark:text-neutral-300 dark:hover:text-blue-300"
              >
                <FiArrowLeft size={16} aria-hidden="true" className="shrink-0" />
                <span className="truncate">{previousProject.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject && (
              <Link
                to={`/projects/${nextProject.slug}`}
                className="focus-ring inline-flex min-h-11 max-w-full items-center gap-2 rounded-md text-sm text-neutral-600 hover:text-blue-700 dark:text-neutral-300 dark:hover:text-blue-300"
              >
                <span className="truncate">{nextProject.name}</span>
                <FiArrowRight size={16} aria-hidden="true" className="shrink-0" />
              </Link>
            )}
          </nav>
        )}
      </article>
      <Footer links={contactLinks} />
    </div>
  );
}
