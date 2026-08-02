import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const projects = useProjects();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <div data-testid="project-detail-page">{project.name}</div>;
}
