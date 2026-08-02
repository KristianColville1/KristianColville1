import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { ProjectsSection } from '../components/organisms/ProjectsSection';
import { bio } from '../content/bio';
import { useProjects } from '../hooks/useProjects';

export function Home() {
  const projects = useProjects();

  return (
    <div data-testid="home-page" className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
      <ProjectsSection projects={projects} />
    </div>
  );
}
