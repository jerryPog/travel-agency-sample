import { useState } from 'react';
import { Landmark, Sparkles, Sliders, Sun, Users2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80';

export function ServicesSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const services = [
    {
      id: 'classic',
      title: t('serviceClassicTitle'),
      description: t('serviceClassicDesc'),
      tag: t('serviceClassicTag'),
      icon: Landmark,
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
      highlights: [t('serviceClassicH1'), t('serviceClassicH2'), t('serviceClassicH3')],
    },
    {
      id: 'hidden',
      title: t('serviceHiddenTitle'),
      description: t('serviceHiddenDesc'),
      tag: t('serviceHiddenTag'),
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      highlights: [t('serviceHiddenH1'), t('serviceHiddenH2'), t('serviceHiddenH3')],
    },
    {
      id: 'custom',
      title: t('serviceCustomTitle'),
      description: t('serviceCustomDesc'),
      tag: t('serviceCustomTag'),
      icon: Sliders,
      image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80',
      highlights: [t('serviceCustomH1'), t('serviceCustomH2'), t('serviceCustomH3')],
    },
    {
      id: 'daytrips',
      title: t('serviceDaytripsTitle'),
      description: t('serviceDaytripsDesc'),
      tag: t('serviceDaytripsTag'),
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80',
      highlights: [t('serviceDaytripsH1'), t('serviceDaytripsH2'), t('serviceDaytripsH3')],
    },
    {
      id: 'group',
      title: t('serviceGroupTitle'),
      description: t('serviceGroupDesc'),
      tag: t('serviceGroupTag'),
      icon: Users2,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      highlights: [t('serviceGroupH1'), t('serviceGroupH2'), t('serviceGroupH3')],
    },
  ];

  const handleExploreClick = () => {
    const el = document.querySelector('#packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300 mb-3">
            {t('servicesBadge')}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight text-white">
            {t('servicesTitle')}
          </h2>
        </div>
      </div>

      {/* Services Grid - Fully responsive on Mobile, Tablet & Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between glass-card-hover group min-h-[360px]"
            >
              {/* Card Image Header */}
              <div className="relative h-48 w-full overflow-hidden bg-black/40">
                <img
                  src={service.image}
                  alt={service.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081028] via-[#081028]/40 to-transparent" />
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-semibold px-3 py-1 rounded-full">
                  {service.tag}
                </span>
                <div className="absolute bottom-3 left-4 w-9 h-9 rounded-full bg-white text-[#0B132B] flex items-center justify-center shadow-lg">
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="flex items-center space-x-2 text-xs text-white/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handleExploreClick}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#0B132B] border border-white/20 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>{t('learnMore')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
