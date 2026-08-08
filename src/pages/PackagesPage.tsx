import { ServicesSection } from '../components/ServicesSection';
import { PricingPlansSection } from '../components/PricingPlansSection';
import { AnimatedPage } from '../components/AnimatedPage';

export function PackagesPage() {
  return (
    <AnimatedPage>
      <div className="w-full space-y-12 py-6">
        <ServicesSection />
        <PricingPlansSection />
      </div>
    </AnimatedPage>
  );
}
