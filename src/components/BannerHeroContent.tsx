import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BannerHeroContentProps {
  onCtaClick?: () => void;
}

export function BannerHeroContent({ onCtaClick }: BannerHeroContentProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto my-auto py-1 sm:py-2 z-10 relative">
      {/* Top Floating Experience Badge */}
      <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-semibold text-amber-300 mb-2 shadow-lg animate-float">
        <Sparkles className="w-3 h-3" />
        <span>{t('heroBadge')}</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-extrabold text-white tracking-tight leading-[1.14] max-w-xl mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
        {t('heroHeadline')}
      </h1>

      {/* Subtitle */}
      <p className="text-[11px] sm:text-xs md:text-sm text-white/85 font-normal max-w-md mb-3 sm:mb-4 leading-relaxed">
        {t('heroSubtitle')}
      </p>

      {/* CTA Button */}
      <button
        onClick={onCtaClick}
        className="group inline-flex items-center space-x-2 bg-white hover:bg-white/95 text-[#0B132B] font-medium text-xs py-1.5 pl-4 pr-1 rounded-full shadow-2xl transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer"
      >
        <span className="font-semibold tracking-tight">{t('planMyTrip')}</span>
        {/* Blue Circle Badge with Arrow */}
        <div className="w-6.5 h-6.5 rounded-full bg-[#1A62FF] group-hover:bg-[#004FFF] text-white flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45 shadow-md">
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </button>
    </div>
  );
}
