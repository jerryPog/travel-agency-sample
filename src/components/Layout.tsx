import { Outlet } from 'react-router-dom';
import { CanvasScroll } from './CanvasScroll';
import { WeatherCurrencyWidget } from './WeatherCurrencyWidget';
import { BannerNavbar } from './BannerNavbar';
import { FooterNav } from './FooterNav';
import { WhatsAppChatButton } from './WhatsAppChatButton';
import { ScrollToTop } from './ScrollToTop';
import { MetaManager } from './MetaManager';
import { siteConfig } from '../config/siteConfig';

export function Layout() {
  return (
    <>
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

          {/* Dynamic Page Route Content */}
          <main className="w-full">
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
