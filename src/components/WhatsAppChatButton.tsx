import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
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
    <div className="fixed bottom-6 right-6 z-50 font-['DM_Sans',sans-serif]">
      {/* Floating Chat Modal Popover */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-[#0B132B]/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-5 text-white animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-md">
                  P
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0B132B] rounded-full" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  {t('waConcierge')}
                </h4>
                <p className="text-[10px] text-emerald-400 font-medium">
                  {t('waOnlineStatus')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/10 rounded-2xl p-3.5 mb-4 text-xs text-white/90 leading-relaxed border border-white/10">
            {t('waWelcomeMsg')}
          </div>

          <form onSubmit={handleSendWhatsApp} className="space-y-3">
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('waTypeMsg')}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t('waStartChat')}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] whitespace-nowrap">
          {t('waChatWithGuide')}
        </span>
      </button>
    </div>
  );
}
