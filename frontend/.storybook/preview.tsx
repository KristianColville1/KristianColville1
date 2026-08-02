import type { Preview, Decorator } from '@storybook/react-vite';
import { ThemeProvider } from '../src/hooks/useTheme';

// Tailwind v4 only emits CSS for stylesheets that are actually imported, so
// without this every story renders completely unstyled.
import '../src/index.css';

/**
 * Wraps every story in the app's ThemeProvider (organisms such as Navbar call
 * useTheme(), which throws outside a provider) and drives dark/light mode
 * through the same `.dark` class on <html> that useTheme.tsx uses.
 *
 * ThemeProvider seeds its state from localStorage on mount only, so we write
 * the toolbar selection to that key and remount the provider via `key` to make
 * the switch take effect.
 */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'light' ? 'light' : 'dark';

  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');

  return (
    <ThemeProvider key={theme}>
      <div className="min-h-screen bg-white p-6 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <Story />
      </div>
    </ThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
