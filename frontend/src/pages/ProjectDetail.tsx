import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { ProjectDetailTemplate } from '../components/templates/ProjectDetailTemplate';
import { contactLinks } from '../content/contact';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useProjects();
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <ProjectDetailTemplate
      project={project}
      previousProject={projects[index - 1]}
      nextProject={projects[index + 1]}
      contactLinks={contactLinks}
    />
  );
}
