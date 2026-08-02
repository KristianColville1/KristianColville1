import { NavLink } from '../molecules/NavLink';
import { Button } from '../atoms/Button';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useTheme } from '../../hooks/useTheme';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const activeId = useActiveSection(SECTIONS.map((section) => section.id));
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="flex flex-wrap gap-6">
        {SECTIONS.map((section) => (
          <NavLink key={section.id} href={`#${section.id}`} label={section.label} active={activeId === section.id} />
        ))}
      </div>
      <Button variant="secondary" onClick={toggleTheme}>
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </Button>
    </nav>
  );
}
