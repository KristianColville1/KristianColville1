import { useProjects } from '../hooks/useProjects';
import { useCertifications } from '../hooks/useCertifications';
import { HomeTemplate } from '../components/templates/HomeTemplate';
import { bio } from '../content/bio';
import { skillGroups } from '../content/skills';
import { focusAreas } from '../content/focusAreas';
import { achievements } from '../content/achievements';
import { experienceEntries } from '../content/experience';
import { contactLinks } from '../content/contact';

export function Home() {
  const projects = useProjects();
  const certifications = useCertifications();

  return (
    <HomeTemplate
      headline={bio.headline}
      about={bio.about}
      skillGroups={skillGroups}
      focusAreas={focusAreas}
      projects={projects}
      certifications={certifications}
      achievements={achievements}
      experienceEntries={experienceEntries}
      contactLinks={contactLinks}
    />
  );
}
