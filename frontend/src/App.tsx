import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { useRouteScroll } from './hooks/useRouteScroll';
import { Home } from './pages/Home';

const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })),
);

const Projects = lazy(() =>
  import('./pages/Projects').then((module) => ({ default: module.Projects })),
);

/* Split out so the scroll handling sits inside the router and can read the
   current location. */
function AppRoutes() {
  useRouteScroll();

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <BrowserRouter>
          {/* The page surface lives here so every route inherits it — keeping it
              on a single template left routed pages with unstyled backgrounds. */}
          <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
            <AppRoutes />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </MotionConfig>
  );
}
