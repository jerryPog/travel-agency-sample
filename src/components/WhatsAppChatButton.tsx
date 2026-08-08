import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, PhoneCall, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export function WhatsAppChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleOpenWhatsApp = (textToSend?: string) => {
    const message = textToSend || customMessage || 'Bonjour! I would like to inquire about a bespoke luxury Paris travel package.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Close drawer when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end font-['DM_Sans',sans-serif]">
      {/* Expanded VIP Concierge Mini-Card Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 sm:w-96 mb-3 rounded-3xl bg-[#070B14]/95 border-gradient-gold shadow-2xl overflow-hidden backdrop-blur-2xl text-white origin-bottom-right"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-[#070B14] flex items-center justify-center font-bold text-sm shadow-md font-['Plus_Jakarta_Sans',sans-serif]">
                    {siteConfig.founder.initials}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#070B14] rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] flex items-center space-x-1.5">
                    <span>{siteConfig.founder.name}</span>
                    <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-amber-300/90 font-mono">
                    Live VIP Private Concierge
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Concierge Actions */}
            <div className="p-5 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1.5 text-xs text-white/80">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>24/7 Priority Paris Assistance</span>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Connect directly with founder {siteConfig.founder.name} for bespoke itineraries, private jet charters & last-minute Michelin dining access.
                </p>
              </div>

              {/* Quick Preset Prompts */}
              <div className="space-y-2">
                <button
                  onClick={() => handleOpenWhatsApp('Bonjour! I would like to inquire about private jet charters and luxury transfers.')}
                  className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/90 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>✈️ Private Jet Charters & Transfers</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  onClick={() => handleOpenWhatsApp('Bonjour! I need a custom 5-day luxury itinerary tailored for our trip.')}
                  className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/90 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span>👑 5-Day Bespoke Luxury Itinerary</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Text Input */}
              <div className="space-y-1">
                <textarea
                  rows={2}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type your Paris travel inquiry..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-300 transition-colors resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenWhatsApp()}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#070B14] font-bold text-xs py-2.5 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <a
                  href={`tel:${siteConfig.contact.whatsappNumber}`}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-[#070B14] font-bold text-xs py-2.5 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        ref={triggerRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open VIP Private Concierge Widget"
        aria-expanded={isOpen}
        className="group relative flex items-center space-x-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 text-[#070B14] px-4 py-3 rounded-full shadow-2xl transition-all cursor-pointer border border-amber-300/40"
      >
        <MessageCircle className="w-5 h-5 fill-current text-[#070B14]" aria-hidden="true" />
        <span className="text-xs font-extrabold font-['Plus_Jakarta_Sans',sans-serif] whitespace-nowrap tracking-wide uppercase">
          Private Concierge
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </motion.button>
    </div>
  );
}
