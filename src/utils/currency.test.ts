import test from 'node:test';
import assert from 'node:assert/strict';
import { convertToEUR, convertFromEUR } from './currency.ts';

// Tests use explicit fallback rates to ensure deterministic results
const FALLBACK_RATES: Record<string, number> = {
  INR: 0.011,
  USD: 0.92,
  GBP: 1.18,
  CAD: 0.68,
};

test('convertToEUR converts INR to EUR correctly with fallback rates', () => {
  const result = convertToEUR(10000, 'INR', FALLBACK_RATES);
  assert.equal(result, '110.00');
});

test('convertToEUR converts USD to EUR correctly with fallback rates', () => {
  const result = convertToEUR(100, 'USD', FALLBACK_RATES);
  assert.equal(result, '92.00');
});

test('convertToEUR converts GBP to EUR correctly with fallback rates', () => {
  const result = convertToEUR(100, 'GBP', FALLBACK_RATES);
  assert.equal(result, '118.00');
});

test('convertToEUR handles invalid string input gracefully', () => {
  assert.equal(convertToEUR('abc', 'USD', FALLBACK_RATES), '0.00');
  assert.equal(convertToEUR(-50, 'USD', FALLBACK_RATES), '0.00');
});

test('convertFromEUR converts EUR back to USD accurately with fallback rates', () => {
  const eurAmount = 92;
  const result = convertFromEUR(eurAmount, 'USD', FALLBACK_RATES);
  assert.equal(result, '100.00');
});
