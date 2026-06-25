import { describe, it, expect } from 'vitest';
import {
  calculateRICE,
  calculateICE,
  getPriorityScore,
  getMatrixCoords,
  getCategoryColor,
  CATEGORIES,
} from './types';
import type { Feature } from './types';

describe('calculateRICE', () => {
  it('returns (reach * impact * confidence/100) / effort', () => {
    expect(calculateRICE({ reach: 1000, impact: 2, confidence: 80, effort: 4 })).toBe(400);
  });

  it('returns 0 when effort is 0', () => {
    expect(calculateRICE({ reach: 1000, impact: 2, confidence: 80, effort: 0 })).toBe(0);
  });

  it('handles 100% confidence', () => {
    expect(calculateRICE({ reach: 100, impact: 1, confidence: 100, effort: 1 })).toBe(100);
  });
});

describe('calculateICE', () => {
  it('returns impact * confidence * ease', () => {
    expect(calculateICE({ impact: 8, confidence: 7, ease: 5 })).toBe(280);
  });

  it('returns 0 when any factor is 0', () => {
    expect(calculateICE({ impact: 0, confidence: 7, ease: 5 })).toBe(0);
    expect(calculateICE({ impact: 8, confidence: 0, ease: 5 })).toBe(0);
    expect(calculateICE({ impact: 8, confidence: 7, ease: 0 })).toBe(0);
  });
});

describe('getPriorityScore', () => {
  const feature: Feature = {
    id: 'test-id',
    name: 'Test',
    description: '',
    category: 'Growth',
    rice: { reach: 1000, impact: 2, confidence: 80, effort: 4 },
    ice: { impact: 8, confidence: 7, ease: 5 },
    valueEffort: { value: 8, effort: 4 },
  };

  it('delegates to calculateRICE for rice framework', () => {
    expect(getPriorityScore(feature, 'rice')).toBe(400);
  });

  it('delegates to calculateICE for ice framework', () => {
    expect(getPriorityScore(feature, 'ice')).toBe(280);
  });

  it('returns value/effort for value-effort framework', () => {
    expect(getPriorityScore(feature, 'value-effort')).toBe(2);
  });

  it('returns 0 for value-effort when effort is 0', () => {
    const f = { ...feature, valueEffort: { value: 8, effort: 0 } };
    expect(getPriorityScore(f, 'value-effort')).toBe(0);
  });
});

describe('getMatrixCoords', () => {
  const feature: Feature = {
    id: 'test-id',
    name: 'Test',
    description: '',
    category: 'Growth',
    rice: { reach: 500, impact: 2, confidence: 80, effort: 3 },
    ice: { impact: 8, confidence: 7, ease: 5 },
    valueEffort: { value: 8, effort: 4 },
  };

  it('returns effort as x and reach*impact*confidence/100 as y for rice', () => {
    expect(getMatrixCoords(feature, 'rice')).toEqual({ x: 3, y: 800 });
  });

  it('returns inverted ease as x and impact*confidence as y for ice', () => {
    expect(getMatrixCoords(feature, 'ice')).toEqual({ x: 6, y: 56 });
  });

  it('returns effort as x and value as y for value-effort', () => {
    expect(getMatrixCoords(feature, 'value-effort')).toEqual({ x: 4, y: 8 });
  });
});

describe('getCategoryColor', () => {
  it('returns the color for a known category', () => {
    const growth = CATEGORIES.find(c => c.name === 'Growth')!;
    expect(getCategoryColor('Growth')).toBe(growth.color);
  });

  it('returns default gray for unknown category', () => {
    expect(getCategoryColor('Unknown')).toBe('#6b7280');
  });

  it('returns correct colors for all defined categories', () => {
    for (const cat of CATEGORIES) {
      expect(getCategoryColor(cat.name)).toBe(cat.color);
    }
  });
});
