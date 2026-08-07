import { CheckCircle2, Sparkles, Star, ArrowRight, ShieldCheck, Info } from 'lucide-react';

export function PricingPlansSection() {
  const plans = [
    {
      id: 'discovery',
      name: 'Discovery Plan',
      price: '₹2,999',
      pricePeriod: 'per trip planning',
      tagline: 'For short trips & first-timers',
      badge: 'Essential',
      isPopular: false,
      features: [
        '3-day curated Paris itinerary',
        'Access to top landmarks (Eiffel Tower, Louvre exterior, Notre-Dame)',
        'Self-guided walking routes with local tips',
        'Email support before your trip',
      ],
      ctaText: 'Get Started',
      delay: 'delay-100',
    },
    {
      id: 'classic',
      name: 'Classic Plan',
      price: '₹6,999',
      pricePeriod: 'per trip planning',
      tagline: 'For travelers who want it all planned out',
      badge: 'Most Popular',
      isPopular: true,
      features: [
        '5–7 day full itinerary, day-by-day',
        'Skip-the-line tickets to major attractions',
        'Handpicked cafés, restaurants & neighborhoods',
        'Dedicated travel consultant',
        '24/7 support during your trip',
      ],
      ctaText: 'Choose Classic Plan',
      delay: 'delay-200',
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '₹14,999',
      pricePeriod: 'per trip planning',
      tagline: 'For a fully personalized, private experience',
      badge: 'Bespoke VIP',
      isPopular: false,
      features: [
        'Fully custom itinerary built around your interests',
        'Private guided tours & experiences',
        'Day trips included (Versailles, Giverny, etc.)',
        'Personal travel concierge, available anytime',
        'Airport transfers & priority bookings',
      ],
      ctaText: 'Choose Premium',
      delay: 'delay-300',
    },
  ];

  const handleChoosePlan = () => {
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="packages" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 text-white font-['DM_Sans',sans-serif] relative">
      {/* Section Header */}
      <div className="reveal-on-scroll text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90 mb-3 tracking-wide">
          Travel Packages & Fees
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-tight">
          Choose Your Paris Experience
        </h2>
        <p className="text-white/80 text-sm sm:text-base mt-3 leading-relaxed">
          Transparent planning & concierge fees designed to match your pace, interests, and style of travel.
        </p>
      </div>

      {/* 3-Tier Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative z-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`reveal-on-scroll ${plan.delay} relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 glass-card-hover group ${
              plan.isPopular
                ? 'bg-white/15 backdrop-blur-2xl border-2 border-amber-300/80 shadow-[0_20px_50px_rgba(251,191,36,0.18)] md:-translate-y-2'
                : 'bg-white/10 backdrop-blur-xl border border-white/20'
            }`}
          >
            {/* Popular Badge Floating on Top */}
            {plan.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#0B132B] text-xs font-extrabold tracking-wider uppercase shadow-lg flex items-center space-x-1.5">
                <Star className="w-3.5 h-3.5 fill-[#0B132B]" />
                <span>Most Popular</span>
              </div>
            )}

            <div>
              {/* Card Header Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                  plan.isPopular
                    ? 'bg-amber-300/20 text-amber-300 border-amber-300/40'
                    : 'bg-white/15 text-white/90 border-white/20'
                }`}>
                  {plan.badge}
                </span>
              </div>

              {/* Plan Title */}
              <h3 className="text-2xl font-bold text-white mb-1 font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                {plan.name}
              </h3>

              {/* Tagline */}
              <p className="text-white/75 text-xs italic mb-5 leading-relaxed">
                "{plan.tagline}"
              </p>

              {/* Price Tag Display */}
              <div className="mb-6 pb-5 border-b border-white/10 flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                  {plan.price}
                </span>
                <span className="text-xs text-white/60 font-medium uppercase tracking-wider">
                  / {plan.pricePeriod}
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-3.5 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-white/90">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                      plan.isPopular ? 'text-amber-300' : 'text-emerald-400'
                    }`} />
                    <span className="leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={handleChoosePlan}
                className={`w-full py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-[1.02] cursor-pointer shadow-lg ${
                  plan.isPopular
                    ? 'bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 text-[#0B132B]'
                    : 'bg-white hover:bg-white/90 text-[#0B132B]'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#0B132B] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Explicit Pricing Disclaimer Note */}
      <div className="reveal-on-scroll delay-400 mt-10 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md max-w-3xl mx-auto flex items-center space-x-3 shadow-lg">
        <Info className="w-5 h-5 text-amber-300 shrink-0" />
        <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium italic">
          * Prices cover trip planning & concierge services. Flights, stay, and tickets billed separately.
        </p>
      </div>

      {/* Trust Guarantee Note Below Pricing */}
      <div className="reveal-on-scroll delay-500 mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs text-white/70 text-center font-medium">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>No hidden fees or unexpected charges</span>
        </div>
        <div className="hidden sm:block text-white/30">•</div>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>100% money-back satisfaction guarantee</span>
        </div>
      </div>
    </section>
  );
}
