import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CanvasScroll } from './CanvasScroll';
import { WeatherCurrencyWidget } from './WeatherCurrencyWidget';
import { BannerNavbar } from './BannerNavbar';
import { FooterNav } from './FooterNav';
import { WhatsAppChatButton } from './WhatsAppChatButton';
import { ScrollToTop } from './ScrollToTop';
import { MetaManager } from './MetaManager';
import { CustomCursor } from './CustomCursor';
import { ScrollProgressBar } from './ScrollProgressBar';
import { siteConfig } from '../config/siteConfig';

export function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Hardware-Accelerated Custom Cursor */}
      <CustomCursor />

      {/* Gold Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Dynamic Title & Meta Tags */}
      <MetaManager />

      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Fixed Background Smooth Canvas/Video Animation */}
      <CanvasScroll />

      {/* Live Weather & Currency Bar */}
      <WeatherCurrencyWidget />

      {/* Main Page Layout Container */}
      <div className="min-h-[100dvh] w-full text-white font-sans flex flex-col items-center justify-between relative z-10 overflow-x-hidden bg-[#070B14]/40">
        <div className="w-full">
          {/* Global Header Navigation */}
          <BannerNavbar brandName={siteConfig.brandName} />

          {/* Dynamic Page Route Content with Framer Motion AnimatePresence */}
          <main className="w-full">
            <AnimatePresence mode="wait">
              <React.Fragment key={location.pathname}>
                <Outlet />
              </React.Fragment>
            </AnimatePresence>
          </main>
        </div>

        {/* Global Footer */}
        <FooterNav />
      </div>

      {/* Floating VIP Concierge Drawer Widget */}
      <WhatsAppChatButton />
    </>
  );
}
