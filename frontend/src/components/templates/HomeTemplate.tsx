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
} from '../../content/types';

type HomeTemplateProps = {
  headline: string;
  headlineSupport: string;
  identity: { name: string; role: string; disciplines: string[] };
  about: string;
  skillGroups: SkillGroup[];
  skillsSummary: string;
  featuredProjects: Project[];
  projectCount: number;
  experienceEntries: ExperienceEntry[];
  educationEntries: EducationEntry[];
  certifications: Certification[];
  achievements: Achievement[];
  contactLinks: ContactLink[];
};

export function HomeTemplate({
  headline,
  headlineSupport,
  identity,
  about,
  skillGroups,
  skillsSummary,
  featuredProjects,
  projectCount,
  experienceEntries,
  educationEntries,
  certifications,
  achievements,
  contactLinks,
}: HomeTemplateProps) {
  return (
    <div data-testid="home-page">
      <Navbar />
      <Hero headline={headline} headlineSupport={headlineSupport} identity={identity} />
      <About about={about} />
      <SkillsGrid groups={skillGroups} summary={skillsSummary} />
      <ProjectsSection projects={featuredProjects} totalCount={projectCount} />
      {/* Two short columns rather than two half-empty full-width sections. Each
          keeps its own id so the nav anchors still land on the right one. */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2">
        <ExperienceTimeline entries={experienceEntries} />
        <EducationTimeline entries={educationEntries} />
      </div>
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ContactSection links={contactLinks} />
      <Footer links={contactLinks} />
    </div>
  );
}
