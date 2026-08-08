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
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home',     label: t('home'),     href: '#' },
    { id: 'about',    label: t('aboutUs'),  href: '#about' },
    { id: 'services', label: t('services'), href: '#services' },
    { id: 'packages', label: t('packages'), href: '#packages' },
    { id: 'why-us',   label: t('whyUs'),    href: '#why-us' },
    { id: 'contact',  label: t('contact'),  href: '#contact' },
  ];

  // Close on outside tap — 50ms delay so hamburger toggle doesn't self-close
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handle = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current?.contains(target) ||
        hamburgerRef.current?.contains(target)
      ) return;
      setMobileMenuOpen(false);
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handle);
      document.addEventListener('touchstart', handle, { passive: true });
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileMenuOpen(false);
    onNavClick(item.label);
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
      <header className="w-full pt-3 sm:pt-4 pb-2 px-3 sm:px-6 md:px-12 z-20 relative flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={onBrandClick}
          className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white hover:opacity-90 transition-opacity focus:outline-none shrink-0 font-['Plus_Jakarta_Sans',sans-serif] text-left truncate max-w-[180px] sm:max-w-none"
        >
          {brandName}
        </button>

        {/* Desktop nav pill — absolute center */}
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

        {/* Controls — EN/FR toggle + Hamburger */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 p-0.5 sm:p-1 rounded-full text-[11px] sm:text-xs font-semibold">
            {(['en', 'fr'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                aria-label={`Switch language to ${lang.toUpperCase()}`}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-white text-[#0B132B] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-8.5 h-8.5 sm:w-9 sm:h-9 flex items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── Mobile dropdown rendered FIXED so nothing clips it ── */}
      <div
        ref={dropdownRef}
        className={`lg:hidden fixed top-[75px] right-3 w-56 z-[999] rounded-2xl overflow-hidden shadow-2xl
          transition-all duration-300 ease-out origin-top-right
          ${mobileMenuOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
        style={{
          background: 'rgba(8, 16, 40, 0.96)',
          border: '1px solid rgba(255,255,255,0.15)',
          maxHeight: 'calc(100dvh - 80px)',
          overflowY: 'auto',
        }}
      >
        <div className="flex flex-col p-2">
          {navItems.map((item) => {
            const isActive = activeNav.toLowerCase() === item.id.toLowerCase();
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full px-4 py-3 text-left text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0B132B] font-bold'
                    : 'text-white/85 hover:text-white hover:bg-white/10 active:bg-white/20'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
