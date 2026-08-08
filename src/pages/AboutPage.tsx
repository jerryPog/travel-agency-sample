import { AboutUsStorySection } from '../components/AboutUsStorySection';
import { AboutParisSection } from '../components/AboutParisSection';
import { AnimatedPage } from '../components/AnimatedPage';

export function AboutPage() {
  return (
    <AnimatedPage>
      <div className="w-full space-y-12 py-6">
        <AboutUsStorySection />
        <AboutParisSection />
      </div>
    </AnimatedPage>
  );
}
