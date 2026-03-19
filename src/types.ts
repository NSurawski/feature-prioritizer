export type Framework = 'rice' | 'ice' | 'value-effort';

export interface RICEScores {
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
}

export interface ICEScores {
  impact: number;
  confidence: number;
  ease: number;
}

export interface ValueEffortScores {
  value: number;
  effort: number;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  rice: RICEScores;
  ice: ICEScores;
  valueEffort: ValueEffortScores;
}

export function calculateRICE(s: RICEScores): number {
  if (s.effort === 0) return 0;
  return (s.reach * s.impact * (s.confidence / 100)) / s.effort;
}

export function calculateICE(s: ICEScores): number {
  return s.impact * s.confidence * s.ease;
}

export function getPriorityScore(feature: Feature, framework: Framework): number {
  switch (framework) {
    case 'rice':
      return calculateRICE(feature.rice);
    case 'ice':
      return calculateICE(feature.ice);
    case 'value-effort':
      return feature.valueEffort.effort === 0 ? 0 : feature.valueEffort.value / feature.valueEffort.effort;
  }
}

export function getMatrixCoords(feature: Feature, framework: Framework): { x: number; y: number } {
  switch (framework) {
    case 'rice':
      return { x: feature.rice.effort, y: (feature.rice.reach * feature.rice.impact * (feature.rice.confidence / 100)) };
    case 'ice':
      return { x: 11 - feature.ice.ease, y: feature.ice.impact * feature.ice.confidence };
    case 'value-effort':
      return { x: feature.valueEffort.effort, y: feature.valueEffort.value };
  }
}

export function createDefaultFeature(): Feature {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    category: '',
    rice: { reach: 100, impact: 1, confidence: 80, effort: 1 },
    ice: { impact: 5, confidence: 5, ease: 5 },
    valueEffort: { value: 5, effort: 5 },
  };
}

export const CATEGORIES = [
  { name: 'Growth', color: '#3b82f6' },
  { name: 'Retention', color: '#10b981' },
  { name: 'Infrastructure', color: '#f59e0b' },
  { name: 'UX', color: '#ec4899' },
  { name: 'Other', color: '#8b5cf6' },
];
