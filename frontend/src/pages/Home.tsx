import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';
import { HomeTemplate } from '../components/templates/HomeTemplate';
import { bio, headline } from '../content/bio';
import { skillGroups, skillsSummary } from '../content/skills';
import { achievements } from '../content/achievements';
import { experienceEntries } from '../content/experience';
import { educationEntries } from '../content/education';
import { contactLinks } from '../content/contact';

export function Home() {
  const projects = useProjects();
  const certifications = useCertifications();

  return (
    <HomeTemplate
      headline={headline}
      about={bio.about}
      skillGroups={skillGroups}
      skillsSummary={skillsSummary}
      projects={projects}
      experienceEntries={experienceEntries}
      educationEntries={educationEntries}
      certifications={certifications}
      achievements={achievements}
      contactLinks={contactLinks}
    />
  );
}
