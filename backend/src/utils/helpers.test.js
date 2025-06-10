// Assuming you have a helpers.js file with utility functions
const { formatCurrency, calculatePercentage } = require('./helpers');

describe('Helper Functions', () => {
  describe('formatCurrency', () => {
    test('formats number as currency correctly', () => {
      expect(formatCurrency(1000)).toBe('KES 1,000.00');
      expect(formatCurrency(1000.5)).toBe('KES 1,000.50');
      expect(formatCurrency(0)).toBe('KES 0.00');
    });
  });

  describe('calculatePercentage', () => {
    test('calculates percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50);
      expect(calculatePercentage(25, 50)).toBe(50);
      expect(calculatePercentage(0, 100)).toBe(0);
    });

    test('handles division by zero', () => {
      expect(calculatePercentage(50, 0)).toBe(0);
    });
  });
});