import { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { NavLink } from '../molecules/NavLink';
import { NavDropdown } from '../molecules/NavDropdown';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useTheme } from '../../hooks/useTheme';

const PRIMARY_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
];

const BACKGROUND_SECTIONS = [
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
];

const CONTACT_SECTION = { id: 'contact', label: 'Contact' };

const ALL_SECTION_IDS = [
  ...PRIMARY_SECTIONS.map((section) => section.id),
  ...BACKGROUND_SECTIONS.map((section) => section.id),
  CONTACT_SECTION.id,
];

export function Navbar() {
  const activeId = useActiveSection(ALL_SECTION_IDS);
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const themeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-blue-700 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-blue-400"
    >
      {theme === 'dark' ? <FiSun size={18} aria-hidden="true" /> : <FiMoon size={18} aria-hidden="true" />}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 md:hidden dark:text-neutral-300 dark:hover:bg-neutral-900"
        >
          {isMenuOpen ? <FiX size={22} aria-hidden="true" /> : <FiMenu size={22} aria-hidden="true" />}
        </button>
        <a href="#hero" onClick={closeMenu} className="group leading-tight">
          <span className="block font-display text-base font-bold text-neutral-900 transition-colors group-hover:text-blue-700 dark:text-neutral-50 dark:group-hover:text-blue-400">
            Kristian Colville
          </span>
          <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
            Portfolio
          </span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {PRIMARY_SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              label={section.label}
              active={activeId === section.id}
            />
          ))}
          <NavDropdown label="Background" sections={BACKGROUND_SECTIONS} activeId={activeId} />
          <NavLink
            href={`#${CONTACT_SECTION.id}`}
            label={CONTACT_SECTION.label}
            active={activeId === CONTACT_SECTION.id}
          />
          {themeToggle}
        </div>
        <div className="w-10 md:hidden" aria-hidden="true" />
      </div>
      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-4 md:hidden dark:border-neutral-800">
          {PRIMARY_SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              label={section.label}
              active={activeId === section.id}
              onClick={closeMenu}
            />
          ))}
          <p className="pt-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            Background
          </p>
          {BACKGROUND_SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              href={`#${section.id}`}
              label={section.label}
              active={activeId === section.id}
              onClick={closeMenu}
            />
          ))}
          <NavLink
            href={`#${CONTACT_SECTION.id}`}
            label={CONTACT_SECTION.label}
            active={activeId === CONTACT_SECTION.id}
            onClick={closeMenu}
          />
          <div className="border-t border-neutral-200 pt-3 dark:border-neutral-800">{themeToggle}</div>
        </div>
      )}
    </nav>
  );
}
