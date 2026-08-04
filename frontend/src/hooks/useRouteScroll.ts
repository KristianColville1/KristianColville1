import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * The browser resolves a deep-linked #hash before React has rendered the
 * sections, so /#contact used to land at the top of the page. Re-run the scroll
 * ourselves once the route has painted, and send navigations between routes
 * back to the top — a plain SPA route change otherwise keeps the old offset,
 * which on mobile drops you into the middle of the new page.
 */
export function useRouteScroll() {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const isFirstRender = previousPathname.current === null;
    const pathChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    if (hash) {
      const targetId = hash.slice(1);
      let settled = false;

      // Jump rather than smooth-scroll: CSS sets scroll-behavior: smooth, and
      // re-asserting the position mid-animation would restart it every time.
      const scrollToTarget = () => {
        if (settled) return;
        document.getElementById(targetId)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      };

      // Images below the fold finish loading after the first paint and drag the
      // target out from under us, so hold the position for a beat — but stop
      // the moment the visitor takes over, or we'd be fighting their scroll.
      const releaseControl = () => {
        settled = true;
      };

      scrollToTarget();
      const interval = window.setInterval(scrollToTarget, 100);
      const timeout = window.setTimeout(releaseControl, 1200);
      window.addEventListener('wheel', releaseControl, { passive: true, once: true });
      window.addEventListener('touchstart', releaseControl, { passive: true, once: true });
      window.addEventListener('keydown', releaseControl, { once: true });

      return () => {
        window.clearInterval(interval);
        window.clearTimeout(timeout);
        window.removeEventListener('wheel', releaseControl);
        window.removeEventListener('touchstart', releaseControl);
        window.removeEventListener('keydown', releaseControl);
      };
    }

    // Leave the first paint alone so the browser's own scroll restoration
    // still works on reload; only reset when we actually change route.
    if (!isFirstRender && pathChanged) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
}
