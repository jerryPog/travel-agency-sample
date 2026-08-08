import { useState, FormEvent } from 'react';
import { Mail, Clock, Send, CheckCircle, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';
import { submitContactForm } from '../services/formService';

export function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [travelDates, setTravelDates] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    const res = await submitContactForm({ name, email, travelDates, message });

    setIsSubmitting(false);
    if (res.success) {
      setSubmitted(true);
    } else if (res.errors) {
      setErrors(res.errors);
    }
  };

  const scrollToPackages = () => {
    const el = document.querySelector('#packages');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 pt-12 sm:pt-16 pb-20 text-white font-['DM_Sans',sans-serif] relative"
    >
      {/* Subtle Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-semibold text-white mb-3 tracking-wide">
          {t('contact')}
        </span>
        <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-[1.15]">
          {t('contactTitle')}
        </h2>
        <p className="text-white/80 text-xs sm:text-sm mt-3">
          {t('contactSub')}
        </p>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Founder & Info Card */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between glass-card-hover">
          <div>
            <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-4">
              {t('contactUs')}
            </h3>

            {/* Founder Details */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 mb-6 shadow-lg hover:bg-white/15 transition-all">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-11 h-11 rounded-full bg-white text-[#0B132B] flex items-center justify-center font-bold text-base shadow-md shrink-0">
                  {siteConfig.founder.initials}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                    {siteConfig.founder.name}
                  </h4>
                  <p className="text-xs text-white/70 font-medium">
                    {t('founderRole')}
                  </p>
                </div>
              </div>

              <p className="text-xs text-white/80 leading-relaxed font-normal">
                {t('founderQuote')}
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 text-xs sm:text-sm">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#0B132B] transition-colors">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <span className="font-medium underline underline-offset-4">{siteConfig.contact.email}</span>
              </a>

              <div className="flex items-center space-x-3 text-white/80">
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <span className="text-xs">{t('responseTime')}</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-medium self-start mt-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>{t('accepting2026')}</span>
          </div>
        </div>

        {/* Center: Eiffel Tower Night Showcase Card */}
        <div className="lg:col-span-4 relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] shadow-2xl border border-white/20 group flex flex-col justify-between p-6 sm:p-8">
          <img
            src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1000&q=80"
            alt="Eiffel Tower Night Sunset illuminated over the Seine"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050C1E] via-[#050C1E]/50 to-black/30" />

          {/* Top Glass Badge */}
          <div className="relative z-10 self-start">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-amber-300/40 backdrop-blur-md text-xs font-semibold text-amber-300 shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" aria-hidden="true" />
              <span>{t('eiffelBadge')}</span>
            </div>
          </div>

          {/* Bottom Overlay Content */}
          <div className="relative z-10 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-white leading-tight">
              {t('eiffelTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {t('eiffelDesc')}
            </p>
            <button
              onClick={scrollToPackages}
              className="w-full py-2.5 px-4 bg-white/10 hover:bg-white text-white hover:text-[#0B132B] border border-white/30 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg"
            >
              <span>{t('exploreEiffelTours')}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between glass-card-hover">
          {submitted ? (
            <div className="text-center py-12 px-4 space-y-4 my-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                {t('messageSentTitle')}
              </h3>
              <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
                Merci, <strong className="text-white">{name}</strong>. {siteConfig.founder.name} & team will contact you at <span className="underline">{email}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-white text-[#0B132B] font-semibold text-xs hover:bg-white/90 transition-all cursor-pointer"
              >
                {t('sendAnotherMsg')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 my-auto" noValidate>
              <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] mb-1 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>{t('startConsultation')}</span>
              </h3>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-white/80 mb-1">
                  {t('yourName')} *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full bg-white/10 border ${
                    errors.name ? 'border-red-400' : 'border-white/20'
                  } rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300/60 transition-all`}
                />
                {errors.name && <p className="text-[11px] text-red-300 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-white/80 mb-1">
                  {t('emailAddr')} *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@example.com"
                  className={`w-full bg-white/10 border ${
                    errors.email ? 'border-red-400' : 'border-white/20'
                  } rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300/60 transition-all`}
                />
                {errors.email && <p className="text-[11px] text-red-300 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-dates" className="block text-xs font-medium text-white/80 mb-1">
                  {t('travelDates')}
                </label>
                <input
                  id="contact-dates"
                  type="text"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  placeholder="e.g. Autumn 2026 / Oct 12-20"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300/60 transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-white/80 mb-1">
                  {t('tellTrip')}
                </label>
                <textarea
                  id="contact-message"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Traveling as a couple for 5 days..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300/60 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-white/95 disabled:opacity-50 text-[#0B132B] font-bold text-xs py-2.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 group cursor-pointer hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-[#0B132B] animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>{t('sendInquiry')}</span>
                    <Send className="w-3.5 h-3.5 text-[#0B132B] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
