import { Navbar } from '../organisms/Navbar';
import { Hero } from '../organisms/Hero';
import { About } from '../organisms/About';
import { SkillsGrid } from '../organisms/SkillsGrid';
import { ProjectsSection } from '../organisms/ProjectsSection';
import { ExperienceTimeline } from '../organisms/ExperienceTimeline';
import { EducationTimeline } from '../organisms/EducationTimeline';
import { CertificationsSection } from '../organisms/CertificationsSection';
import { AchievementsSection } from '../organisms/AchievementsSection';
import { ContactSection } from '../organisms/ContactSection';
import { Footer } from '../organisms/Footer';
import type {
  Project,
  Certification,
  Achievement,
  ExperienceEntry,
  EducationEntry,
  SkillGroup,
  ContactLink,
  Headline,
} from '../../content/types';

type HomeTemplateProps = {
  headline: Headline;
  about: string;
  skillGroups: SkillGroup[];
  skillsSummary: string;
  projects: Project[];
  experienceEntries: ExperienceEntry[];
  educationEntries: EducationEntry[];
  certifications: Certification[];
  achievements: Achievement[];
  contactLinks: ContactLink[];
};

export function HomeTemplate({
  headline,
  about,
  skillGroups,
  skillsSummary,
  projects,
  experienceEntries,
  educationEntries,
  certifications,
  achievements,
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
      <SkillsGrid groups={skillGroups} summary={skillsSummary} />
      <ProjectsSection projects={projects} />
      <ExperienceTimeline entries={experienceEntries} />
      <EducationTimeline entries={educationEntries} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ContactSection links={contactLinks} />
      <Footer links={contactLinks} />
    </div>
  );
}
