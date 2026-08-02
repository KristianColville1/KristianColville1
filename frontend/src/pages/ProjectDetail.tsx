import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { ProjectDetailTemplate } from '../components/templates/ProjectDetailTemplate';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <ProjectDetailTemplate project={project} />;
}
