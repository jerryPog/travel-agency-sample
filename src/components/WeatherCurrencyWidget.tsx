import { useState, useEffect } from 'react';
import { Sun, Clock, ArrowRightLeft, Cloud, CloudRain, CloudSun, Snowflake, CloudLightning } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { convertToEUR, fetchLiveRates, hasLiveRates, CurrencyCode } from '../utils/currency';
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
  const [liveRates, setLiveRates] = useState<Record<string, number> | undefined>(undefined);
  const [isLive, setIsLive] = useState(false);

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

  // Real-time live currency exchange rates (fetches on mount, refreshes every 10 minutes)
  useEffect(() => {
    let isMounted = true;
    const loadRates = async () => {
      const rates = await fetchLiveRates();
      if (isMounted) {
        setLiveRates(rates);
        setIsLive(hasLiveRates());
      }
    };

    loadRates();
    const ratesInterval = setInterval(loadRates, 600000); // 10 mins
    return () => {
      isMounted = false;
      clearInterval(ratesInterval);
    };
  }, []);

  const eurValue = convertToEUR(amount, currency, liveRates);

  // Dynamic Weather Icon mapping based on live WMO code
  const getWeatherIcon = () => {
    const code = weather.weatherCode;
    if (code === 0 || code === 1) {
      return <Sun className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" aria-hidden="true" />;
    }
    if (code === 2 || code === 3) {
      return <CloudSun className="w-3.5 h-3.5 text-amber-200 shrink-0" aria-hidden="true" />;
    }
    if (code >= 51 && code <= 82) {
      return <CloudRain className="w-3.5 h-3.5 text-blue-300 shrink-0" aria-hidden="true" />;
    }
    if (code >= 71 && code <= 75) {
      return <Snowflake className="w-3.5 h-3.5 text-blue-200 shrink-0" aria-hidden="true" />;
    }
    if (code >= 95) {
      return <CloudLightning className="w-3.5 h-3.5 text-purple-300 shrink-0" aria-hidden="true" />;
    }
    return <Cloud className="w-3.5 h-3.5 text-white/80 shrink-0" aria-hidden="true" />;
  };

  return (
    <div className="w-full bg-[#050C1E]/90 backdrop-blur-md border-b border-white/10 text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 md:px-12 flex flex-wrap items-center justify-center sm:justify-between gap-1.5 sm:gap-2 z-30 relative font-['DM_Sans',sans-serif]">
      {/* Left: Realtime Live Weather & Realtime Ticking Paris Clock */}
      <div className="flex flex-wrap items-center justify-center space-x-3 text-white/90">
        <div className="flex items-center space-x-1 font-medium">
          {getWeatherIcon()}
          <span>
            Paris {weather.tempC}°C / {weather.tempF}°F {weather.condition}
          </span>
        </div>

        <div className="flex items-center space-x-1 text-white/80 border-l border-white/20 pl-3 font-mono">
          <Clock className="w-3 h-3 text-blue-300 shrink-0" aria-hidden="true" />
          <span>{parisTime.timeString ? `${parisTime.timeString} ${parisTime.tzAbbr}` : 'Paris Time'}</span>
        </div>
      </div>

      {/* Right: Quick Currency Converter */}
      <div className="flex items-center space-x-1.5 text-white/80">
        <ArrowRightLeft className="w-3 h-3 text-emerald-400 shrink-0" aria-hidden="true" />
        <span className="hidden md:inline font-medium text-white/70">{t('currencyConverter')}:</span>
        
        <div className="flex items-center space-x-1 bg-white/10 border border-white/20 rounded-full px-2 py-0.5">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            aria-label="Amount to convert"
            className="w-14 sm:w-16 bg-transparent text-center text-white font-mono text-[11px] sm:text-xs focus:outline-none"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            aria-label="Currency code"
            className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer text-[11px] sm:text-xs"
          >
            <option value="INR" className="bg-[#050C1E] text-white">INR (₹)</option>
            <option value="USD" className="bg-[#050C1E] text-white">USD ($)</option>
            <option value="GBP" className="bg-[#050C1E] text-white">GBP (£)</option>
            <option value="CAD" className="bg-[#050C1E] text-white">CAD ($)</option>
          </select>
          <span className="text-white/50">≈</span>
          <span className="font-bold text-emerald-300 font-mono">€{eurValue}</span>
        </div>
        <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full border flex items-center space-x-1 ${isLive ? 'text-emerald-300/80 bg-emerald-400/10 border-emerald-400/20' : 'text-white/50 bg-white/5 border-white/10'}`}>
          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
          <span>{isLive ? t('liveRates') : t('indicativeRates')}</span>
        </span>
      </div>
    </div>
  );
}
