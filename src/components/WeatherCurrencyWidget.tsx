import { useState, useEffect } from 'react';
import { Sun, Clock, ArrowRightLeft, Cloud, CloudRain, CloudSun, Snowflake, CloudLightning } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { convertToEUR, CurrencyCode } from '../utils/currency';
import { fetchLiveParisWeather, getFormattedParisTime, RealtimeWeatherData } from '../services/weatherService';

export function WeatherCurrencyWidget() {
  const { t } = useLanguage();
  const [parisTime, setParisTime] = useState({ timeString: '', tzAbbr: 'CET' });
  const [weather, setWeather] = useState<RealtimeWeatherData>({
    tempC: 21,
    tempF: 70,
    condition: 'Sunny',
    isDay: true,
    weatherCode: 0,
  });
  const [amount, setAmount] = useState('10000');
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  // Real-time ticking clock (updates every 1 second)
  useEffect(() => {
    const updateTime = () => {
      setParisTime(getFormattedParisTime());
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time live Paris weather fetch (fetches on mount and refreshes every 5 minutes)
  useEffect(() => {
    let isMounted = true;
    const loadWeather = async () => {
      const data = await fetchLiveParisWeather();
      if (isMounted) setWeather(data);
    };

    loadWeather();
    const weatherInterval = setInterval(loadWeather, 300000); // 5 mins
    return () => {
      isMounted = false;
      clearInterval(weatherInterval);
    };
  }, []);

  const eurValue = convertToEUR(amount, currency);

  // Dynamic Weather Icon mapping based on live WMO code
  const getWeatherIcon = () => {
    const code = weather.weatherCode;
    if (code === 0 || code === 1) {
      return <Sun className="w-3.5 h-3.5 text-amber-300 animate-pulse" aria-hidden="true" />;
    }
    if (code === 2 || code === 3) {
      return <CloudSun className="w-3.5 h-3.5 text-amber-200" aria-hidden="true" />;
    }
    if (code >= 51 && code <= 82) {
      return <CloudRain className="w-3.5 h-3.5 text-blue-300" aria-hidden="true" />;
    }
    if (code >= 71 && code <= 75) {
      return <Snowflake className="w-3.5 h-3.5 text-blue-200" aria-hidden="true" />;
    }
    if (code >= 95) {
      return <CloudLightning className="w-3.5 h-3.5 text-purple-300" aria-hidden="true" />;
    }
    return <Cloud className="w-3.5 h-3.5 text-white/80" aria-hidden="true" />;
  };

  return (
    <div className="w-full bg-[#050C1E]/90 backdrop-blur-md border-b border-white/10 text-xs py-2 px-4 md:px-12 flex flex-wrap items-center justify-between gap-2 z-30 relative font-['DM_Sans',sans-serif]">
      {/* Left: Realtime Live Weather & Realtime Ticking Paris Clock */}
      <div className="flex items-center space-x-4 text-white/90">
        <div className="flex items-center space-x-1.5 font-medium">
          {getWeatherIcon()}
          <span>
            Paris {weather.tempC}°C / {weather.tempF}°F {weather.condition}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-white/80 border-l border-white/20 pl-4 font-mono">
          <Clock className="w-3.5 h-3.5 text-blue-300 shrink-0" aria-hidden="true" />
          <span>{parisTime.timeString ? `${parisTime.timeString} ${parisTime.tzAbbr}` : 'Paris Time'}</span>
        </div>
      </div>

      {/* Right: Quick Currency Converter */}
      <div className="flex items-center space-x-2 text-white/80">
        <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
        <span className="hidden sm:inline font-medium text-white/70">{t('currencyConverter')}:</span>
        
        <div className="flex items-center space-x-1.5 bg-white/10 border border-white/20 rounded-full px-2.5 py-0.5">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="Amount to convert"
            className="w-16 bg-transparent text-center text-white font-mono text-xs focus:outline-none"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            aria-label="Currency code"
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
        <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
          {t('indicativeRates')}
        </span>
      </div>
    </div>
  );
}
