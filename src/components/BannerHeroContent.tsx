import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BannerHeroContentProps {
  onCtaClick?: () => void;
}

export function BannerHeroContent({ onCtaClick }: BannerHeroContentProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-0 max-w-xl lg:max-w-[42vw] mx-auto my-auto py-2 sm:py-4 z-10 relative">
      {/* Soft Ambient Radial Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Top Floating Experience Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-amber-400/30 backdrop-blur-md text-[11px] font-mono tracking-widest uppercase font-semibold text-amber-300 mb-3 shadow-lg animate-float"
      >
        <Sparkles className="w-3 h-3 text-amber-300" aria-hidden="true" />
        <span>{t('heroBadge')}</span>
      </motion.div>

      {/* Main Editorial Serif Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        id="hero-headline"
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif-editorial text-white tracking-tight leading-[1.15] mb-3 break-words text-gradient-shimmer"
      >
        {t('heroHeadline')}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[11px] sm:text-xs md:text-sm text-white/90 font-normal mb-4 sm:mb-5 leading-relaxed break-words"
      >
        {t('heroSubtitle')}
      </motion.p>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onCtaClick}
        className="group inline-flex items-center space-x-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 text-[#070B14] font-bold text-xs sm:text-sm py-2 pl-5 pr-1.5 rounded-full shadow-2xl transition-colors cursor-pointer border border-amber-300/40"
      >
        <span className="font-['Plus_Jakarta_Sans',sans-serif] tracking-wide uppercase">{t('planMyTrip')}</span>
        {/* Circle Badge with Arrow */}
        <div className="w-7 h-7 rounded-full bg-[#070B14] group-hover:bg-black text-amber-300 flex items-center justify-center transition-all duration-300 transform group-hover:rotate-45 shadow-md">
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </div>
      </motion.button>
    </div>
  );
}
