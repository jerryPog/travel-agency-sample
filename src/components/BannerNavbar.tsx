import { useState } from 'react';
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

  const navItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'packages', label: 'Packages', href: '#packages' },
    { id: 'why-us', label: 'Why Choose Us', href: '#why-us' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    onNavClick(item.label);
    if (item.href && item.href.startsWith('#')) {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (item.id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="w-full pt-5 pb-3 px-6 md:px-12 flex items-center justify-between z-20 relative flex-nowrap whitespace-nowrap">
      {/* Brand Logo */}
      <button
        onClick={onBrandClick}
        className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-white hover:opacity-90 transition-opacity focus:outline-hidden whitespace-nowrap shrink-0 font-['Plus_Jakarta_Sans',sans-serif]"
      >
        {brandName}
      </button>

      {/* Center Navigation Links (Pill Container) - Perfectly Center Aligned */}
      <nav className="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-full shadow-lg absolute left-1/2 -translate-x-1/2 flex-nowrap whitespace-nowrap">
        {navItems.map((item) => {
          const isActive = activeNav.toLowerCase() === item.id.toLowerCase() || (activeNav === 'Home' && item.id === 'home');
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

      {/* Right Controls: Language Toggle & Open Menu Button */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 whitespace-nowrap">
        {/* Language Switcher Toggle */}
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

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all flex items-center space-x-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span className="whitespace-nowrap">{t('openMenu')}</span>
          {mobileMenuOpen ? (
            <X className="w-4 h-4 text-white shrink-0" />
          ) : (
            <Menu className="w-4 h-4 text-white shrink-0" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 right-6 w-64 bg-[#0A1128]/95 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl z-30 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeNav.toLowerCase() === item.id.toLowerCase();
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 text-left text-xs sm:text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-[#0B132B] font-bold'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
