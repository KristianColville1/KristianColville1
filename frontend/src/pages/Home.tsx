import { useFeaturedProjects, useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';
import { HomeTemplate } from '../components/templates/HomeTemplate';
import { bio, headline, headlineSupport, identity } from '../content/bio';
import { skillGroups, skillsSummary } from '../content/skills';
import { achievements } from '../content/achievements';
import { experienceEntries } from '../content/experience';
import { educationEntries } from '../content/education';
import { contactLinks } from '../content/contact';

export function Home() {
  const featuredProjects = useFeaturedProjects();
  const projectCount = useProjects().length;
  const certifications = useCertifications();

  return (
    <HomeTemplate
      headline={headline}
      headlineSupport={headlineSupport}
      identity={identity}
      about={bio.about}
      skillGroups={skillGroups}
      skillsSummary={skillsSummary}
      featuredProjects={featuredProjects}
      projectCount={projectCount}
      experienceEntries={experienceEntries}
      educationEntries={educationEntries}
      certifications={certifications}
      achievements={achievements}
      contactLinks={contactLinks}
    />
  );
}
