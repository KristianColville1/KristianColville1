import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Home } from './pages/Home';

const ProjectDetail = lazy(() =>
  import('./pages/ProjectDetail').then((module) => ({ default: module.ProjectDetail })),
);

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <BrowserRouter>
          {/* The page surface lives here so every route inherits it — keeping it
              on a single template left routed pages with unstyled backgrounds. */}
          <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </MotionConfig>
  );
}
