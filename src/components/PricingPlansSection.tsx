import { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, Calculator, Users, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function PricingPlansSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'romantic' | 'vip' | 'art' | 'family'>('all');

  // Custom Quote Calculator State
  const [calcDays, setCalcDays] = useState(5);
  const [calcTravelers, setCalcTravelers] = useState(2);

  const categories = [
    { id: 'all', label: t('filterAll') },
    { id: 'romantic', label: t('filterRomantic') },
    { id: 'vip', label: t('filterVIP') },
    { id: 'art', label: t('filterFood') },
    { id: 'family', label: t('filterFamily') },
  ];

  const plans = [
    {
      id: 'discovery',
      category: ['all', 'art', 'family'],
      name: t('planDiscTitle'),
      price: '₹43,900',
      subPrice: '≈ €490',
      pricePeriod: 'per trip',
      tagline: t('planDiscTagline'),
      badge: 'Essential',
      isPopular: false,
      features: [
        t('planDiscH1'),
        t('planDiscH2'),
        t('planDiscH3'),
        t('planDiscH4'),
      ],
      ctaText: 'Choose Discovery',
    },
    {
      id: 'classic',
      category: ['all', 'romantic', 'art'],
      name: t('planClassTitle'),
      price: '₹85,500',
      subPrice: '≈ €950',
      pricePeriod: 'per trip',
      tagline: t('planClassTagline'),
      badge: 'Most Popular',
      isPopular: true,
      features: [
        t('planClassH1'),
        t('planClassH2'),
        t('planClassH3'),
        t('planClassH4'),
        t('planClassH5'),
      ],
      ctaText: 'Choose Classic Plan',
    },
    {
      id: 'premium',
      category: ['all', 'vip', 'romantic'],
      name: t('planPremTitle'),
      price: '₹1,66,500',
      subPrice: '≈ €1,850',
      pricePeriod: 'per trip',
      tagline: t('planPremTagline'),
      badge: 'Bespoke VIP',
      isPopular: false,
      features: [
        t('planPremH1'),
        t('planPremH2'),
        t('planPremH3'),
        t('planPremH4'),
        t('planPremH5'),
      ],
      ctaText: 'Choose Bespoke VIP',
    },
  ];

  const filteredPlans = activeCategory === 'all'
    ? plans
    : plans.filter((p) => p.category.includes(activeCategory));

  // Dynamic Quote Calculation (€120 base/day + €75/person/day)
  const estimatedTotalEur = (calcDays * 120 + calcTravelers * calcDays * 75);
  const estimatedTotalInr = estimatedTotalEur * 90;

  const handleChoosePlan = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 text-white font-['DM_Sans',sans-serif]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-amber-300 mb-3 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{t('pricingBadge')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight text-white mb-3">
          {t('pricingTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-white/70">
          {t('pricingSub')}
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-[#0B132B] font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12 sm:mb-16">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 glass-card-hover ${
              plan.isPopular
                ? 'bg-gradient-to-b from-amber-500/20 via-white/10 to-white/5 border-2 border-amber-400 shadow-2xl scale-[1.01]'
                : 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl'
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-[#0B132B] text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-md">
                {plan.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white">
                  {plan.name}
                </h3>
                {!plan.isPopular && (
                  <span className="text-[10px] font-mono uppercase bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-white/70 mb-6 font-normal min-h-[32px]">
                {plan.tagline}
              </p>

              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                    {plan.price}
                  </span>
                  <span className="text-xs text-white/60 font-normal">/{plan.pricePeriod}</span>
                </div>
                <div className="text-xs font-mono text-amber-300/80 mt-1">
                  ({plan.subPrice})
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleChoosePlan}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                plan.isPopular
                  ? 'bg-amber-400 hover:bg-amber-300 text-[#0B132B] shadow-lg'
                  : 'bg-white hover:bg-white/90 text-[#0B132B]'
              }`}
            >
              <span>{plan.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Interactive Custom Quote Calculator Bar */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold font-mono mb-2 uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          <span>{t('calcTitle')}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white mb-6">
          {t('calcTitle')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Sliders */}
          <div className="md:col-span-8 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-white/80 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('calcDays')}</span>
                </span>
                <span className="font-bold text-amber-300 font-mono">{calcDays} Days</span>
              </div>
              <input
                type="range"
                min={2}
                max={14}
                value={calcDays}
                onChange={(e) => setCalcDays(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-white/80 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('calcTravelers')}</span>
                </span>
                <span className="font-bold text-amber-300 font-mono">{calcTravelers} Travelers</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={calcTravelers}
                onChange={(e) => setCalcTravelers(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>
          </div>

          {/* Estimate Display Box */}
          <div className="md:col-span-4 bg-white/10 border border-white/20 rounded-2xl p-5 text-center space-y-1.5">
            <div className="text-xs text-white/70 font-medium">{t('calcTotal')}</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-['Plus_Jakarta_Sans',sans-serif]">
              ₹{estimatedTotalInr.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-amber-200/80">
              (≈ €{estimatedTotalEur.toLocaleString()})
            </div>
            <div className="text-[11px] text-white/50">{t('calcSub')}</div>
            <button
              onClick={handleChoosePlan}
              className="w-full mt-3 py-2 bg-white text-[#0B132B] hover:bg-white/90 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              {t('lockEstimate')}
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
