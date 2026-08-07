import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function WhatsAppChatButton() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = '917892145475';
    const text = encodeURIComponent(message || 'Bonjour! I would like help planning my Paris trip.');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-['DM_Sans',sans-serif]">
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#081028]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                  P
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#081028] rounded-full animate-ping" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-['Plus_Jakarta_Sans',sans-serif] flex items-center space-x-1">
                  <span>Paris Travel Concierge</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[10px] text-emerald-300 font-medium">Online • Responds in ~5 minutes</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-4 text-xs text-white/90 leading-relaxed">
            <span className="font-semibold text-amber-300">Bonjour! 👋</span> How can we help you plan your ideal Paris itinerary today?
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-3">
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0B132B] font-bold text-xs py-2.5 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start WhatsApp Chat</span>
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0B132B] font-bold text-xs shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#0B132B] animate-pulse" />
        <MessageCircle className="w-4 h-4 text-[#0B132B]" />
        <span className="hidden sm:inline tracking-tight">Chat with Guide</span>
      </button>
    </div>
  );
}
