import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { SkillsGrid } from '../components/organisms/SkillsGrid';
import { ProjectsSection } from '../components/organisms/ProjectsSection';
import { CertificationsSection } from '../components/organisms/CertificationsSection';
import { AchievementsSection } from '../components/organisms/AchievementsSection';
import { ExperienceTimeline } from '../components/organisms/ExperienceTimeline';
import { bio } from '../content/bio';
import { skillGroups } from '../content/skills';
import { achievements } from '../content/achievements';
import { experienceEntries } from '../content/experience';
import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';

export function Home() {
  const projects = useProjects();
  const certifications = useCertifications();

  return (
    <div data-testid="home-page" className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
      <SkillsGrid groups={skillGroups} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ExperienceTimeline entries={experienceEntries} />
    </div>
  );
}
