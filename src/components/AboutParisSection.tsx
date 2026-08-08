import { ArrowUpRight, Car, Clock, Sun, MapPin, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function AboutParisSection() {
  const { t } = useLanguage();

  const stats = [
    { value: '5+', label: t('yearsExp') },
    { value: '1,200+', label: t('happyTravelers') },
    { value: '40+', label: t('scenicRoutes') },
    { value: '4.9', label: t('avgRating') },
  ];

  const brandLogos = [
    { name: 'AIR FRANCE', badge: t('badgeOfficialPartner') },
    { name: 'MICHELIN GUIDE', badge: t('badgeFeatured') },
    { name: 'CONDÉ NAST', badge: t('badgeTopPick') },
    { name: 'NATIONAL GEOGRAPHIC', badge: t('badgeExcellence') },
    { name: 'FORBES TRAVEL', badge: t('badge5Star') },
    { name: 'UNESCO', badge: t('badgeHeritage') },
  ];

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDistricts = () => {
    const el = document.querySelector('#districts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Top Header Row */}
      <div className="mb-8 sm:mb-12 space-y-3">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 tracking-wide">
            {t('aboutBadge')}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight font-['Plus_Jakarta_Sans',sans-serif] tracking-tight max-w-4xl">
          {t('aboutHeadline')}
        </h2>
      </div>

      {/* Bento Grid Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Card 1: Experience Overview */}
        <div className="md:col-span-6 lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl min-h-[280px] glass-card-hover group">
          <div>
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              {t('aboutOverviewDesc')}
            </p>
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 text-[11px] text-white/80 mb-6">
              <span className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                <Car className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('pickupIncluded')}</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                <Clock className="w-3.5 h-3.5 text-blue-300" />
                <span>{t('tripsDuration')}</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                <Sun className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t('sunsetViews')}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={scrollToContact}
              className="bg-white text-[#0B132B] font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-white/90 transition-all flex items-center space-x-2 cursor-pointer shadow-md group-hover:scale-105"
            >
              <span>{t('contactUs')}</span>
            </button>
            <button
              onClick={scrollToContact}
              title="Contact Us"
              className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0B132B] transition-all cursor-pointer shadow-md hover:scale-110"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Featured Paris Image */}
        <div className="md:col-span-6 lg:col-span-5 relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[300px] group shadow-2xl border border-white/20">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
            alt="Paris Explore"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-6 left-6 text-xl font-bold text-white tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
            {t('parisExplore')}
          </div>
        </div>

        {/* Card 3: Travelers Moments Gallery */}
        <div className="md:col-span-12 lg:col-span-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl min-h-[280px] glass-card-hover">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <img
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=80"
              alt="Moment 1"
              className="w-full h-24 sm:h-28 object-cover rounded-xl shadow-md border border-white/20 hover:scale-105 transition-transform"
            />
            <img
              src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=300&q=80"
              alt="Moment 2"
              className="w-full h-24 sm:h-28 object-cover rounded-xl shadow-md border border-white/20 hover:scale-105 transition-transform"
            />
            <img
              src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=300&q=80"
              alt="Moment 3"
              className="w-full h-24 sm:h-28 object-cover rounded-xl shadow-md border border-white/20 hover:scale-105 transition-transform"
            />
          </div>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
            {t('momentsDesc')}
          </p>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-8 border-y border-white/10 mb-12 sm:mb-16">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 font-['Plus_Jakarta_Sans',sans-serif] group-hover:scale-105 group-hover:text-amber-300 transition-all">
              {stat.value}
            </span>
            <span className="text-white/70 text-xs sm:text-sm font-medium uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* "Why Choose Us" Header */}
      <div className="mb-8 sm:mb-10">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 mb-3">
          {t('whyUs')}
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight max-w-xl leading-tight">
            {t('whyTitle')}
          </h2>
          <p className="text-white/70 text-xs sm:text-sm max-w-xs leading-relaxed">
            {t('whySub')}
          </p>
        </div>
      </div>

      {/* "Why Choose Us" Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 sm:mb-20">
        {/* Card A: Local Expertise */}
        <div className="md:col-span-6 lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl min-h-[260px] relative overflow-hidden glass-card-hover group">
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-5 text-white group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
              {t('localExpertise')}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              {t('localExpertiseDesc')}
            </p>
          </div>
        </div>

        {/* Card B: Guides & Community Stack */}
        <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex-1 flex flex-col justify-center shadow-2xl glass-card-hover">
            <h3 className="text-base font-bold text-white mb-1.5 font-['Plus_Jakarta_Sans',sans-serif]">
              {t('certifiedGuides')}
            </h3>
            <p className="text-white/75 text-xs leading-relaxed">
              {t('certifiedGuidesDesc')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex-1 flex flex-col justify-between shadow-2xl glass-card-hover">
            <div>
              <h3 className="text-base font-bold text-white mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                {t('communityPart')}
              </h3>
              {/* Avatar Stack */}
              <div className="flex -space-x-2 mb-3">
                <img
                  className="w-7 h-7 rounded-full border-2 border-[#0B132B] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Guide 1"
                />
                <img
                  className="w-7 h-7 rounded-full border-2 border-[#0B132B] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Guide 2"
                />
                <img
                  className="w-7 h-7 rounded-full border-2 border-[#0B132B] object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Guide 3"
                />
                <div className="w-7 h-7 rounded-full border-2 border-[#0B132B] bg-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                  +12
                </div>
              </div>
            </div>
            <p className="text-white/75 text-xs leading-relaxed">
              {t('communityPartDesc')}
            </p>
          </div>
        </div>

        {/* Card C: Visual Moment Card (Interactive Button) */}
        <button
          onClick={scrollToDistricts}
          className="md:col-span-12 lg:col-span-4 relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[300px] shadow-2xl border border-white/20 group text-left cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=800&q=80"
            alt="Trip moment"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <span className="text-sm sm:text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
              {t('seeRealMoments')}
            </span>
            <div className="w-9 h-9 rounded-full bg-white text-[#0B132B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-4.5 h-4.5" />
            </div>
          </div>
        </button>
      </div>

      {/* Brand & Partner Logos Row */}
      <div className="pt-8 border-t border-white/10">
        <p className="text-center text-xs text-white/50 font-semibold tracking-widest uppercase mb-8">
          {t('trustedByPartners')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity">
          {brandLogos.map((brand, i) => (
            <div
              key={i}
              className="bg-white/5 hover:bg-white/15 border border-white/15 px-2 py-2 rounded-2xl w-full h-20 flex flex-col items-center justify-center text-center transition-all group cursor-default hover:scale-105 shadow-md shrink-0"
            >
              <span className="text-[10px] sm:text-xs font-extrabold tracking-wider text-white leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                {brand.name}
              </span>
              <span className="text-[9px] text-white/50 mt-1 font-medium leading-tight text-center">
                {brand.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
