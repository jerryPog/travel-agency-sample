import React, { useState } from 'react';
import {
  Plane,
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Search,
  Award,
  ChevronRight,
  PhoneCall,
  Globe,
  Sliders,
  Play
} from 'lucide-react';
import { JetDetails, LoaderConfig } from '../types';

interface WebsiteContentProps {
  config: LoaderConfig;
  onTriggerLoader: () => void;
  onOpenControls: () => void;
}

const FLEET_JETS: JetDetails[] = [
  {
    name: 'Bombardier Global 7500',
    range: '7,700 nm (14,260 km)',
    speed: 'Mach 0.925 (982 km/h)',
    passengers: 19,
    hourlyRate: '$16,500 / hr',
    imageSeed: 'jet1',
  },
  {
    name: 'Gulfstream G700 Ultra',
    range: '7,500 nm (13,890 km)',
    speed: 'Mach 0.925 (982 km/h)',
    passengers: 18,
    hourlyRate: '$18,000 / hr',
    imageSeed: 'jet2',
  },
  {
    name: 'Dassault Falcon 10X',
    range: '7,500 nm (13,890 km)',
    speed: 'Mach 0.925 (982 km/h)',
    passengers: 16,
    hourlyRate: '$15,800 / hr',
    imageSeed: 'jet3',
  },
  {
    name: 'Embraer Praetor 600',
    range: '4,018 nm (7,441 km)',
    speed: 'Mach 0.83 (883 km/h)',
    passengers: 12,
    hourlyRate: '$9,200 / hr',
    imageSeed: 'jet4',
  },
];

