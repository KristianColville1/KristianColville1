import { Navbar } from '../components/organisms/Navbar';
import { Hero } from '../components/organisms/Hero';
import { About } from '../components/organisms/About';
import { bio } from '../content/bio';

export function Home() {
  return (
    <div data-testid="home-page" className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Navbar />
      <Hero headline={bio.headline} />
      <About about={bio.about} />
    </div>
  );
}
