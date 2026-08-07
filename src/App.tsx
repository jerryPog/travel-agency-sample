import { useState } from 'react';
import { CanvasScroll } from './components/CanvasScroll';
import { ScrollObserver } from './components/ScrollObserver';
import { BannerNavbar } from './components/BannerNavbar';
import { BannerHeroContent } from './components/BannerHeroContent';
import { BannerGlassCards } from './components/BannerGlassCards';
import { AboutParisSection } from './components/AboutParisSection';
import { AboutUsStorySection } from './components/AboutUsStorySection';
import { ServicesSection } from './components/ServicesSection';
import { PricingPlansSection } from './components/PricingPlansSection';
import { TestimonialsTrustSection } from './components/TestimonialsTrustSection';
import { ContactSection } from './components/ContactSection';
import { CodeExportModal } from './components/CodeExportModal';
import { BannerConfig } from './types';

const defaultBannerConfig: BannerConfig = {
  navyTheme: 'classic',
  customNavyColor: '#0B132B',
  brandName: 'Paris Travel Co.',
  headline: 'Discover Paris, Beyond the Postcard',
  subtitle: 'Handcrafted Paris experiences — from timeless landmarks to hidden corners only locals know.',
  ctaText: 'Plan My Trip',
  activeNav: 'Home',
  cleanEnergyValue: '1,200+',
  cleanEnergyText:
    'Every trip is planned around you — your pace, your interests, your budget. No fixed packages, no fillers.',
  impactValue: '100%',
  impactText:
    'From the moment you land to the moment you leave, our team is one message away — anytime, anywhere in Paris.',
  fontFamily: 'jakarta',
  showCodeModal: false,
  isFullWidth: true,
};

const navyPresets = [
  { id: 'classic' as const, name: 'Classic Navy', hex: '#0B132B' },
  { id: 'midnight' as const, name: 'Midnight Navy', hex: '#050C1E' },
  { id: 'deep' as const, name: 'Dark Cobalt', hex: '#0B1E36' },
  { id: 'royal' as const, name: 'Royal Navy', hex: '#0A192F' },
];

export default function App() {
  const [config, setConfig] = useState<BannerConfig>(defaultBannerConfig);

  const getNavyHex = () => {
    if (config.navyTheme === 'custom') return config.customNavyColor;
    const preset = navyPresets.find((p) => p.id === config.navyTheme);
    return preset ? preset.hex : '#0B132B';
  };

  const handleUpdateConfig = (updated: Partial<BannerConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setConfig(defaultBannerConfig);
  };

  return (
    <>
      {/* Scroll Reveal Intersection Observer */}
      <ScrollObserver />

      {/* Fixed Background Smooth Canvas Animation */}
      <CanvasScroll />

      {/* Foreground Translucent Content Container */}
      <main
        style={{
          backgroundColor: `${getNavyHex()}35`, // 35 hex = ~20% opacity so canvas animation shines through crisp & bright
        }}
        className="min-h-screen w-full text-white font-sans flex flex-col items-center justify-start relative z-10 overflow-x-hidden selection:bg-white selection:text-[#0B132B] transition-colors duration-500"
      >
        {/* Hero Section Container */}
        <section id="home" className="w-full max-w-[1440px] h-screen max-h-[900px] min-h-[580px] flex flex-col justify-between relative overflow-hidden pt-10 pb-6 px-2">
          <BannerNavbar
            brandName={config.brandName}
            activeNav={config.activeNav}
            onNavClick={(navLabel) => handleUpdateConfig({ activeNav: navLabel })}
            onBrandClick={() => handleUpdateConfig({ activeNav: 'Home' })}
          />

          <BannerHeroContent
            headline={config.headline}
            subtitle={config.subtitle}
            ctaText={config.ctaText}
            onCtaClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          <BannerGlassCards
            cleanEnergyText={config.cleanEnergyText}
            impactText={config.impactText}
          />
        </section>

        {/* Section 1: About & Bento Grid */}
        <div id="about" className="w-full">
          <AboutParisSection />
        </div>

        {/* Section 2: About Us Story */}
        <div className="w-full">
          <AboutUsStorySection />
        </div>

        {/* Section 3: Services */}
        <div id="services" className="w-full">
          <ServicesSection />
        </div>

        {/* Section 4: Pricing Packages */}
        <div id="packages" className="w-full">
          <PricingPlansSection />
        </div>

        {/* Section 5: Why Choose Us / Testimonials */}
        <div id="why-us" className="w-full">
          <TestimonialsTrustSection />
        </div>

        {/* Section 6: Contact Section (Features 4-col Central Viewport & 550px Eiffel Landing View) */}
        <div id="contact" className="w-full">
          <ContactSection />
        </div>

        {/* Code Modal */}
        {config.showCodeModal && (
          <CodeExportModal
            config={config}
            getNavyHex={getNavyHex}
            onClose={() => handleUpdateConfig({ showCodeModal: false })}
          />
        )}
      </main>
    </>
  );
}
