import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { Mail, MapPin, Sparkles, Heart } from 'lucide-react';

export function FooterNav() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#040816]/95 border-t border-white/10 text-white font-['DM_Sans',sans-serif] relative z-20 pt-12 pb-8 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        {/* Col 1: Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="text-2xl font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-white tracking-wider">
            {siteConfig.brandName}
          </Link>
          <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="flex items-center space-x-2 text-xs text-amber-300 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Paris Concierge & VIP Jet Services</span>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold font-mono text-white/50 uppercase tracking-widest">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-white/80">
            <li>
              <Link to="/" className="hover:text-amber-300 transition-colors">
                {t('home')}
              </Link>
            </li>
            <li>
              <Link to="/packages" className="hover:text-amber-300 transition-colors">
                {t('packages')}
              </Link>
            </li>
            <li>
              <Link to="/custom-itinerary" className="hover:text-amber-300 transition-colors">
                {t('tailorMadeItineraries') || 'Custom Itinerary'}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-300 transition-colors">
                {t('aboutUs')}
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-amber-300 transition-colors">
                {t('whyUs')}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-300 transition-colors">
                {t('contact')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact & Legal */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs font-bold font-mono text-white/50 uppercase tracking-widest">
            Contact Concierge
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-white/80">
            <li className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>Paris, France (Europe/Paris CET)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-3">
        <div>
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved. Founded by {siteConfig.founder.name}.
        </div>
        <div className="flex items-center space-x-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-400 fill-current inline" />
          <span>in Paris</span>
        </div>
      </div>
    </footer>
  );
}
