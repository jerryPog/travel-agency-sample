import { useLanguage } from '../context/LanguageContext';

export function BannerGlassCards() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 md:px-8 mt-4 sm:mt-6 z-20 relative font-['DM_Sans',sans-serif]">
      {/* 2 Equal Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        
        {/* Left Card: Custom Itineraries */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl flex flex-col justify-between glass-card-hover group">
          <div>
            <div className="flex items-center space-x-2 text-white/70 text-xs font-medium uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t('tailorMadeItineraries')}</span>
            </div>

            <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white tracking-tight mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
              1,200+
            </div>
          </div>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal mt-1">
            {t('statTravelers')}
          </p>
        </div>

        {/* Right Card: 24/7 Support */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl flex flex-col justify-between glass-card-hover group">
          <div>
            <div className="flex items-center space-x-2 text-white/70 text-xs font-medium uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{t('travelSupport247')}</span>
            </div>

            <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white tracking-tight mb-3 group-hover:scale-105 transition-transform duration-300 origin-left">
              100%
            </div>
          </div>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal mt-1">
            {t('statConcierge')}
          </p>
        </div>

      </div>
    </div>
  );
}
