import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Compass, Users, Sparkles, Calendar, DollarSign, Send, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { submitItineraryWizard } from '../services/formService';

interface ItineraryWizardModalProps {
  onClose: () => void;
}

export function ItineraryWizardModal({ onClose }: ItineraryWizardModalProps) {
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

  // Lock body scroll, focus close button, listen for Escape key
  useEffect(() => {
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
  }, [onClose]);

  const durationOptions = [
    { label: '3 Days (Weekend Break)', sub: 'Fast-paced highlights & iconic landmarks' },
    { label: '5 Days (Classic Paris)', sub: 'Ideal blend of top sights & hidden neighborhoods' },
    { label: '7+ Days (Grand Experience)', sub: 'Deep dive, Day trips to Versailles & Champagne' },
    { label: 'Custom Duration', sub: 'Flexible schedule built around your dates' },
  ];

  const travelerOptions = [
    { label: 'Solo Explorer', desc: 'Curated safe, inspiring solo routes' },
    { label: 'Couple / 2 Travelers', desc: 'Romantic dinners, sunset cruises & private guides' },
    { label: 'Family with Kids', desc: 'Kid-friendly scavenger hunts & relaxed pacing' },
    { label: 'Group of Friends', desc: 'VIP tables, wine tasting & nightlife tours' },
  ];

  const interestOptions = [
    'Art & Museums',
    'Gastronomy & Wine',
    'Hidden Passages & Cafes',
    'Fashion & Shopping',
    'Nightlife & Jazz',
    'Historical Landmarks',
  ];

  const budgetOptions = [
    '$$ (Comfort Boutique)',
    '$$$ (Boutique Luxury)',
    '$$$$ (Ultra Luxury / Private Chauffeur)',
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 font-['DM_Sans',sans-serif]">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wizard-modal-title"
        className="bg-[#081028] border border-white/20 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-white"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
              <Compass className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="wizard-modal-title" className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif]">
                {t('wizTitle')}
              </h3>
              <p className="text-xs text-white/60">{t('wizStepSub').replace('{step}', step.toString())}</p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close itinerary wizard"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-1">
          <div
            className="bg-amber-400 h-1 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif]">
                {t('wizSuccessTitle')}
              </h4>
              <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                {t('wizSuccessSub')} <span className="text-amber-300 underline">{email}</span>.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-white text-[#0B132B] font-bold text-xs hover:bg-white/90 transition-all cursor-pointer"
              >
                {t('wizBackToSite')}
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: Duration */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] flex items-center space-x-2">
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
                            ? 'bg-white text-[#0B132B] border-amber-400 font-bold shadow-lg'
                            : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                        }`}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-semibold">{opt.label}</div>
                          <div className={`text-[11px] mt-0.5 ${duration === opt.label ? 'text-[#0B132B]/70' : 'text-white/60'}`}>
                            {opt.sub}
                          </div>
                        </div>
                        {duration === opt.label && <Check className="w-4 h-4 text-[#0B132B]" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Travelers */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] flex items-center space-x-2">
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
                            ? 'bg-white text-[#0B132B] border-amber-400 font-bold shadow-lg'
                            : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                        }`}
                      >
                        <div>
                          <div className="text-xs sm:text-sm font-semibold mb-1">{opt.label}</div>
                          <div className={`text-[11px] ${travelers === opt.label ? 'text-[#0B132B]/70' : 'text-white/60'}`}>
                            {opt.desc}
                          </div>
                        </div>
                        {travelers === opt.label && <Check className="w-4 h-4 text-[#0B132B] self-end mt-2" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Interests */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] flex items-center space-x-2">
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
                          className={`p-3.5 rounded-2xl border text-xs text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-[#0B132B] border-amber-400 font-bold shadow-lg'
                              : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#0B132B]" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Budget */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif] flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-amber-300" aria-hidden="true" />
                    <span>{t('wizStep4Title')}</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {budgetOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setBudget(opt)}
                        className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          budget === opt
                            ? 'bg-white text-[#0B132B] border-amber-400 font-bold shadow-lg'
                            : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
                        }`}
                      >
                        <span>{opt}</span>
                        {budget === opt && <Check className="w-4 h-4 text-[#0B132B]" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Summary & Submit */}
              {step === 5 && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200" noValidate>
                  <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-xs space-y-2">
                    <div className="font-bold text-amber-300 uppercase tracking-wider">{t('wizStep5Summary')}</div>
                    <div className="grid grid-cols-2 gap-2 text-white/80">
                      <div><strong className="text-white">{t('wizLabelDuration')}</strong> {duration}</div>
                      <div><strong className="text-white">{t('wizLabelGroup')}</strong> {travelers}</div>
                      <div><strong className="text-white">{t('wizLabelInterests')}</strong> {interests.join(', ')}</div>
                      <div><strong className="text-white">{t('wizLabelTier')}</strong> {budget}</div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="wiz-name" className="block text-xs font-medium text-white/80 mb-1">
                      {t('yourName')} *
                    </label>
                    <input
                      id="wiz-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jean Dupont"
                      className={`w-full bg-white/10 border ${
                        errors.name ? 'border-red-400' : 'border-white/20'
                      } rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300`}
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
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. jean@example.com"
                      className={`w-full bg-white/10 border ${
                        errors.email ? 'border-red-400' : 'border-white/20'
                      } rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300`}
                    />
                    {errors.email && <p className="text-[11px] text-red-300 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="wiz-notes" className="block text-xs font-medium text-white/80 mb-1">
                      {t('tellTrip')}
                    </label>
                    <textarea
                      id="wiz-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Special anniversary dinner, hotel recommendations..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-[#0B132B] font-bold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>{t('wizBtnSubmit')}</span>
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Navigation Controls (Step 1 to 4) */}
              {!submitted && (
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                  <button
                    type="button"
                    disabled={step === 1}
                    onClick={() => setStep(step - 1)}
                    className={`flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                      step === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 text-white cursor-pointer'
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t('wizBtnBack')}</span>
                  </button>

                  {step < 5 && (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="flex items-center space-x-1.5 bg-white text-[#0B132B] hover:bg-white/90 font-bold text-xs px-5 py-2 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <span>{t('wizBtnContinue')}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
