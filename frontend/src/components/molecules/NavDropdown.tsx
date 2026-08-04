import { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { NavLink } from './NavLink';

type NavDropdownProps = {
  label: string;
  sections: { id: string; label: string }[];
  activeId: string;
  hrefBase?: string;
};

export function NavDropdown({ label, sections, activeId, hrefBase = '' }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const containsActive = sections.some((section) => section.id === activeId);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className={`focus-ring inline-flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors ${
          containsActive
            ? 'text-blue-700 dark:text-blue-300'
            : 'text-neutral-600 hover:text-blue-700 dark:text-neutral-300 dark:hover:text-blue-300'
        }`}
      >
        {label}
        <FiChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 flex min-w-44 flex-col gap-3 rounded-lg border border-neutral-200 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
          {sections.map((section) => (
            <NavLink
              key={section.id}
              href={`${hrefBase}#${section.id}`}
              label={section.label}
              active={activeId === section.id}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
