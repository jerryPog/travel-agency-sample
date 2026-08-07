import { Compass, Coffee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function AboutUsStorySection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Container Glass Box */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden glass-card-hover">
        {/* Subtle Decorative Ambient Background Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Heading & Body Story */}
          <div className="lg:col-span-7">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-semibold text-white mb-4 sm:mb-6 tracking-wide">
              {t('storyBadge')}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.18] mb-4 sm:mb-6">
              {t('storyTitle')}
            </h2>

            <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-normal">
              {t('storyDesc')}
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/15 transition-all">
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed italic font-normal">
                {t('storyQuote')}
              </p>
            </div>
          </div>

          {/* Right Column: Visual Imagery Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80"
                  alt="Paris Street Café"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-white flex items-center space-x-1.5">
                  <Coffee className="w-3.5 h-3.5" />
                  <span>{t('quietCafes')}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center hover:scale-105 transition-transform">
                <div className="w-8 h-8 rounded-full bg-white text-[#0B132B] flex items-center justify-center mx-auto mb-2 font-bold text-xs shadow-md">
                  100%
                </div>
                <span className="text-xs font-medium text-white/90">{t('localTeam')}</span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-center hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-white mx-auto mb-2" />
                <span className="text-xs font-medium text-white/90">{t('tailoredPace')}</span>
              </div>

              <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80"
                  alt="Eiffel View"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
