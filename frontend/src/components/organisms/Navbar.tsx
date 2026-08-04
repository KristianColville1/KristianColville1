import { AnimatePresence, motion } from 'framer-motion';
import { Squash } from 'hamburger-react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { NavLink } from '../molecules/NavLink';
import { NavDropdown } from '../molecules/NavDropdown';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useMobileMenu } from '../../hooks/useMobileMenu';
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

// Stable empty list: nothing to observe when the sections aren't on this route.
const NO_SECTIONS: string[] = [];

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  // Off the home page the sections live on another route, so the links need a
  // path in front of the hash to navigate there first.
  const hrefBase = isHome ? '' : '/';

  const activeId = useActiveSection(isHome ? ALL_SECTION_IDS : NO_SECTIONS);
  const { theme, toggleTheme } = useTheme();
  const { isOpen: isMenuOpen, setIsOpen: setIsMenuOpen, close: closeMenu } = useMobileMenu();

  const themeToggle = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="focus-ring inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-blue-700 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-blue-300"
    >
      {theme === 'dark' ? <FiSun size={18} aria-hidden="true" /> : <FiMoon size={18} aria-hidden="true" />}
    </button>
  );

  const wordmarkContent = (
    <>
      <span className="block font-display text-base font-bold text-neutral-900 transition-colors group-hover:text-blue-700 dark:text-neutral-50 dark:group-hover:text-blue-300">
        Kristian Colville
      </span>
      <span className="block text-[0.65rem] font-medium uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
        Portfolio
      </span>
    </>
  );

  // On the home page the wordmark is a jump to the top; anywhere else it has to
  // actually navigate home.
  const wordmark = isHome ? (
    <a href="#hero" onClick={closeMenu} className="focus-ring group leading-tight">
      {wordmarkContent}
    </a>
  ) : (
    <Link to="/" onClick={closeMenu} className="focus-ring group leading-tight">
      {wordmarkContent}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      {/* Above the backdrop so the bar itself stays legible while the menu is open. */}
      <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <span className="-ml-3 text-neutral-700 md:hidden dark:text-neutral-300">
          <Squash
            toggled={isMenuOpen}
            toggle={setIsMenuOpen}
            size={22}
            color="currentColor"
            rounded
            hideOutline={false}
            label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
        </span>
        {wordmark}
        <div className="hidden items-center gap-6 md:flex">
          {PRIMARY_SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              href={`${hrefBase}#${section.id}`}
              label={section.label}
              active={activeId === section.id}
            />
          ))}
          <NavDropdown
            label="Background"
            sections={BACKGROUND_SECTIONS}
            activeId={activeId}
            hrefBase={hrefBase}
          />
          <NavLink
            href={`${hrefBase}#${CONTACT_SECTION.id}`}
            label={CONTACT_SECTION.label}
            active={activeId === CONTACT_SECTION.id}
          />
          {themeToggle}
        </div>
        {/* Balances the hamburger so the wordmark stays centred on mobile. */}
        <div className="w-12 md:hidden" aria-hidden="true" />
      </div>

      {/* The panel and its backdrop are absolutely positioned against the nav,
          so opening the menu folds it over the page instead of pushing the
          content down. Both are anchored to the bottom edge of the bar. */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="absolute inset-x-0 top-full z-0 h-screen bg-neutral-950/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              className="absolute inset-x-0 top-full z-10 origin-top overflow-hidden border-b border-neutral-200 bg-white shadow-lg md:hidden dark:border-neutral-800 dark:bg-neutral-950"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="flex flex-col px-6 py-3">
                {PRIMARY_SECTIONS.map((section) => (
                  <NavLink
                    key={section.id}
                    href={`${hrefBase}#${section.id}`}
                    label={section.label}
                    active={activeId === section.id}
                    onClick={closeMenu}
                    className="block py-3"
                  />
                ))}
                <p className="pb-1 pt-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
                  Background
                </p>
                {BACKGROUND_SECTIONS.map((section) => (
                  <NavLink
                    key={section.id}
                    href={`${hrefBase}#${section.id}`}
                    label={section.label}
                    active={activeId === section.id}
                    onClick={closeMenu}
                    className="block py-3"
                  />
                ))}
                <NavLink
                  href={`${hrefBase}#${CONTACT_SECTION.id}`}
                  label={CONTACT_SECTION.label}
                  active={activeId === CONTACT_SECTION.id}
                  onClick={closeMenu}
                  className="block pb-3 pt-4"
                />
                <div className="mt-3 border-t border-neutral-200 pt-2 dark:border-neutral-800">
                  {themeToggle}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
