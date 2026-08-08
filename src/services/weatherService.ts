export interface RealtimeWeatherData {
  tempC: number;
  tempF: number;
  condition: string;
  isDay: boolean;
  weatherCode: number;
}

export function getWMOWeatherCondition(code: number, isDay: boolean): string {
  switch (code) {
    case 0:
      return isDay ? 'Sunny' : 'Clear Sky';
    case 1:
      return isDay ? 'Mostly Sunny' : 'Mostly Clear';
    case 2:
      return 'Partly Cloudy';
    case 3:
      return 'Overcast';
    case 45:
    case 48:
      return 'Foggy';
    case 51:
    case 53:
    case 55:
      return 'Light Drizzle';
    case 61:
    case 63:
    case 65:
      return 'Rainy';
    case 71:
    case 73:
    case 75:
      return 'Snowy';
    case 80:
    case 81:
    case 82:
      return 'Showers';
    case 95:
    case 96:
    case 99:
      return 'Thunderstorm';
    default:
      return 'Clear';
  }
}

export async function fetchLiveParisWeather(): Promise<RealtimeWeatherData> {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true'
    );
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    
    const currentWeather = data?.current_weather;
    if (!currentWeather) throw new Error('Invalid weather response payload');

    const tempC = Math.round(currentWeather.temperature);
    const tempF = Math.round((currentWeather.temperature * 9) / 5 + 32);
    const isDay = currentWeather.is_day === 1;
    const weatherCode = currentWeather.weathercode ?? 0;
    const condition = getWMOWeatherCondition(weatherCode, isDay);

    return {
      tempC,
      tempF,
      condition,
      isDay,
      weatherCode,
    };
  } catch (err) {
    console.warn('Realtime weather fetch fallback:', err);
    return {
      tempC: 21,
      tempF: 70,
      condition: 'Sunny',
      isDay: true,
      weatherCode: 0,
    };
  }
}

export function getFormattedParisTime(): { timeString: string; tzAbbr: string } {
  const now = new Date();

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const tzFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    timeZoneName: 'short',
  });

  const timeString = timeFormatter.format(now);
  const parts = tzFormatter.formatToParts(now);
  const tzPart = parts.find((p) => p.type === 'timeZoneName');
  const tzAbbr = tzPart ? tzPart.value : 'CET';

  return { timeString, tzAbbr };
}
