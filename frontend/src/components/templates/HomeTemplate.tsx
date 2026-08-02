import { Navbar } from '../organisms/Navbar';
import { Hero } from '../organisms/Hero';
import { About } from '../organisms/About';
import { SkillsGrid } from '../organisms/SkillsGrid';
import { ProjectsSection } from '../organisms/ProjectsSection';
import { CertificationsSection } from '../organisms/CertificationsSection';
import { AchievementsSection } from '../organisms/AchievementsSection';
import { ExperienceTimeline } from '../organisms/ExperienceTimeline';
import { ContactSection } from '../organisms/ContactSection';
import type {
  Project,
  Certification,
  Achievement,
  ExperienceEntry,
  SkillGroup,
  ContactLink,
} from '../../content/types';

type HomeTemplateProps = {
  headline: string;
  about: string;
  skillGroups: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  experienceEntries: ExperienceEntry[];
  contactLinks: ContactLink[];
};

export function HomeTemplate({
  headline,
  about,
  skillGroups,
  projects,
  certifications,
  achievements,
  experienceEntries,
  contactLinks,
}: HomeTemplateProps) {
  return (
    <div
      data-testid="home-page"
      className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"
    >
      <Navbar />
      <Hero headline={headline} />
      <About about={about} />
      <SkillsGrid groups={skillGroups} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ExperienceTimeline entries={experienceEntries} />
      <ContactSection links={contactLinks} />
    </div>
  );
}
