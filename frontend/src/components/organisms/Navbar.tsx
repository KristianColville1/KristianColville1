import { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="hidden flex-wrap gap-6 md:flex">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              label={section.label}
              active={activeId === section.id}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 md:ml-auto">
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </Button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 md:hidden dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            {isMenuOpen ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-4 md:hidden dark:border-neutral-800">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              label={section.label}
              active={activeId === section.id}
              onClick={closeMenu}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
