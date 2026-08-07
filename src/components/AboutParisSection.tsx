import { ArrowUpRight, Car, Clock, Sun, MapPin, Award, Users, Star } from 'lucide-react';

export function AboutParisSection() {
  const stats = [
    { value: '5+', label: 'years of experience' },
    { value: '1,200+', label: 'happy travelers' },
    { value: '40+', label: 'scenic routes' },
    { value: '4.9', label: 'average rating' },
  ];

  const brandLogos = [
    { name: 'AIR FRANCE', badge: 'Official Partner' },
    { name: 'MICHELIN GUIDE', badge: 'Featured' },
    { name: 'CONDÉ NAST', badge: 'Traveler Top Pick' },
    { name: 'NATIONAL GEOGRAPHIC', badge: 'Excellence Award' },
    { name: 'FORBES TRAVEL', badge: '5-Star Rated' },
    { name: 'UNESCO', badge: 'Heritage Partner' },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 text-white font-['DM_Sans',sans-serif]">
      {/* Top Header Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
        <div className="lg:col-span-3 reveal-fade-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 tracking-wide">
            About Paris Travel Co.
          </span>
        </div>
        <div className="lg:col-span-9 reveal-fade-right delay-100">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[1.2] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Since 2019, our team has guided hundreds of travelers through Paris’s unique landscapes, from sunrise hikes to stargazing nights.
          </h2>
        </div>
      </div>

      {/* Bento Grid Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Card 1: Experience Overview */}
        <div className="reveal-fade-left delay-100 md:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl min-h-[300px] glass-card-hover group">
          <div>
            <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center mb-4 text-white group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
              <MapPin className="w-4.5 h-4.5" />
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              Explore Paris’s landscapes with routes designed for all experience levels. Each trip includes local guides, and scenic stops for photos and rest.
            </p>
            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2.5 text-[11px] text-white/80 mb-6">
              <span className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                <Car className="w-3.5 h-3.5" />
                <span>Pickup Included</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                <Clock className="w-3.5 h-3.5" />
                <span>2–3 Hour Trips</span>
              </span>
              <span className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                <Sun className="w-3.5 h-3.5" />
                <span>Sunset Views</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="bg-white text-[#0B132B] font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-white/90 transition-all flex items-center space-x-2 cursor-pointer shadow-md group-hover:scale-105">
              <span>Contact Us</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 2: Featured Paris Image */}
        <div className="reveal-scale delay-200 md:col-span-5 relative rounded-3xl overflow-hidden min-h-[300px] group shadow-2xl border border-white/20">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80"
            alt="Paris Explore"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-6 left-6 text-xl font-bold text-white tracking-wide font-['Plus_Jakarta_Sans',sans-serif]">
            Paris Explore
          </div>
        </div>

        {/* Card 3: Travelers Moments Stack */}
        <div className="reveal-fade-right delay-300 md:col-span-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl min-h-[300px] glass-card-hover">
          {/* Card Overlapping Gallery Stack */}
          <div className="relative h-32 w-full flex items-center justify-center mb-4">
            <img
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=80"
              alt="Moment 1"
              className="absolute w-24 h-28 object-cover rounded-xl shadow-lg border border-white/30 -rotate-12 -translate-x-12 translate-y-1 hover:z-10 hover:rotate-0 transition-transform"
            />
            <img
              src="https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=300&q=80"
              alt="Moment 2"
              className="absolute w-24 h-28 object-cover rounded-xl shadow-lg border border-white/30 z-1 hover:z-10 hover:scale-105 transition-transform"
            />
            <img
              src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=300&q=80"
              alt="Moment 3"
              className="absolute w-24 h-28 object-cover rounded-xl shadow-lg border border-white/30 rotate-12 translate-x-12 translate-y-1 hover:z-10 hover:rotate-0 transition-transform"
            />
          </div>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
            Stories and moments from travelers who explored Paris’s beauty with us.
          </p>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center py-8 border-y border-white/10 mb-16">
        {stats.map((stat, idx) => (
          <div key={idx} className={`reveal-on-scroll delay-${(idx + 1) * 100} flex flex-col items-center group`}>
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 font-['Plus_Jakarta_Sans',sans-serif] group-hover:scale-110 group-hover:text-amber-300 transition-all duration-300">
              {stat.value}
            </span>
            <span className="text-white/70 text-xs sm:text-sm font-medium uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* "Why Choose Us" Header */}
      <div className="mb-10 reveal-on-scroll">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/90 mb-4">
          Why Choose Us
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight max-w-xl leading-tight">
            Why travelers choose Paris Travel Co.
          </h2>
          <p className="text-white/70 text-xs sm:text-sm max-w-xs leading-relaxed">
            Every journey we organize is built on trust, safety, and unforgettable views.
          </p>
        </div>
      </div>

      {/* "Why Choose Us" Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
        {/* Card A: Local Expertise */}
        <div className="reveal-fade-left delay-100 md:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl min-h-[320px] relative overflow-hidden glass-card-hover group">
          <div className="opacity-15 absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-6 text-white group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
              Local Expertise
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Guided by people who grew up in Paris and know its hidden paths, stories, and traditions.
            </p>
          </div>
        </div>

        {/* Card B: Guides & Community Stack */}
        <div className="reveal-on-scroll delay-200 md:col-span-4 flex flex-col gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex-1 flex flex-col justify-center shadow-2xl glass-card-hover">
            <h3 className="text-base font-bold text-white mb-1.5 font-['Plus_Jakarta_Sans',sans-serif]">
              Certified Paris Guides
            </h3>
            <p className="text-white/75 text-xs leading-relaxed">
              Certified by local and international travel associations for safety and historical navigation.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex-1 flex flex-col justify-between shadow-2xl glass-card-hover">
            <div>
              <h3 className="text-base font-bold text-white mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                Community & Partnerships
              </h3>
              {/* Avatar Stack */}
              <div className="flex -space-x-2 mb-3">
                <img
                  className="w-7 h-7 rounded-full border-2 border-[#0B132B] object-cover hover:scale-125 hover:z-10 transition-transform"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Guide 1"
                />
                <img
                  className="w-7 h-7 rounded-full border-2 border-[#0B132B] object-cover hover:scale-125 hover:z-10 transition-transform"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Guide 2"
                />
                <img
                  className="w-7 h-7 rounded-full border-2 border-[#0B132B] object-cover hover:scale-125 hover:z-10 transition-transform"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Guide 3"
                />
                <div className="w-7 h-7 rounded-full border-2 border-[#0B132B] bg-white/20 flex items-center justify-center text-[10px] font-bold text-white">
                  +12
                </div>
              </div>
            </div>
            <p className="text-white/75 text-xs leading-relaxed">
              Working hand in hand with Paris's local community to preserve culture and share stories.
            </p>
          </div>
        </div>

        {/* Card C: Visual Moment Card */}
        <div className="reveal-fade-right delay-300 md:col-span-4 relative rounded-3xl overflow-hidden min-h-[320px] shadow-2xl border border-white/20 group">
          <img
            src="https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=800&q=80"
            alt="Trip moment"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <span className="text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
              See real moments from our trips.
            </span>
            <div className="w-9 h-9 rounded-full bg-white text-[#0B132B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-4.5 h-4.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Brand & Partner Logos Row */}
      <div className="pt-8 border-t border-white/10 reveal-scale delay-200">
        <p className="text-center text-xs text-white/50 font-semibold tracking-widest uppercase mb-8">
          Trusted by Leading Global Travel & Media Partners
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity">
          {brandLogos.map((brand, i) => (
            <div
              key={i}
              className="bg-white/5 hover:bg-white/15 border border-white/15 px-4 py-3 rounded-2xl w-full flex flex-col items-center justify-center text-center transition-all group cursor-default hover:scale-105 shadow-md"
            >
              <span className="text-sm font-extrabold tracking-wider text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {brand.name}
              </span>
              <span className="text-[10px] text-white/50 mt-0.5 font-medium">
                {brand.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
