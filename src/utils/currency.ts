export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'CAD';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  CAD: '$',
};

// ── Live Exchange Rate Cache ──
// Rates are fetched from the free ExchangeRate-API (no key required)
// and cached for 10 minutes to avoid excessive requests.

interface RateCache {
  rates: Record<string, number>;
  timestamp: number;
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
let rateCache: RateCache | null = null;
let fetchPromise: Promise<Record<string, number>> | null = null;

// Fallback rates used only when API is completely unreachable
const FALLBACK_RATES: Record<string, number> = {
  INR: 0.011,
  USD: 0.92,
  GBP: 1.18,
  CAD: 0.68,
};

/**
 * Fetches live EUR exchange rates from open.er-api.com.
 * Returns a map of currency code → rate (how many EUR per 1 unit of that currency).
 * Results are cached for 10 minutes.
 */
export async function fetchLiveRates(): Promise<Record<string, number>> {
  // Return cached rates if still fresh
  if (rateCache && Date.now() - rateCache.timestamp < CACHE_TTL_MS) {
    return rateCache.rates;
  }

  // Deduplicate concurrent fetches
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data?.result !== 'success' || !data.rates) {
        throw new Error('Invalid API response');
      }

      // API returns EUR as base: { "EUR": 1, "USD": 1.08, "INR": 91.5, ... }
      // We need the inverse: how many EUR per 1 unit of foreign currency
      const invertedRates: Record<string, number> = {};
      for (const [code, rate] of Object.entries(data.rates)) {
        const numRate = rate as number;
        if (numRate > 0) {
          invertedRates[code] = 1 / numRate;
        }
      }

      rateCache = { rates: invertedRates, timestamp: Date.now() };
      return invertedRates;
    } catch (err) {
      console.warn('Live currency rate fetch failed, using fallback:', err);
      // Use cached rates if available, otherwise fallback
      return rateCache?.rates ?? FALLBACK_RATES;
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * Returns whether live rates have been loaded (vs fallback).
 */
export function hasLiveRates(): boolean {
  return rateCache !== null;
}

/**
 * Converts an amount from a specified source currency to EUR using live rates.
 * Falls back to cached/fallback rates if live fetch hasn't completed.
 */
export function convertToEUR(amount: number | string, fromCurrency: CurrencyCode, liveRates?: Record<string, number>): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount) || numericAmount < 0) {
    return '0.00';
  }
  const rates = liveRates ?? rateCache?.rates ?? FALLBACK_RATES;
  const rate = rates[fromCurrency] ?? 1;
  return (numericAmount * rate).toFixed(2);
}

/**
 * Converts an amount from EUR to a target currency using live rates.
 */
export function convertFromEUR(amountInEUR: number | string, toCurrency: CurrencyCode, liveRates?: Record<string, number>): string {
  const numericAmount = typeof amountInEUR === 'string' ? parseFloat(amountInEUR) : amountInEUR;
  if (isNaN(numericAmount) || numericAmount < 0) {
    return '0.00';
  }
  const rates = liveRates ?? rateCache?.rates ?? FALLBACK_RATES;
  const rate = rates[toCurrency] ?? 1;
  if (rate === 0) return '0.00';
  return (numericAmount / rate).toFixed(2);
}
