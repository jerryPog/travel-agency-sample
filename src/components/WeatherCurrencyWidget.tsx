import React, { useState, useEffect } from 'react';
import { Sun, Clock, ArrowRightLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function WeatherCurrencyWidget() {
  const { t } = useLanguage();
  const [parisTime, setParisTime] = useState('');
  const [amount, setAmount] = useState('1000');
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'GBP' | 'CAD'>('INR');
  const rates = { INR: 0.011, USD: 0.92, GBP: 1.18, CAD: 0.68 };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setParisTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const eurValue = (parseFloat(amount || '0') * rates[currency]).toFixed(2);

  return (
    <div className="w-full bg-[#050C1E]/80 backdrop-blur-md border-b border-white/10 text-xs py-2 px-4 md:px-12 flex flex-wrap items-center justify-between gap-2 z-30 relative font-['DM_Sans',sans-serif]">
      {/* Left: Weather & Paris Time */}
      <div className="flex items-center space-x-4 text-white/90">
        <div className="flex items-center space-x-1.5 font-medium">
          <Sun className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Paris 21°C / 70°F {t('sunny')}</span>
        </div>

        <div className="flex items-center space-x-1.5 text-white/70 border-l border-white/20 pl-4">
          <Clock className="w-3.5 h-3.5 text-blue-300" />
          <span>{parisTime ? `${parisTime} CET` : 'Paris Time'}</span>
        </div>
      </div>

      {/* Right: Quick Currency Converter */}
      <div className="flex items-center space-x-2 text-white/80">
        <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline font-medium text-white/70">{t('currencyConverter')}:</span>
        
        <div className="flex items-center space-x-1.5 bg-white/10 border border-white/20 rounded-full px-2.5 py-0.5">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-14 bg-transparent text-center text-white font-mono text-xs focus:outline-none"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer text-xs"
          >
            <option value="INR" className="bg-[#050C1E] text-white">INR (₹)</option>
            <option value="USD" className="bg-[#050C1E] text-white">USD ($)</option>
            <option value="GBP" className="bg-[#050C1E] text-white">GBP (£)</option>
            <option value="CAD" className="bg-[#050C1E] text-white">CAD ($)</option>
          </select>
          <span className="text-white/50">≈</span>
          <span className="font-bold text-emerald-300 font-mono">€{eurValue}</span>
        </div>
      </div>
    </div>
  );
}
