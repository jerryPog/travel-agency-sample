import { useState, useEffect, useRef } from 'react';
import { Star, MessageSquareQuote, MapPin, Compass, MessageCircleHeart, Globe2, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function TestimonialsTrustSection() {
  const { t } = useLanguage();
  const reviews = [
    {
      id: 1,
      name: 'Aarav & Meera Sharma',
      location: 'Mumbai, India',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      plan: 'Classic Plan',
      rating: 5,
      date: 'Traveled Oct 2025',
      quote: 'Our 6-day trip felt like it was planned by a friend who actually lives in Paris — not a travel agency. Every café recommendation in Le Marais was spot on!',
    },
    {
      id: 2,
      name: 'Emily & David Watson',
      location: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      plan: 'Premium Plan',
      rating: 5,
      date: 'Traveled Dec 2025',
      quote: 'The private tour of Versailles and Monet’s gardens in Giverny was the highlight of our honeymoon. Having a personal concierge on WhatsApp 24/7 gave us total peace of mind.',
    },
    {
      id: 3,
      name: 'Sophia Martinez',
      location: 'New York, USA',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      plan: 'Discovery Plan',
      rating: 5,
      date: 'Traveled Jan 2026',
      quote: 'As a solo female traveler on my first trip to Europe, the self-guided walking maps and safety tips were invaluable. I discovered local bakeries I never would have found.',
    },
    {
      id: 4,
      name: 'Kenji & Mayumi Takahashi',
      location: 'Tokyo, Japan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      plan: 'Premium Plan',
      rating: 5,
      date: 'Traveled Jan 2026',
      quote: 'Exceptional service! Skip-the-line access at the Louvre saved us hours of waiting. The private wine tasting in Montmartre was unforgettable.',
    },
    {
      id: 5,
      name: 'Priya & Rohan Mehta',
      location: 'Delhi, India',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      plan: 'Classic Plan',
      rating: 5,
      date: 'Traveled Nov 2025',
      quote: 'Ronak and his team designed the perfect balance of iconic sights and relaxed neighborhood walks. Best travel planning service we have ever used!',
    },
    {
      id: 6,
      name: 'Lucas & Chloe Bernard',
      location: 'Montreal, Canada',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
      plan: 'Classic Plan',
      rating: 5,
      date: 'Traveled Dec 2025',
      quote: 'From our airport transfer to our anniversary dinner at a hidden bistro near the Seine, everything was seamless. Highly recommended!',
    },
    {
      id: 7,
      name: 'Hannah Lindqvist',
      location: 'Stockholm, Sweden',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      plan: 'Discovery Plan',
      rating: 5,
      date: 'Traveled Sep 2025',
      quote: 'The 3-day Paris itinerary was beautifully structured. Not rushed, super easy to follow, and packed with insider local secrets.',
    },
    {
      id: 8,
      name: 'Marcus Vance',
      location: 'Sydney, Australia',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      plan: 'Premium Plan',
      rating: 5,
      date: 'Traveled Oct 2025',
      quote: 'Worth every rupee and dollar. Having local experts handle bookings and transfers allowed us to just sit back and soak in Paris.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 5 seconds (5000ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
      setIsFading(false);
    }, 250);
  };

  const handlePrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      setIsFading(false);
    }, 250);
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsFading(false);
    }, 250);
  };

  const activeReview = reviews[currentIndex];

  const trustPoints = [
    {
      emoji: '🇫🇷',
      icon: MapPin,
      title: 'Local Knowledge',
      description: "Local knowledge you won't find in guidebooks.",
    },
    {
      emoji: '🗺️',
      icon: Compass,
      title: 'Customized Itineraries',
      description: 'Fully customized itineraries, not cookie-cutter tours.',
    },
    {
      emoji: '💬',
      icon: MessageCircleHeart,
      title: '24/7 Support',
      description: '24/7 support during your entire trip.',
    },
    {
      emoji: '⭐',
      icon: Globe2,
      title: 'Global Love',
      description: 'Loved by travelers from over 20 countries worldwide.',
    },
  ];

  return (
    <section id="why-us" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90 mb-4 tracking-wide">
          {t('testimonialsBadge')}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-4">
          {t('testimonialsTitle')}
        </h2>
        <p className="text-white/80 text-sm leading-relaxed">
          {t('testimonialsSub')}
        </p>
      </div>

      {/* Trust Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {trustPoints.map((point, index) => {
          const Icon = point.icon;
          const delayClass = `delay-${(index + 1) * 100}`;
          return (
            <div
              key={index}
              className={`reveal-scale ${delayClass} bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col justify-between glass-card-hover group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                    <span>{point.emoji}</span>
                  </div>
                  <Icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                  {point.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-Rotating 5-Second Review Slideshow Card */}
      <div className="reveal-on-scroll delay-300 max-w-4xl mx-auto">
        <div className="text-center mb-4 flex items-center justify-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
            Live Reviews • Auto-Rotating Every 5s
          </span>
        </div>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden glass-card-hover group"
        >
          {/* Animated 5-Second Timer Progress Bar at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
            <div
              key={currentIndex}
              className={`h-full bg-gradient-to-r from-amber-400 to-amber-300 ${
                isPaused ? 'opacity-50' : 'animate-[timerProgress_5s_linear_infinite]'
              }`}
              style={{
                animationDuration: '5000ms',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            />
          </div>

          {/* Controls Bar: Prev & Next Arrows */}
          <div className="absolute top-6 right-6 flex items-center space-x-2 z-20">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0B132B] border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0B132B] border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Active Review Box */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              isFading ? 'opacity-0 scale-98 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative z-10">
              {/* Left Avatar & Rating */}
              <div className="shrink-0 flex flex-col items-center text-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-amber-300/80 overflow-hidden shadow-2xl mb-3">
                  <img
                    src={activeReview.avatar}
                    alt={activeReview.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1 border-2 border-[#0B132B]">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                  ))}
                </div>

                <span className="text-[11px] font-semibold text-amber-300 bg-amber-300/15 px-3 py-0.5 rounded-full border border-amber-300/30 font-mono">
                  {activeReview.plan}
                </span>
              </div>

              {/* Right Quote Content */}
              <div className="text-center md:text-left flex-1">
                <MessageSquareQuote className="w-9 h-9 text-white/30 mb-2 mx-auto md:mx-0" />
                <blockquote className="text-base sm:text-lg md:text-xl text-white font-medium italic font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed mb-4">
                  "{activeReview.quote}"
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-3 text-xs">
                  <div>
                    <span className="font-bold text-white text-sm font-['Plus_Jakarta_Sans',sans-serif]">
                      {activeReview.name}
                    </span>
                    <span className="text-white/60 ml-2 font-normal">
                      • {activeReview.location}
                    </span>
                  </div>
                  <span className="text-white/50 text-[11px] font-mono mt-1 sm:mt-0">
                    {activeReview.date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dot Pagination Indicators */}
          <div className="flex items-center justify-center space-x-2 mt-8 border-t border-white/10 pt-4">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-8 bg-amber-300 shadow-[0_0_8px_#fcd34d]'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
