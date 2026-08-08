import { Outlet, useLocation } from 'react-router-dom';
import { CanvasScroll } from './CanvasScroll';
import { WeatherCurrencyWidget } from './WeatherCurrencyWidget';
import { BannerNavbar } from './BannerNavbar';
import { FooterNav } from './FooterNav';
import { WhatsAppChatButton } from './WhatsAppChatButton';
import { ScrollToTop } from './ScrollToTop';
import { MetaManager } from './MetaManager';
import { siteConfig } from '../config/siteConfig';

export function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Top Shimmer Route Redirection Progress Bar */}
      <div
        key={`progress-${location.pathname}`}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 z-[9999] pointer-events-none animate-route-progress shadow-[0_0_12px_rgba(251,191,36,0.8)]"
      />

      {/* Dynamic Title & Meta Tags */}
      <MetaManager />

      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Fixed Background Smooth Canvas/Video Animation */}
      <CanvasScroll />

      {/* Live Weather & Currency Bar */}
      <WeatherCurrencyWidget />

      {/* Main Page Layout Container */}
      <div className="min-h-[100dvh] w-full text-white font-sans flex flex-col items-center justify-between relative z-10 overflow-x-hidden bg-[#0B132B]/35">
        <div className="w-full">
          {/* Global Header Navigation */}
          <BannerNavbar brandName={siteConfig.brandName} />

          {/* Dynamic Page Route Content with Smooth Redirection Transition Animation */}
          <main key={location.pathname} className="w-full animate-route-transition">
            <Outlet />
          </main>
        </div>

        {/* Global Footer */}
        <FooterNav />
      </div>

      {/* Floating WhatsApp Concierge Drawer */}
      <WhatsAppChatButton />
    </>
  );
}
