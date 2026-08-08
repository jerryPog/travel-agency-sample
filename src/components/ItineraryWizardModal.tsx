import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Compass, Users, Sparkles, Calendar, DollarSign, Send, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { submitItineraryWizard } from '../services/formService';

interface ItineraryWizardModalProps {
  onClose: () => void;
  isModal?: boolean;
}

export function ItineraryWizardModal({ onClose, isModal = true }: ItineraryWizardModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [duration, setDuration] = useState('5 Days (Classic Paris)');
  const [travelers, setTravelers] = useState('Couple / 2 Travelers');
  const [interests, setInterests] = useState<string[]>(['Art & Museums', 'Gastronomy & Wine']);
  const [budget, setBudget] = useState('$$$ (Boutique Luxury)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll only when triggered as a modal overlay
  useEffect(() => {
    if (!isModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, isModal]);

  const durationOptions = [
    { label: '3 Days (Highlights Express)', sub: 'Eiffel Tower, Louvre, Seine Cruise & Marais' },
    { label: '5 Days (Classic Paris)', sub: 'Full city immersion + Versailles Day Trip' },
    { label: '7 Days (Grand Luxury)', sub: 'Champagne region, Private Museums & VIP Access' },
    { label: '10+ Days (France Uncovered)', sub: 'Paris + French Riviera / Loire Valley Castles' },
  ];

  const travelerOptions = [
    { label: 'Solo Traveler', desc: 'Curated private guide & boutique hotel experience' },
    { label: 'Couple / 2 Travelers', desc: 'Romantic dining, private photography & luxury suites' },
    { label: 'Family Trip', desc: 'Kid-friendly scavenger hunts, spacious vans & skip-the-line' },
    { label: 'VIP Group (4+)', desc: 'Dedicated private concierge, Mercedes V-Class & châteaux' },
  ];

  const interestOptions = [
    'Art & Museums',
    'Gastronomy & Wine',
    'Fashion & Shopping',
    'History & Castles',
    'Hidden Gems & Alleyways',
    'Nightlife & Cabaret',
    'Photography & Views',
    'Private Jet & Yacht',
  ];

  const budgetOptions = [
    { label: '$$ (Comfort Deluxe)', sub: '4★ Boutique Hotels + Small Group Tours' },
    { label: '$$$ (Boutique Luxury)', sub: '5★ Luxury Hotels + Private Guides' },
    { label: '$$$$ (Ultra Luxury / VIP)', sub: 'Palace Hotels + Helicopter/Jet + Dedicated Butler' },
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    const res = await submitItineraryWizard({
      duration,
      travelers,
      interests,
      budget,
      name,
      email,
      notes,
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else if (res.errors) {
      setErrors(res.errors);
    }
  };

  const content = (
    <div
      ref={modalRef}
      role={isModal ? 'dialog' : undefined}
      aria-modal={isModal ? 'true' : undefined}
      aria-labelledby="wizard-modal-title"
      className="bg-[#070B14]/95 border-gradient-gold rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-white font-['DM_Sans',sans-serif]"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-[#070B14] flex items-center justify-center shadow-md font-bold">
            <Compass className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h3 id="wizard-modal-title" className="text-lg font-bold font-serif-editorial text-gold-gradient">
              {t('wizTitle')}
            </h3>
            <p className="text-xs text-white/60">{t('wizStepSub').replace('{step}', step.toString())}</p>
          </div>
        </div>

        {isModal && (
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close itinerary wizard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/10 h-1">
        <div
          className="bg-amber-400 h-1 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      {/* Body Content */}
      <div className="p-6 max-h-[75vh] overflow-y-auto scroll-contain">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold font-serif-editorial text-white">
              {t('wizSuccessTitle')}
            </h4>
            <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
              {t('wizSuccessSub')} <span className="text-amber-300 underline">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-amber-400 text-[#070B14] font-bold text-xs hover:bg-amber-300 transition-all cursor-pointer shadow-lg"
            >
              {t('wizBackToSite')}
            </button>
          </div>
        ) : (
          <>
            {/* STEP 1: Duration */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-serif-editorial text-white flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>{t('wizStep1Title')}</span>
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {durationOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDuration(opt.label)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        duration === opt.label
                          ? 'bg-amber-400 text-[#070B14] border-amber-300 font-bold shadow-lg'
                          : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-semibold">{opt.label}</div>
                        <div className={`text-[11px] mt-0.5 ${duration === opt.label ? 'text-[#070B14]/80 font-medium' : 'text-white/60'}`}>
                          {opt.sub}
                        </div>
                      </div>
                      {duration === opt.label && <Check className="w-4 h-4 text-[#070B14]" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Travelers */}
            {step === 2 && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-serif-editorial text-white flex items-center space-x-2">
                  <Users className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>{t('wizStep2Title')}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {travelerOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTravelers(opt.label)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        travelers === opt.label
                          ? 'bg-amber-400 text-[#070B14] border-amber-300 font-bold shadow-lg'
                          : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-semibold mb-1">{opt.label}</div>
                        <div className={`text-[11px] ${travelers === opt.label ? 'text-[#070B14]/80 font-medium' : 'text-white/60'}`}>
                          {opt.desc}
                        </div>
                      </div>
                      {travelers === opt.label && <Check className="w-4 h-4 text-[#070B14] self-end mt-2" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Interests */}
            {step === 3 && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-serif-editorial text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>{t('wizStep3Title')}</span>
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map((opt, i) => {
                    const isSelected = interests.includes(opt);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 text-[#070B14] border-amber-300 font-bold shadow-lg'
                            : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#070B14] shrink-0" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Budget */}
            {step === 4 && (
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-serif-editorial text-white flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>{t('wizStep4Title')}</span>
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {budgetOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setBudget(opt.label)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        budget === opt.label
                          ? 'bg-amber-400 text-[#070B14] border-amber-300 font-bold shadow-lg'
                          : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-semibold">{opt.label}</div>
                        <div className={`text-[11px] mt-0.5 ${budget === opt.label ? 'text-[#070B14]/80 font-medium' : 'text-white/60'}`}>
                          {opt.sub}
                        </div>
                      </div>
                      {budget === opt.label && <Check className="w-4 h-4 text-[#070B14]" aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Final Contact & Notes */}
            {step === 5 && (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h4 className="text-lg font-bold font-serif-editorial text-white flex items-center space-x-2">
                  <Send className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>{t('wizStep5Summary')}</span>
                </h4>

                {/* Summary Box */}
                <div className="bg-white/10 border border-white/15 rounded-2xl p-4 text-xs space-y-1">
                  <div className="font-bold text-amber-300 uppercase tracking-wider mb-2">Trip Summary</div>
                  <div><strong>Duration:</strong> {duration}</div>
                  <div><strong>Travelers:</strong> {travelers}</div>
                  <div><strong>Interests:</strong> {interests.join(', ')}</div>
                  <div><strong>Budget:</strong> {budget}</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="wiz-name" className="block text-xs font-medium text-white/80 mb-1">
                      {t('yourName')} *
                    </label>
                    <input
                      id="wiz-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ronak Jain"
                      className={`w-full bg-white/10 border ${
                        errors.name ? 'border-red-400' : 'border-white/20'
                      } rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-300 transition-all`}
                    />
                    {errors.name && <p className="text-[11px] text-red-300 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="wiz-email" className="block text-xs font-medium text-white/80 mb-1">
                      {t('emailAddr')} *
                    </label>
                    <input
                      id="wiz-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ronak@example.com"
                      className={`w-full bg-white/10 border ${
                        errors.email ? 'border-red-400' : 'border-white/20'
                      } rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-300 transition-all`}
                    />
                    {errors.email && <p className="text-[11px] text-red-300 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="wiz-notes" className="block text-xs font-medium text-white/80 mb-1">
                      Notes / Special Requests
                    </label>
                    <textarea
                      id="wiz-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special requests, dietary preferences, favorite hotel styles..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-300 transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-[#070B14] font-bold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#070B14]" />
                      <span>Generating Itinerary...</span>
                    </>
                  ) : (
                    <>
                      <span>{t('wizBtnSubmit')}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        )}
      </div>

      {/* Footer Nav Controls */}
      {!submitted && (
        <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center space-x-1.5 text-xs font-semibold text-white/70 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('wizBtnBack')}</span>
          </button>

          {step < 5 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center space-x-1.5 bg-amber-400 text-[#070B14] hover:bg-amber-300 font-bold text-xs px-5 py-2 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>{t('wizBtnContinue')}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  );

  if (!isModal) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl font-['DM_Sans',sans-serif]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl flex items-center justify-center"
      >
        {content}
      </motion.div>
    </motion.div>
  );
}
