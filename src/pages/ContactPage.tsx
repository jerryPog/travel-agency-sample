import { ContactSection } from '../components/ContactSection';
import { AnimatedPage } from '../components/AnimatedPage';

export function ContactPage() {
  return (
    <AnimatedPage>
      <div className="w-full py-6">
        <ContactSection />
      </div>
    </AnimatedPage>
  );
}
