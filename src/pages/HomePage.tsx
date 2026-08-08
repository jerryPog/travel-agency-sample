import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerHeroContent } from '../components/BannerHeroContent';
import { BannerGlassCards } from '../components/BannerGlassCards';
import { AboutParisSection } from '../components/AboutParisSection';
import { ParisDistrictMap } from '../components/ParisDistrictMap';
import { TestimonialsTrustSection } from '../components/TestimonialsTrustSection';
import { ItineraryWizardModal } from '../components/ItineraryWizardModal';
import { AnimatedPage } from '../components/AnimatedPage';

export function HomePage() {
  const navigate = useNavigate();
  const [showQuickModal, setShowQuickModal] = useState(false);

  return (
    <AnimatedPage>
      <div className="w-full space-y-12 pb-12">
        {/* Hero Section */}
        <section className="w-full max-w-[1440px] min-h-[500px] lg:min-h-[640px] flex flex-col justify-between mx-auto px-4 sm:px-6 pt-4 pb-8">
          <BannerHeroContent onCtaClick={() => navigate('/custom-itinerary')} />
          <BannerGlassCards />
        </section>

        {/* About Paris Bento Grid */}
        <AboutParisSection />

        {/* Interactive District Map */}
        <ParisDistrictMap />

        {/* Testimonials Preview */}
        <TestimonialsTrustSection />

        {/* Modal Quick Trigger Fallback */}
        {showQuickModal && (
          <ItineraryWizardModal onClose={() => setShowQuickModal(false)} />
        )}
      </div>
    </AnimatedPage>
  );
}
