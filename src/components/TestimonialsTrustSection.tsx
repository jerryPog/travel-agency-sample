import { useState, useEffect } from 'react';
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
      date: 'Oct 2025',
      quote: 'Our 6-day trip felt like it was planned by a friend who actually lives in Paris — not a travel agency. Every café recommendation in Le Marais was spot on!',
    },
    {
      id: 2,
      name: 'Emily & David Watson',
      location: 'London, UK',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      plan: 'Premium Plan',
      rating: 5,
      date: 'Dec 2025',
      quote: 'The private tour of Versailles and Monet’s gardens in Giverny was the highlight of our honeymoon. Having a personal concierge on WhatsApp 24/7 gave us total peace of mind.',
    },
    {
      id: 3,
      name: 'Sophia Martinez',
      location: 'New York, USA',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      plan: 'Discovery Plan',
      rating: 5,
      date: 'Jan 2026',
      quote: 'As a solo female traveler on my first trip to Europe, the self-guided walking maps and safety tips were invaluable. I discovered local bakeries I never would have found.',
    },
    {
      id: 4,
      name: 'Kenji & Mayumi Takahashi',
      location: 'Tokyo, Japan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      plan: 'Premium Plan',
      rating: 5,
      date: 'Jan 2026',
      quote: 'Exceptional service! Skip-the-line access at the Louvre saved us hours of waiting. The private wine tasting in Montmartre was unforgettable.',
    },
    {
      id: 5,
      name: 'Priya & Rohan Mehta',
      location: 'Delhi, India',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      plan: 'Classic Plan',
      rating: 5,
      date: 'Nov 2025',
      quote: 'Ronak and his team designed the perfect balance of iconic sights and relaxed neighborhood walks. Best travel planning service we have ever used!',
    },
    {
      id: 6,
      name: 'Lucas & Chloe Bernard',
      location: 'Montreal, Canada',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
      plan: 'Classic Plan',
      rating: 5,
      date: 'Dec 2025',
      quote: 'From our airport transfer to our anniversary dinner at a hidden bistro near the Seine, everything was seamless. Highly recommended!',
    },
    {
      id: 7,
      name: 'Hannah Lindqvist',
      location: 'Stockholm, Sweden',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      plan: 'Discovery Plan',
      rating: 5,
      date: 'Sep 2025',
      quote: 'The 3-day Paris itinerary was beautifully structured. Not rushed, super easy to follow, and packed with insider local secrets.',
    },
    {
      id: 8,
      name: 'Marcus Vance',
      location: 'Sydney, Australia',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      plan: 'Premium Plan',
      rating: 5,
      date: 'Oct 2025',
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
      title: t('trustLocalTitle'),
      description: t('trustLocalDesc'),
    },
    {
      emoji: '🗺️',
      icon: Compass,
      title: t('trustCustomTitle'),
      description: t('trustCustomDesc'),
    },
    {
      emoji: '💬',
      icon: MessageCircleHeart,
      title: t('trustSupportTitle'),
      description: t('trustSupportDesc'),
    },
    {
      emoji: '⭐',
      icon: Globe2,
      title: t('trustGlobalTitle'),
      description: t('trustGlobalDesc'),
    },
  ];

  return (
    <section id="why-us" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90 mb-4 tracking-wide">
          {t('testimonialsBadge')}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-4">
          {t('testimonialsTitle')}
        </h2>
        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
          {t('testimonialsSub')}
        </p>
      </div>

      {/* Trust Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
        {trustPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col justify-between glass-card-hover group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl">{point.emoji}</span>
                </div>
                <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-2">
                  {point.title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  {point.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center space-x-1.5 text-[11px] text-amber-300 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Guarantee</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Testimonial Carousel Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden glass-card-hover"
      >
        <MessageSquareQuote className="absolute top-6 right-6 w-20 h-20 text-white/5 pointer-events-none" />

        <div className={`transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {/* Rating & Badge Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center space-x-1 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full text-amber-300 text-xs font-semibold">
              <div className="flex items-center space-x-0.5">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <span className="ml-1 font-bold">5.0</span>
            </div>

            <div className="flex items-center space-x-2 text-xs text-white/70">
              <span className="bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                {activeReview.plan}
              </span>
              <span>•</span>
              <span className="font-mono text-[11px]">{activeReview.date}</span>
            </div>
          </div>

          {/* Quote Content */}
          <p className="text-sm sm:text-base md:text-lg text-white font-normal leading-relaxed italic mb-8 max-w-3xl">
            "{activeReview.quote}"
          </p>

          {/* User Profile Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center space-x-3.5">
              <img
                src={activeReview.avatar}
                alt={activeReview.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-white/30 shadow-md"
              />
              <div>
                <h4 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  {activeReview.name}
                </h4>
                <p className="text-xs text-white/70">{activeReview.location}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center space-x-1.5 mt-6">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-amber-300' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
