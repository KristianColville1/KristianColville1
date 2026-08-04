import { Heading } from '../atoms/Heading';
import { ProjectCard } from '../molecules/ProjectCard';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';
import type { ContactLink, Project } from '../../content/types';

type ProjectsIndexTemplateProps = {
  projects: Project[];
  contactLinks: ContactLink[];
};

export function ProjectsIndexTemplate({ projects, contactLinks }: ProjectsIndexTemplateProps) {
  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16" data-testid="projects-index-page">
        <Heading level={1}>All projects</Heading>
        <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300">
          Everything I&rsquo;ve built for clients, newest work first. Each one has a write-up of the
          problem, the approach and what it does in production.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <Footer links={contactLinks} />
    </div>
  );
}
