import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BannerNavbarProps {
  brandName: string;
}

export function BannerNavbar({ brandName }: BannerNavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/packages', label: t('packages') },
    { path: '/custom-itinerary', label: t('tailorMadeItineraries') || 'Custom Itinerary' },
    { path: '/about', label: t('aboutUs') },
    { path: '/reviews', label: t('whyUs') },
    { path: '/contact', label: t('contact') },
  ];

  // Close mobile menu on outside tap
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

  return (
    <>
      <header className="w-full pt-3 sm:pt-4 pb-2 px-3 sm:px-6 md:px-12 z-20 relative flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white hover:opacity-90 transition-opacity focus:outline-none shrink-0 font-['Plus_Jakarta_Sans',sans-serif] text-left truncate max-w-[180px] sm:max-w-none"
        >
          {brandName}
        </Link>

        {/* Desktop Nav Pills */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-full shadow-lg absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3.5 xl:px-4 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#0B132B] font-semibold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Controls — EN/FR toggle + Wizard trigger button + Hamburger */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => navigate('/custom-itinerary')}
            className="hidden sm:inline-flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-[#0B132B] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wizard</span>
          </button>

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

      {/* ── Mobile dropdown menu ── */}
      <div
        ref={dropdownRef}
        className={`lg:hidden fixed top-[75px] right-3 w-60 z-[999] rounded-2xl overflow-hidden shadow-2xl
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
        <div className="flex flex-col p-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `w-full px-4 py-3 text-left text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0B132B] font-bold'
                    : 'text-white/85 hover:text-white hover:bg-white/10 active:bg-white/20'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
