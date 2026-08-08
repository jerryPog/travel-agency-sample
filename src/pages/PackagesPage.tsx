import { ServicesSection } from '../components/ServicesSection';
import { PricingPlansSection } from '../components/PricingPlansSection';

export function PackagesPage() {
  return (
    <div className="w-full space-y-12 py-6">
      <ServicesSection />
      <PricingPlansSection />
    </div>
  );
}
