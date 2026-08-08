export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'CAD';

/**
 * Indicative exchange rates relative to 1 unit of foreign currency to EUR.
 * E.g., 1 USD = 0.92 EUR, 1 GBP = 1.18 EUR, 1 CAD = 0.68 EUR, 1 INR = 0.011 EUR
 */
export const INDICATIVE_RATES: Record<CurrencyCode, number> = {
  INR: 0.011,
  USD: 0.92,
  GBP: 1.18,
  CAD: 0.68,
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  CAD: '$',
};

/**
 * Converts an amount from a specified source currency to EUR.
 * Returns formatted string representation.
 */
export function convertToEUR(amount: number | string, fromCurrency: CurrencyCode): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount) || numericAmount < 0) {
    return '0.00';
  }
  const rate = INDICATIVE_RATES[fromCurrency] ?? 1;
  return (numericAmount * rate).toFixed(2);
}

/**
 * Converts an amount from EUR to a target currency.
 */
export function convertFromEUR(amountInEUR: number | string, toCurrency: CurrencyCode): string {
  const numericAmount = typeof amountInEUR === 'string' ? parseFloat(amountInEUR) : amountInEUR;
  if (isNaN(numericAmount) || numericAmount < 0) {
    return '0.00';
  }
  const rate = INDICATIVE_RATES[toCurrency] ?? 1;
  if (rate === 0) return '0.00';
  return (numericAmount / rate).toFixed(2);
}
