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

  // Close on outside tap only — intentionally no scroll-close
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    // slight delay so the toggle click itself doesn't immediately re-close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleOutside);
      document.addEventListener('touchstart', handleOutside, { passive: true });
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (item: typeof navItems[0]) => {
    onNavClick(item.label);
    setMobileMenuOpen(false);
    if (item.href?.startsWith('#')) {
      if (item.id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="w-full pt-3 sm:pt-4 pb-2 px-4 sm:px-6 md:px-12 flex items-center justify-between z-20 relative flex-nowrap whitespace-nowrap">
        {/* Brand */}
        <button
          onClick={onBrandClick}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white hover:opacity-90 transition-opacity focus:outline-none whitespace-nowrap shrink-0 font-['Plus_Jakarta_Sans',sans-serif]"
        >
          {brandName}
        </button>

        {/* Desktop nav pill */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-full shadow-lg absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const isActive =
              activeNav.toLowerCase() === item.id.toLowerCase() ||
              (activeNav === 'Home' && item.id === 'home');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`px-3.5 xl:px-4 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#0B132B] font-semibold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right controls */}
        <div ref={menuRef} className="flex items-center space-x-2 sm:space-x-3 shrink-0 relative">
          {/* Language toggle */}
          <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full text-xs font-semibold">
            {(['en', 'fr'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-white text-[#0B132B] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Mobile dropdown — always mounted, CSS transition */}
          <div
            className={`lg:hidden absolute top-[calc(100%+12px)] right-0 w-56 bg-[#0A1128]/95 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50 transition-all duration-300 ease-out origin-top-right ${
              mobileMenuOpen
                ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex flex-col p-2">
              {navItems.map((item) => {
                const isActive = activeNav.toLowerCase() === item.id.toLowerCase();
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`px-4 py-3.5 text-left text-sm font-medium rounded-xl transition-all cursor-pointer ${
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
        </div>
      </header>

      {/* Invisible full-screen tap-away backdrop */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
}
