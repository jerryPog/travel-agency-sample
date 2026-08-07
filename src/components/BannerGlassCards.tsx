import { Compass, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function BannerGlassCards() {
  const { t } = useLanguage();

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 pb-5 pt-1 flex flex-col md:flex-row justify-between items-stretch gap-4 z-10 relative">
      {/* Bottom Left Card - Tailor-Made Itineraries */}
      <div className="w-full md:w-[320px] lg:w-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4.5 shadow-2xl glass-card-hover group">
        <div className="w-8.5 h-8.5 rounded-xl bg-white text-[#0B132B] flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          <Compass className="w-4.5 h-4.5 text-[#0B132B] stroke-[2.2]" />
        </div>

        <h3 className="text-base md:text-lg font-bold text-white mb-1.5 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
          Tailor-Made Itineraries
        </h3>

        <p className="text-white/80 text-xs leading-relaxed font-normal">
          {t('statTravelers')}
        </p>
      </div>

      {/* Bottom Right Card - 24/7 Travel Support */}
      <div className="w-full md:w-[320px] lg:w-[340px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4.5 shadow-2xl glass-card-hover group">
        <div className="w-8.5 h-8.5 rounded-xl bg-white text-[#0B132B] flex items-center justify-center mb-3 shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
          <Headphones className="w-4.5 h-4.5 text-[#0B132B] stroke-[2.2]" />
        </div>

        <h3 className="text-base md:text-lg font-bold text-white mb-1.5 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
          24/7 Travel Support
        </h3>

        <p className="text-white/80 text-xs leading-relaxed font-normal">
          {t('statConcierge')}
        </p>
      </div>
    </div>
  );
}
