import { useCallback, useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = 768;

/**
 * Open state for the mobile nav panel. The panel overlays the page rather than
 * pushing it, so it also has to behave like an overlay: escape closes it, the
 * page behind it does not scroll, and resizing up to the desktop layout drops
 * it instead of leaving an orphaned panel open.
 */
export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) close();
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return { isOpen, setIsOpen, close };
}
