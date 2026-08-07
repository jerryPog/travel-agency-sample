import { useState } from 'react';
import { Landmark, Sparkles, Sliders, Sun, Users2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const services = [
    {
      id: 'classic',
      title: 'Classic Paris Tours',
      description: 'Eiffel Tower, Louvre, Notre-Dame, and the essentials, done right with skip-the-line access and expert art historians.',
      tag: 'Most Popular',
      icon: Landmark,
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
      highlights: ['Eiffel Tower Summit', 'Louvre Masterpieces', 'Notre-Dame Walk'],
    },
    {
      id: 'hidden',
      title: 'Hidden Paris Experiences',
      description: 'Local markets, secret rooftop gardens, underground speakeasies, and off-the-map neighborhoods in Belleville & Le Marais.',
      tag: 'Insider Favorite',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      highlights: ['Artisan Bakery Walk', 'Secret Courtyards', 'Local Wine Tasting'],
    },
    {
      id: 'custom',
      title: 'Custom Itineraries',
      description: 'Fully personalized trips designed around your rhythm, interests, food preferences, and pace — 100% tailor-made.',
      tag: 'Bespoke',
      icon: Sliders,
      image: 'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80',
      highlights: ['Personal Travel Concierge', 'Flexible Schedule', 'Curated Map App'],
    },
    {
      id: 'daytrips',
      title: 'Day Trips & Countryside',
      description: 'Château de Versailles, Monet’s Gardens in Giverny, Champagne vineyards, and Normandy coast with private transfers.',
      tag: 'Day Excursion',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80',
      highlights: ['Private Chauffeur', 'Vineyard Tasting', 'Skip-The-Line Entry'],
    },
    {
      id: 'group',
      title: 'Group & Family Packages',
      description: 'Thoughtfully planned trips for families with children, milestone birthdays, corporate retreats, and couples.',
      tag: 'Family & Groups',
      icon: Users2,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      highlights: ['Kids Scavenger Hunts', 'Group Dining Reservations', 'Spacious Vehicles'],
    },
  ];

  const handleExploreClick = () => {
    const el = document.querySelector('#packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Section Header */}
      <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 mb-4 tracking-wide">
            Our Services & Packages
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-tight max-w-xl">
            What We Offer
          </h2>
        </div>
        <p className="text-white/70 text-sm max-w-md leading-relaxed font-normal">
          From iconic landmarks to secret cobblestone alleys, explore Paris with experiences built around your unique travel style.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isLarge = index === 0 || index === 2;
          const delayClass = `delay-${((index % 3) + 1) * 100}`;

          return (
            <div
              key={service.id}
              className={`reveal-on-scroll ${delayClass} group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl glass-card-hover flex flex-col justify-between ${
                isLarge ? 'lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-white text-[#0B132B] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-semibold text-white/90 bg-white/15 px-3 py-1 rounded-full border border-white/20">
                    {service.tag}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-white mb-2.5 font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-white/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Image Thumbnail & CTA */}
              <div className="pt-2">
                <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-4 border border-white/20 shadow-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <button
                  onClick={handleExploreClick}
                  className="w-full bg-white/10 hover:bg-white text-white hover:text-[#0B132B] font-semibold text-xs py-2.5 px-4 rounded-full border border-white/20 transition-all duration-300 flex items-center justify-between group-hover:shadow-lg cursor-pointer"
                >
                  <span>Explore Package</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
