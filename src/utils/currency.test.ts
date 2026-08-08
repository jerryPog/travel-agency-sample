import test from 'node:test';
import assert from 'node:assert/strict';
import { convertToEUR, convertFromEUR } from './currency.ts';

test('convertToEUR converts INR to EUR correctly', () => {
  const result = convertToEUR(10000, 'INR');
  assert.equal(result, '110.00');
});

test('convertToEUR converts USD to EUR correctly', () => {
  const result = convertToEUR(100, 'USD');
  assert.equal(result, '92.00');
});

test('convertToEUR converts GBP to EUR correctly', () => {
  const result = convertToEUR(100, 'GBP');
  assert.equal(result, '118.00');
});

test('convertToEUR handles invalid string input gracefully', () => {
  assert.equal(convertToEUR('abc', 'USD'), '0.00');
  assert.equal(convertToEUR(-50, 'USD'), '0.00');
});

test('convertFromEUR converts EUR back to USD accurately', () => {
  const eurAmount = 92;
  const result = convertFromEUR(eurAmount, 'USD');
  assert.equal(result, '100.00');
});
