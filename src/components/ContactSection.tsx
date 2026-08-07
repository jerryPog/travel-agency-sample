import { useState, FormEvent } from 'react';
import { Mail, Clock, Send, CheckCircle, Sparkles, MapPin } from 'lucide-react';

export function ContactSection() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [travelDates, setTravelDates] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 pt-16 pb-24 text-white font-['DM_Sans',sans-serif] relative">
      {/* Subtle Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Heading */}
      <div className="reveal-on-scroll text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-semibold text-white mb-3 tracking-wide">
          Contact Us
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15]">
          Let's Plan Your Paris Trip
        </h2>
        <p className="text-white/80 text-sm sm:text-base mt-3">
          Have questions or ready to start planning? Reach out — we'd love to help design your journey.
        </p>
      </div>

      {/* 3-Column Layout: Left Card (4 cols) | Center Eiffel Tower Window (4 cols) | Right Form Card (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Founder & Info Card */}
        <div className="reveal-fade-left delay-100 lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between glass-card-hover">
          <div>
            <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-4">
              Get in Touch
            </h3>

            {/* Founder Details */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 mb-6 shadow-lg hover:bg-white/15 transition-all">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-11 h-11 rounded-full bg-white text-[#0B132B] flex items-center justify-center font-bold text-base shadow-md shrink-0">
                  RJ
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                    Ronak Jain R
                  </h4>
                  <p className="text-xs text-white/70 font-medium">
                    Founder & Travel Consultant
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 border-t border-white/10 pt-3 text-xs sm:text-sm">
                <a
                  href="mailto:ronakj303@gmail.com"
                  className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium underline underline-offset-4">ronakj303@gmail.com</span>
                </a>

                <div className="flex items-center space-x-3 text-white/80">
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs">We typically respond within 24 hours.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-medium self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Accepting new itineraries for 2026/2027</span>
          </div>
        </div>

        {/* CENTER COLUMN: Completely Transparent Window View for Eiffel Tower */}
        <div className="reveal-scale delay-200 lg:col-span-4 min-h-[360px] sm:min-h-[460px] flex flex-col items-center justify-between p-6 rounded-3xl border-2 border-dashed border-amber-300/40 bg-transparent pointer-events-none relative shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]">
          {/* Glass Corner Brackets */}
          <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-amber-300 rounded-tl" />
          <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-amber-300 rounded-tr" />
          <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-amber-300 rounded-bl" />
          <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-amber-300 rounded-br" />

          {/* Top Label */}
          <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-300/50 backdrop-blur-md text-xs font-semibold text-amber-300 tracking-wider uppercase font-mono shadow-xl animate-float">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Eiffel Tower View</span>
          </div>

          {/* Center Hint */}
          <div className="my-auto text-center px-4">
            <MapPin className="w-8 h-8 text-amber-300 mx-auto mb-2 animate-bounce" />
            <p className="text-xs font-extrabold uppercase tracking-widest text-white/90 font-mono">
              Unobstructed Viewport
            </p>
            <p className="text-[11px] text-white/70 mt-1">
              Watch the Eiffel Tower light ray shine through as you scroll
            </p>
          </div>

          {/* Bottom Pill */}
          <div className="px-4 py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[10px] text-white/80 text-center font-mono tracking-wide">
            ✦ Scroll further for full panorama ✦
          </div>
        </div>

        {/* Right Side: Interactive Booking Form */}
        <div className="reveal-fade-right delay-300 lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between glass-card-hover">
          {submitted ? (
            <div className="text-center py-12 px-4 space-y-4 my-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Message Sent!
              </h3>
              <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>. Ronak & team will contact you at <span className="underline">{email}</span> within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-white text-[#0B132B] font-semibold text-xs hover:bg-white/90 transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 my-auto">
              <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-1 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Start Consultation</span>
              </h3>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300/60 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300/60 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Travel Dates (Optional)
                </label>
                <input
                  type="text"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  placeholder="e.g. Autumn 2026 / Oct 12–20"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300/60 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/80 mb-1">
                  Tell us about your trip
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Traveling as a couple for 5 days..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300/60 focus:bg-white/15 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-white/95 text-[#0B132B] font-bold text-xs py-2.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 group cursor-pointer hover:scale-[1.02]"
              >
                <span>Send Inquiry</span>
                <Send className="w-3.5 h-3.5 text-[#0B132B] group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Full Width Bottom Landing Reveal Zone: Completely Open Window to Eiffel Tower */}
      <div className="reveal-on-scroll delay-200 w-full min-h-[450px] md:min-h-[550px] flex flex-col items-center justify-end pb-12 mt-12 relative border-2 border-dashed border-white/25 rounded-3xl bg-transparent shadow-[inset_0_0_60px_rgba(0,0,0,0.7)] pointer-events-none">
        {/* Window Accents */}
        <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-amber-300 rounded-tl" />
        <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-amber-300 rounded-tr" />
        <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-amber-300 rounded-bl" />
        <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-amber-300 rounded-br" />

        <div className="flex flex-col items-center space-y-2 text-center px-6 py-4 rounded-2xl bg-black/70 border border-amber-300/40 backdrop-blur-md shadow-2xl animate-float">
          <span className="text-xs md:text-sm font-bold text-amber-300 tracking-widest uppercase font-mono">
            Paris Night Arrival • Complete
          </span>
          <span className="text-white/90 text-xs md:text-sm font-medium">
            The Eiffel Tower Beacon shines across Paris.
          </span>
        </div>
      </div>
    </section>
  );
}
