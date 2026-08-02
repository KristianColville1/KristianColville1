import { Navbar } from '../components/organisms/Navbar';

export function Home() {
  return (
    <div data-testid="home-page" className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
    </div>
  );
}
