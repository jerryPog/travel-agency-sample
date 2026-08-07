import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BannerNavbarProps {
  brandName: string;
  activeNav: string;
  onNavClick: (navId: string) => void;
  onBrandClick?: () => void;
}

export function BannerNavbar({
  brandName,
  activeNav,
  onNavClick,
  onBrandClick,
}: BannerNavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: t('home'), href: '#' },
    { id: 'about', label: t('aboutUs'), href: '#about' },
    { id: 'services', label: t('services'), href: '#services' },
    { id: 'packages', label: t('packages'), href: '#packages' },
    { id: 'why-us', label: t('whyUs'), href: '#why-us' },
    { id: 'contact', label: t('contact'), href: '#contact' },
  ];

  // Close menu on outside tap/click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [mobileMenuOpen]);

  // Close menu on scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleScroll = () => setMobileMenuOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const handleNavClick = (item: typeof navItems[0]) => {
    onNavClick(item.label);
    setMobileMenuOpen(false);
    if (item.href && item.href.startsWith('#')) {
      if (item.id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="w-full pt-3 sm:pt-4 pb-2 px-4 sm:px-6 md:px-12 flex items-center justify-between z-20 relative flex-nowrap whitespace-nowrap">
        {/* Brand Logo */}
        <button
          onClick={onBrandClick}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white hover:opacity-90 transition-opacity focus:outline-hidden whitespace-nowrap shrink-0 font-['Plus_Jakarta_Sans',sans-serif]"
        >
          {brandName}
        </button>

        {/* Center Nav — desktop only */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-full shadow-lg absolute left-1/2 -translate-x-1/2 flex-nowrap whitespace-nowrap">
          {navItems.map((item) => {
            const isActive =
              activeNav.toLowerCase() === item.id.toLowerCase() ||
              (activeNav === 'Home' && item.id === 'home');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-3.5 xl:px-4 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-[#0B132B] font-semibold shadow-xs'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right controls */}
        <div ref={menuRef} className="flex items-center space-x-2 sm:space-x-3 shrink-0 whitespace-nowrap relative">
          {/* Language Toggle */}
          <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full text-xs font-semibold">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === 'en' ? 'bg-white text-[#0B132B] font-bold shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                language === 'fr' ? 'bg-white text-[#0B132B] font-bold shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              FR
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Mobile Dropdown — anchored to right-controls div, not header */}
          {mobileMenuOpen && (
            <div
              className="lg:hidden absolute top-[calc(100%+10px)] right-0 w-56 bg-[#0A1128]/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50"
              style={{ animation: 'mobileMenuIn 0.18s ease-out both' }}
            >
              <div className="flex flex-col p-2">
                {navItems.map((item) => {
                  const isActive = activeNav.toLowerCase() === item.id.toLowerCase();
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`px-4 py-3 text-left text-sm font-medium rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#0B132B] font-bold'
                          : 'text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Full-screen backdrop to catch taps outside the menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
