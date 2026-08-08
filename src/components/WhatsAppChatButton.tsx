import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, HelpCircle, ChevronDown, ChevronUp, Search, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../config/siteConfig';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  waText: string;
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'When is the best time of year to visit Paris?',
    answer: 'Spring (April–June) and Autumn (September–November) offer pleasant mild weather, fewer crowds, and gorgeous scenery. Summer (July–August) is vibrant but busier.',
    waText: 'Bonjour! I would like recommendations on the best months for my Paris trip dates.',
  },
  {
    id: 'faq-2',
    question: 'Do I need to book Louvre, Eiffel Tower, or Versailles in advance?',
    answer: 'Yes! Major sights require reserved time slots weeks in advance. All our custom travel packages include skip-the-line reservations.',
    waText: 'Bonjour! I need skip-the-line tickets and reservations for the Louvre & Eiffel Tower.',
  },
  {
    id: 'faq-3',
    question: 'How do I get from CDG Airport to central Paris?',
    answer: 'The RER B train takes ~35–45 mins into central Paris. Taxis have a fixed flat rate (€56–€65). We also arrange private VIP Mercedes transfers.',
    waText: 'Bonjour! I would like to arrange private airport transfer from CDG to my Paris hotel.',
  },
  {
    id: 'faq-4',
    question: 'Is Paris safe for solo female travelers and evening walks?',
    answer: 'Paris is very safe. Standard urban safety applies (watch for pickpockets near crowded tourist spots). We provide neighborhood safety maps and 24/7 hotline support.',
    waText: 'Bonjour! I am traveling solo to Paris and would like safety tips & neighborhood advice.',
  },
  {
    id: 'faq-5',
    question: 'How does public transit (Metro / RER) work in Paris?',
    answer: 'The Metro covers the entire city. You can use contactless credit cards, Apple/Google Pay, or Navigo Easy reloadable cards. Single trips cost ~€2.15.',
    waText: 'Bonjour! Can you help me understand Metro passes and getting around Paris?',
  },
  {
    id: 'faq-6',
    question: 'What is the tipping etiquette in Paris restaurants & cafes?',
    answer: 'Service charge ("service compris") is included by law on all French bills. Leaving 1–2€ for casual cafes or 5–10% for exceptional dining is customary but optional.',
    waText: 'Bonjour! I have questions about dining reservations and tipping in Paris.',
  },
  {
    id: 'faq-7',
    question: 'Can you customize itineraries for families with kids or seniors?',
    answer: 'Yes! We design family scavenger hunts, elevator-accessible paths, relaxed walking paces, and private vehicles to minimize fatigue.',
    waText: 'Bonjour! I am planning a family trip to Paris with kids/seniors and need a custom itinerary.',
  },
  {
    id: 'faq-8',
    question: 'Do local shops, cafes, and taxis accept credit cards?',
    answer: 'Yes, contactless credit/debit cards (Visa/Mastercard) and mobile pay are accepted virtually everywhere. Carrying 10–20€ cash is handy for small flea markets.',
    waText: 'Bonjour! I have a question about currencies, payments, and shopping in Paris.',
  },
  {
    id: 'faq-9',
    question: 'How far in advance should I book my Paris itinerary?',
    answer: 'We recommend booking 2 to 6 weeks in advance to secure top hotel choices, private guides, and popular dinner spots. Last-minute bookings are also welcome!',
    waText: 'Bonjour! I would like to check availability for booking an itinerary for my upcoming dates.',
  },
  {
    id: 'faq-10',
    question: 'How does your 24/7 local Paris concierge support work?',
    answer: 'During your stay, you get direct WhatsApp hotline access to our Paris team for real-time help with bookings, rainy-day alternatives, or local tips anytime.',
    waText: 'Bonjour! I want to know more about your 24/7 WhatsApp concierge support during my trip.',
  },
];

export function WhatsAppChatButton() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'faq' | 'custom'>('faq');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpenWhatsApp = (text?: string) => {
    const phone = siteConfig.contact.whatsappNumber;
    const messageText = text || customMessage || 'Bonjour! I have a custom question about planning my Paris trip.';
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['DM_Sans',sans-serif]">
      {/* Floating Chat & FAQ Popover Modal */}
      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp Paris Travel Concierge & FAQ Guide"
          className="absolute bottom-16 right-0 w-[92vw] sm:w-[420px] max-h-[82vh] bg-[#081028]/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-4 sm:p-5 text-white flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  P
                </div>
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0B132B] rounded-full"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  {t('waConcierge')}
                </h4>
                <p className="text-[10px] text-emerald-400 font-medium">
                  {t('waOnlineStatus')}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close WhatsApp chat popover"
              className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-white/10 p-1 rounded-xl mb-3 shrink-0 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'faq' ? 'bg-white text-[#0B132B] shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Top 10 FAQs</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                activeTab === 'custom' ? 'bg-emerald-500 text-white shadow-sm' : 'text-white/70 hover:text-white'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp Direct</span>
            </button>
          </div>

          {/* TAB 1: 10 FAQs View */}
          {activeTab === 'faq' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Search Bar */}
              <div className="relative mb-3 shrink-0">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 10 Paris FAQs..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300"
                />
              </div>

              {/* FAQ Accordion List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar min-h-0 scroll-contain">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => {
                    const isExpanded = openFaqId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaqId(isExpanded ? null : faq.id)}
                          className="w-full p-3 text-left text-xs font-semibold text-white/90 hover:text-white flex items-center justify-between gap-2 cursor-pointer"
                        >
                          <span className="flex items-center space-x-2">
                            <Sparkles className="w-3 h-3 text-amber-300 shrink-0" aria-hidden="true" />
                            <span>{faq.question}</span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-white/60 shrink-0" aria-hidden="true" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="px-3 pb-3 pt-1 border-t border-white/10 text-[11px] text-white/80 leading-relaxed space-y-2">
                            <p>{faq.answer}</p>
                            <button
                              onClick={() => handleOpenWhatsApp(faq.waText)}
                              className="w-full py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 rounded-xl font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer text-[11px]"
                            >
                              <span>Ask Guide About This on WhatsApp</span>
                              <ExternalLink className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-xs text-white/60">
                    No matching questions found.
                  </div>
                )}
              </div>

              {/* Bottom Fallback WhatsApp CTA Box */}
              <div className="mt-3 pt-3 border-t border-white/10 bg-white/5 p-3 rounded-2xl shrink-0 text-center space-y-2">
                <div className="text-[11px] text-white/80 font-medium">
                  Question not listed here?
                </div>
                <button
                  onClick={() => handleOpenWhatsApp()}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs py-2 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Contact Guide on WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Custom WhatsApp Direct Message View */}
          {activeTab === 'custom' && (
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div className="bg-white/10 rounded-2xl p-3 text-xs text-white/90 leading-relaxed border border-white/10">
                {t('waWelcomeMsg')}
              </div>

              <div className="space-y-2">
                <label htmlFor="wa-custom-msg" className="block text-xs font-semibold text-white/80">
                  Type your custom question or travel request:
                </label>
                <textarea
                  id="wa-custom-msg"
                  rows={3}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Bonjour! I need recommendations for romantic dining near Notre-Dame..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                />
              </div>

              <button
                onClick={() => handleOpenWhatsApp()}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t('waStartChat')}</span>
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat & Paris Travel FAQ Guide"
        aria-expanded={isOpen}
        className="group relative flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" aria-hidden="true" />
        <span className="text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] whitespace-nowrap">
          {t('waChatWithGuide')}
        </span>
      </button>
    </div>
  );
}
