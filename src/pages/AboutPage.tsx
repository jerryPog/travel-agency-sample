import { AboutUsStorySection } from '../components/AboutUsStorySection';
import { AboutParisSection } from '../components/AboutParisSection';

export function AboutPage() {
  return (
    <div className="w-full space-y-12 py-6">
      <AboutUsStorySection />
      <AboutParisSection />
    </div>
  );
}
