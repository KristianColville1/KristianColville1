import { useProjects } from '../hooks/useProjects';
import { ProjectsIndexTemplate } from '../components/templates/ProjectsIndexTemplate';
import { contactLinks } from '../content/contact';

export function Projects() {
  const projects = useProjects();

  return <ProjectsIndexTemplate projects={projects} contactLinks={contactLinks} />;
}