export const WebsiteContent: React.FC<WebsiteContentProps> = ({
  config,
  onTriggerLoader,
  onOpenControls,
}) => {
  const [activeTab, setActiveTab] = useState<'charter' | 'fleet' | 'calculator'>('charter');
  const [fromLocation, setFromLocation] = useState('New York (TEB)');
  const [toLocation, setToLocation] = useState('Nice / Monaco (NCE)');
  const [passengers, setPassengers] = useState(4);
  const [departureDate, setDepartureDate] = useState('2026-08-15');
  const [isBooked, setIsBooked] = useState(false);

  const brandName = config.customBrandName || 'ASTRA';
  const heroTitle = config.customHeroTitle || 'Beyond the Horizon.';
  const heroSubtitle = config.customHeroSubtitle || 'Redefining the architecture of luxury travel through bespoke aviation services and unparalleled global reach.';

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-serif antialiased selection:bg-[#c5a059] selection:text-black">
      
      {/* --- TOP FLOATING LOADER DEMO BAR --- */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#c5a059]/20 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#c5a059]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a059] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a059]"></span>
          </span>
          <span className="font-bold tracking-widest uppercase text-[11px]">2S JET UNCOVER ACTIVE</span>
          <span className="text-slate-500 font-normal hidden sm:inline text-[11px]">• Sophisticated Dark Theme</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTriggerLoader}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#c5a059] hover:bg-[#d4af37] text-slate-950 font-sans font-bold transition-all shadow-md shadow-[#c5a059]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Replay Jet Uncover</span>
          </button>

          <button
            onClick={onOpenControls}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#171717] hover:bg-[#262626] text-slate-200 border border-[#c5a059]/30 transition-all cursor-pointer text-xs font-sans"
          >
            <Sliders className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Customize Loader</span>
          </button>
        </div>
      </div>

      {/* --- WEBSITE HEADER NAVIGATION --- */}
      <header className="border-b border-[#c5a059]/20 bg-[#050505]/80 backdrop-blur-lg sticky top-[45px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#c5a059]/40 flex items-center justify-center shadow-lg shadow-[#c5a059]/10">
              <Plane className="w-5 h-5 text-[#c5a059] transform -rotate-45" />
            </div>
            <div>
              <span className="font-serif font-light text-2xl tracking-[0.2em] text-[#f5f5f5] uppercase block">
                {brandName}
              </span>
              <span className="text-[9px] text-[#c5a059] tracking-[0.3em] font-mono uppercase block -mt-1">
                BESPOKE AVIATION
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase font-sans text-slate-400">
            <button
              onClick={() => setActiveTab('charter')}
              className={`hover:text-[#c5a059] transition-colors ${activeTab === 'charter' ? 'text-[#c5a059] font-bold' : ''}`}
            >
              Charter
            </button>
            <button
              onClick={() => setActiveTab('fleet')}
              className={`hover:text-[#c5a059] transition-colors ${activeTab === 'fleet' ? 'text-[#c5a059] font-bold' : ''}`}
            >
              Fleet
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`hover:text-[#c5a059] transition-colors ${activeTab === 'calculator' ? 'text-[#c5a059] font-bold' : ''}`}
            >
              Experience
            </button>
            <a href="#membership" className="hover:text-[#c5a059] transition-colors">
              Concierge
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+18005550199"
              className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#c5a059] transition-colors tracking-widest"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>+1 (800) ASTRA-JET</span>
            </a>

            <button
              onClick={onTriggerLoader}
              className="px-5 py-2.5 rounded-md bg-[#c5a059] hover:bg-[#d4af37] text-slate-950 font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#c5a059]/20"
            >
              Book Flight
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Sky / Ambient Background Effect */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c5a059]/30 via-[#0a0a0a] to-[#050505]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] text-[10px] font-mono tracking-[0.3em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              UNCOVERED VIA 2-SECOND PRIVATE JET TRANSITION
            </div>

            <h1 className="text-5xl sm:text-7xl font-serif font-light text-white tracking-tight leading-[1.05] mb-6 italic">
              {heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-400 font-sans font-light leading-relaxed mb-8 max-w-2xl tracking-wide uppercase">
              {heroSubtitle}
            </p>
          </div>

          {/* --- INSTANT CHARTER SEARCH BOX --- */}
          <div className="bg-[#0a0a0a] border border-[#c5a059]/30 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-8 pb-6 mb-6 border-b border-[#c5a059]/20 text-xs font-sans tracking-widest uppercase">
              <button className="text-[#c5a059] font-bold border-b-2 border-[#c5a059] pb-2 flex items-center gap-2">
                <Plane className="w-4 h-4" /> One Way / Round Trip
              </button>
              <button className="text-slate-400 hover:text-slate-200 pb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Global Itinerary
              </button>
              <button className="text-slate-400 hover:text-slate-200 pb-2 flex items-center gap-2">
                <Award className="w-4 h-4" /> Empty Legs
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Origin */}
              <div className="bg-[#050505] border border-[#c5a059]/20 rounded-xl p-4 flex flex-col justify-between">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  Departure Airport
                </label>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="bg-transparent font-sans font-medium text-white focus:outline-none text-sm"
                  placeholder="City or Airport code"
                />
              </div>

              {/* Destination */}
              <div className="bg-[#050505] border border-[#c5a059]/20 rounded-xl p-4 flex flex-col justify-between">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  Arrival Airport
                </label>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="bg-transparent font-sans font-medium text-white focus:outline-none text-sm"
                  placeholder="City or Airport code"
                />
              </div>

              {/* Date */}
              <div className="bg-[#050505] border border-[#c5a059]/20 rounded-xl p-4 flex flex-col justify-between">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] flex items-center gap-1.5 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                  Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="bg-transparent font-sans font-medium text-white focus:outline-none text-sm"
                />
              </div>

              {/* Passengers */}
              <div className="bg-[#050505] border border-[#c5a059]/20 rounded-xl p-4 flex flex-col justify-between">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] flex items-center gap-1.5 mb-1.5">
                  <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                  Guests
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="bg-[#050505] font-sans font-medium text-white focus:outline-none text-sm cursor-pointer"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={8}>8 Guests</option>
                  <option value={14}>14 Guests</option>
                  <option value={19}>19 Guests (Full Suite)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono tracking-wider">
                <Shield className="w-4 h-4 text-[#c5a059]" />
                <span>ARGUS Platinum & Wyvern Wingman Certified</span>
              </div>

              <button
                onClick={() => setIsBooked(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-[#c5a059] hover:bg-[#d4af37] text-slate-950 font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-xl shadow-[#c5a059]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Request Itinerary</span>
              </button>
            </div>

            {/* Booking Confirmation Toast */}
            {isBooked && (
              <div className="mt-4 p-4 rounded-xl bg-[#c5a059]/10 border border-[#c5a059]/40 text-[#f5f5f5] text-sm flex items-center justify-between font-sans">
                <span>
                  ✓ Itinerary prepared for <strong>{passengers} guests</strong> from <strong>{fromLocation}</strong> to <strong>{toLocation}</strong>! Our concierge is standing by.
                </span>
                <button
                  onClick={() => setIsBooked(false)}
                  className="text-xs text-[#c5a059] hover:underline ml-4 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- FLEET SHOWCASE SECTION --- */}
      <section className="py-20 bg-[#0a0a0a] border-t border-[#c5a059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-mono text-[#c5a059] tracking-[0.3em] uppercase block mb-2">
                FLEET ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-white italic">
                Ultra-Long-Range Flagship Fleet
              </h2>
            </div>
            <p className="text-slate-400 text-xs font-sans tracking-wide uppercase max-w-md mt-4 md:mt-0">
              Hand-picked ultra luxury jets featuring high-speed Starlink WiFi, private master suites, and whisper-quiet cabins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET_JETS.map((jet, idx) => (
              <div
                key={idx}
                className="group bg-[#050505] border border-[#c5a059]/20 hover:border-[#c5a059]/60 rounded-xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5a059]/10 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video rounded-lg bg-[#0a0a0a] mb-4 overflow-hidden relative border border-[#c5a059]/20">
                    <img
                      src={`https://picsum.photos/seed/${jet.imageSeed}/800/600`}
                      alt={jet.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#050505]/90 border border-[#c5a059]/40 text-[10px] font-mono text-[#c5a059]">
                      {jet.hourlyRate}
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-light text-white mb-3 group-hover:text-[#c5a059] transition-colors">
                    {jet.name}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-400 font-mono mb-6">
                    <div className="flex justify-between border-b border-[#c5a059]/10 pb-1.5">
                      <span className="text-slate-500">Max Range:</span>
                      <span className="text-slate-200 font-medium">{jet.range}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#c5a059]/10 pb-1.5">
                      <span className="text-slate-500">Cruise Speed:</span>
                      <span className="text-slate-200 font-medium">{jet.speed}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#c5a059]/10 pb-1.5">
                      <span className="text-slate-500">Cabin Suite:</span>
                      <span className="text-slate-200 font-medium">{jet.passengers} Guests</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onTriggerLoader}
                  className="w-full py-2.5 rounded-md bg-[#171717] hover:bg-[#c5a059] text-slate-300 hover:text-slate-950 font-sans font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Select Aircraft</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE ASTRA SECTION --- */}
      <section className="py-20 border-t border-[#c5a059]/20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-[#0a0a0a] border border-[#c5a059]/20 rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-light text-white mb-2">15-Minute Guaranteed Boarding</h3>
              <p className="text-slate-400 text-xs font-sans leading-relaxed uppercase tracking-wider">
                Skip commercial terminal delays. Drive directly onto the tarmac and board your private jet in under 15 minutes.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#c5a059]/20 rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-light text-white mb-2">Dual-Captain Flight Protocol</h3>
              <p className="text-slate-400 text-xs font-sans leading-relaxed uppercase tracking-wider">
                Every flight is commanded by two veteran captains with over 10,000 flight hours and rigorous simulator drills.
              </p>
            </div>

            <div className="bg-[#0a0a0a] border border-[#c5a059]/20 rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-light text-white mb-2">Bespoke In-Flight Concierge</h3>
              <p className="text-slate-400 text-xs font-sans leading-relaxed uppercase tracking-wider">
                Michelin-starred catering, rare vintage wines, pet accommodations, and private cabin bedroom configurations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-[#c5a059]/20 bg-[#050505] py-12 text-slate-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="tracking-widest uppercase text-[10px]">
            © 2026 {brandName} Aviation. All rights reserved. Sophisticated Dark Theme.
          </div>
          <div className="flex items-center gap-6 text-[#c5a059] text-[10px] uppercase tracking-widest">
            <button onClick={onTriggerLoader} className="hover:underline cursor-pointer">
              Replay 2s Jet Uncover
            </button>
            <button onClick={onOpenControls} className="hover:underline cursor-pointer">
              Customize Jet Loader
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
