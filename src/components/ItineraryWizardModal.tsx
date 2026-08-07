import React, { useState } from 'react';
import { X, Check, Compass, Users, Sparkles, Calendar, DollarSign, Send, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ItineraryWizardModalProps {
  onClose: () => void;
}

export function ItineraryWizardModal({ onClose }: ItineraryWizardModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [duration, setDuration] = useState('5 Days (Classic Paris)');
  const [travelers, setTravelers] = useState('Couple / 2 Travelers');
  const [interests, setInterests] = useState<string[]>(['Art & Museums', 'Gastronomy & Wine']);
  const [budget, setBudget] = useState('$$$ (Boutique Luxury)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 font-['DM_Sans',sans-serif]">
      <div className="bg-[#081028] border border-white/20 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-white">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans',sans-serif]">
                Paris Custom Itinerary Builder
              </h3>
              <p className="text-xs text-white/60">Step {step} of 5 — Tailored in 60 seconds</p>
            </div>
          </div>

          <button
            onClick={onClose}
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
                Itinerary Request Submitted!
              </h4>
              <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
                Merci <span className="text-white font-semibold">{name}</span>! Our Paris travel concierge has received your preferences ({duration}, {travelers}) and will send a custom proposal to <span className="text-amber-300 underline">{email}</span> within 12 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-white text-[#0B132B] font-bold text-xs hover:bg-white/90 transition-all cursor-pointer"
              >
                Back to Site
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: Duration */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-white flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>How long is your ideal trip to Paris?</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {durationOptions.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setDuration(opt.label)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          duration === opt.label
                            ? 'border-amber-400 bg-amber-400/15 font-bold shadow-lg'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-sm text-white">{opt.label}</div>
                        <div className="text-xs text-white/60 mt-1">{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Travelers */}
              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-white flex items-center space-x-2">
                    <Users className="w-4 h-4 text-amber-300" />
                    <span>Who will be traveling with you?</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {travelerOptions.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setTravelers(opt.label)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          travelers === opt.label
                            ? 'border-amber-400 bg-amber-400/15 font-bold shadow-lg'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-sm text-white">{opt.label}</div>
                        <div className="text-xs text-white/60 mt-1">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Interests */}
              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Select your top interests in Paris (Pick multiple)</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {interestOptions.map((item) => {
                      const selected = interests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`p-3 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                            selected
                              ? 'border-amber-400 bg-amber-400/20 font-bold text-amber-200 shadow-md'
                              : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80'
                          }`}
                        >
                          {selected && '✓ '}{item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Budget */}
              {step === 4 && (
                <div className="space-y-4">
                  <h4 className="text-base font-semibold text-white flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>What is your preferred comfort tier?</span>
                  </h4>
                  <div className="space-y-2.5">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBudget(opt)}
                        className={`w-full p-4 rounded-2xl border text-left text-sm transition-all cursor-pointer ${
                          budget === opt
                            ? 'border-emerald-400 bg-emerald-400/15 font-bold text-white shadow-lg'
                            : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/80'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Final Submission Details */}
              {step === 5 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5">
                    <div className="font-semibold text-amber-300">Your Travel Summary:</div>
                    <div className="text-white/80">• Duration: <span className="text-white">{duration}</span></div>
                    <div className="text-white/80">• Group: <span className="text-white">{travelers}</span></div>
                    <div className="text-white/80">• Interests: <span className="text-white">{interests.join(', ')}</span></div>
                    <div className="text-white/80">• Tier: <span className="text-white">{budget}</span></div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@example.com"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">Special Notes / Requests (Optional)</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Celebrating our anniversary on Night 3..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-[#0B132B] hover:bg-white/95 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xl"
                  >
                    <span>Submit & Get Custom Itinerary</span>
                    <Send className="w-4 h-4 text-[#0B132B]" />
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Controls */}
        {!submitted && (
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/5">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-full border border-white/20 text-xs font-medium hover:bg-white/10 flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 5 && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-[#0B132B] font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
