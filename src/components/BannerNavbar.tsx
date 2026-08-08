import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { playTactileClick } from '../utils/audio';

interface BannerNavbarProps {
  brandName: string;
}

export function BannerNavbar({ brandName }: BannerNavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true); // Default muted
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
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/"
            onClick={() => playTactileClick(isAudioMuted)}
            className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white hover:opacity-90 transition-opacity focus:outline-none shrink-0 font-serif-editorial text-left truncate max-w-[180px] sm:max-w-none block text-gold-gradient"
          >
            {brandName}
          </Link>
        </motion.div>

        {/* Desktop Nav Pills with Framer Motion Active Indicator */}
        <nav className="hidden lg:flex items-center space-x-1 bg-[#070B14]/80 backdrop-blur-md border border-white/20 p-1.5 rounded-full shadow-lg absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => playTactileClick(isAudioMuted)}
              className={({ isActive }) =>
                `relative px-3.5 xl:px-4 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-[#070B14] font-bold' : 'text-white/80 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Controls — Audio Toggle + EN/FR + Wizard + Hamburger */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Audio Feedback Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            aria-label={isAudioMuted ? 'Unmute luxury sound effects' : 'Mute luxury sound effects'}
            title={isAudioMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playTactileClick(isAudioMuted);
              navigate('/custom-itinerary');
            }}
            className="hidden sm:inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-400 to-yellow-200 text-[#070B14] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wizard</span>
          </motion.button>

          <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 p-0.5 sm:p-1 rounded-full text-[11px] sm:text-xs font-semibold">
            {(['en', 'fr'] as const).map((lang) => (
              <motion.button
                key={lang}
                whileTap={{ scale: 0.92 }}
                onClick={() => setLanguage(lang)}
                aria-label={`Switch language to ${lang.toUpperCase()}`}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-amber-400 text-[#070B14] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {lang.toUpperCase()}
              </motion.button>
            ))}
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <motion.button
            ref={hamburgerRef}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-8.5 h-8.5 sm:w-9 sm:h-9 flex items-center justify-center text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </header>

      {/* ── Mobile dropdown menu with Framer Motion AnimatePresence ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden fixed top-[75px] right-3 w-60 z-[999] rounded-2xl overflow-hidden shadow-2xl origin-top-right"
            style={{
              background: 'rgba(7, 11, 20, 0.96)',
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
                  onClick={() => {
                    playTactileClick(isAudioMuted);
                    setMobileMenuOpen(false);
                  }}
                  className={({ isActive }) =>
                    `w-full px-4 py-3 text-left text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-[#070B14] font-bold'
                        : 'text-white/85 hover:text-white hover:bg-white/10 active:bg-white/20'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
