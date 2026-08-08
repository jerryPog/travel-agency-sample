import { useState, useEffect } from 'react';
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
import { WeatherCurrencyWidget } from './components/WeatherCurrencyWidget';
import { ItineraryWizardModal } from './components/ItineraryWizardModal';
import { ParisDistrictMap } from './components/ParisDistrictMap';
import { WhatsAppChatButton } from './components/WhatsAppChatButton';
import { LanguageProvider } from './context/LanguageContext';
import { BannerConfig } from './types';
import { siteConfig } from './config/siteConfig';

// Developer-only UI tools
import { BannerControlToolbar } from './components/BannerControlToolbar';
import { CodeExportModal } from './components/CodeExportModal';

const defaultBannerConfig: BannerConfig = {
  navyTheme: 'classic',
  customNavyColor: '#0B132B',
  brandName: siteConfig.brandName,
  headline: siteConfig.tagline,
  subtitle: siteConfig.description,
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
  const [showWizardModal, setShowWizardModal] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const getNavyHex = () => {
    if (config.navyTheme === 'custom') return config.customNavyColor;
    const preset = navyPresets.find((p) => p.id === config.navyTheme);
    return preset ? preset.hex : '#0B132B';
  };

  const handleUpdateConfig = (updated: Partial<BannerConfig>) => {
    setConfig((prev) => ({ ...prev, ...updated }));
  };

  return (
    <LanguageProvider>
      {/* Scroll Reveal Intersection Observer */}
      <ScrollObserver />

      {/* Fixed Background Smooth Canvas Animation */}
      <CanvasScroll />

      {/* Live Weather & Currency Bar */}
      <WeatherCurrencyWidget />

      {/* Dev-only controls isolated behind import.meta.env.DEV */}
      {import.meta.env.DEV && (
        <>
          <BannerControlToolbar
            config={config}
            onChange={handleUpdateConfig}
            onOpenCode={() => handleUpdateConfig({ showCodeModal: true })}
            onReset={() => setConfig(defaultBannerConfig)}
            navyPresets={navyPresets}
          />
          {config.showCodeModal && (
            <CodeExportModal
              config={config}
              getNavyHex={getNavyHex}
              onClose={() => handleUpdateConfig({ showCodeModal: false })}
            />
          )}
        </>
      )}

      {/* Foreground Translucent Content Container */}
      <main
        style={{
          backgroundColor: `${getNavyHex()}35`, // 35 hex = ~20% opacity so canvas animation shines through
        }}
        className="min-h-[100dvh] w-full text-white font-sans flex flex-col items-center justify-start relative z-10 overflow-x-hidden selection:bg-white selection:text-[#0B132B] transition-colors duration-500"
      >
        {/* Hero Section Container */}
        <section
          id="home"
          aria-labelledby="hero-headline"
          className="w-full max-w-[1440px] min-h-[560px] lg:h-[100dvh] lg:max-h-[780px] flex flex-col justify-between relative overflow-hidden pt-1 pb-3 px-4 sm:px-6"
        >
          <BannerNavbar
            brandName={config.brandName}
            activeNav={config.activeNav}
            onNavClick={(navLabel) => handleUpdateConfig({ activeNav: navLabel })}
            onBrandClick={() => handleUpdateConfig({ activeNav: 'Home' })}
          />

          <BannerHeroContent onCtaClick={() => setShowWizardModal(true)} />

          <BannerGlassCards />
        </section>

        {/* Section 1: About & Bento Grid */}
        <section id="about" aria-labelledby="about-heading" className="w-full">
          <AboutParisSection />
        </section>

        {/* Section 2: Interactive District Explorer Map */}
        <section id="districts" aria-labelledby="districts-heading" className="w-full">
          <ParisDistrictMap />
        </section>

        {/* Section 3: About Us Story */}
        <section id="story" aria-labelledby="story-heading" className="w-full">
          <AboutUsStorySection />
        </section>

        {/* Section 4: Services */}
        <section id="services" aria-labelledby="services-heading" className="w-full">
          <ServicesSection />
        </section>

        {/* Section 5: Pricing Packages & Custom Calculator */}
        <section id="packages" aria-labelledby="packages-heading" className="w-full">
          <PricingPlansSection />
        </section>

        {/* Section 6: Why Choose Us / Testimonials */}
        <section id="why-us" aria-labelledby="why-heading" className="w-full">
          <TestimonialsTrustSection />
        </section>

        {/* Section 7: Contact Section */}
        <section id="contact-wrapper" aria-labelledby="contact-heading" className="w-full">
          <ContactSection />
        </section>

        {/* Interactive Itinerary Wizard Modal */}
        {showWizardModal && (
          <ItineraryWizardModal onClose={() => setShowWizardModal(false)} />
        )}

        {/* Floating WhatsApp Local Guide Button */}
        <WhatsAppChatButton />
      </main>
    </LanguageProvider>
  );
}
