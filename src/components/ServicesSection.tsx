import { useState } from 'react';
import { Landmark, Sparkles, Sliders, Sun, Users2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function ServicesSection() {
  const { t } = useLanguage();
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
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-amber-300 mb-3">
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
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
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
                  <span>Learn More</span>
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
