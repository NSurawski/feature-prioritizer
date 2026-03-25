import { useState } from 'react';
import type { Feature, Framework } from '../types';
import { createDefaultFeature, CATEGORIES } from '../types';

interface Props {
  framework: Framework;
  onAdd: (feature: Feature) => void;
  editingFeature?: Feature | null;
  onUpdate?: (feature: Feature) => void;
  onCancelEdit?: () => void;
  disabled?: boolean;
}

const IMPACT_OPTIONS = [
  { value: 0.25, label: '0.25 — Minimal' },
  { value: 0.5, label: '0.5 — Low' },
  { value: 1, label: '1 — Medium' },
  { value: 2, label: '2 — High' },
  { value: 3, label: '3 — Massive' },
];

export default function FeatureForm({ framework, onAdd, editingFeature, onUpdate, onCancelEdit, disabled }: Props) {
  const [feature, setFeature] = useState<Feature>(editingFeature ?? createDefaultFeature());
  const isEditing = !!editingFeature;

  const update = (partial: Partial<Feature>) => setFeature(f => ({ ...f, ...partial }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feature.name.trim()) return;
    if (isEditing && onUpdate) {
      onUpdate(feature);
    } else {
      onAdd(feature);
      setFeature(createDefaultFeature());
    }
  };

  const inputClass = 'w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-purple-500';
  const labelClass = 'block text-xs text-gray-400 mb-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Feature Name *</label>
        <input
          className={inputClass}
          value={feature.name}
          onChange={e => update({ name: e.target.value })}
          placeholder="e.g., In-app notifications"
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          className={`${inputClass} resize-none h-16`}
          value={feature.description}
          onChange={e => update({ description: e.target.value })}
          placeholder="Brief description..."
        />
      </div>

      <div>
        <label className={labelClass}>Category</label>
        <select
          className={inputClass}
          value={feature.category}
          onChange={e => update({ category: e.target.value })}
        >
          <option value="">None</option>
          {CATEGORIES.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {framework === 'rice' && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">RICE Scores</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>
                Reach
                <span className="ml-1 text-gray-500" title="Users impacted per quarter">ⓘ</span>
              </label>
              <input
                type="number"
                className={inputClass}
                value={feature.rice.reach}
                onChange={e => update({ rice: { ...feature.rice, reach: +e.target.value } })}
                min={0}
              />
            </div>
            <div>
              <label className={labelClass}>
                Impact
                <span className="ml-1 text-gray-500" title="Impact per user (0.25-3)">ⓘ</span>
              </label>
              <select
                className={inputClass}
                value={feature.rice.impact}
                onChange={e => update({ rice: { ...feature.rice, impact: +e.target.value } })}
              >
                {IMPACT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>
                Confidence
                <span className="ml-1 text-gray-500" title="How confident are you? (50-100%)">ⓘ</span>
              </label>
              <input
                type="number"
                className={inputClass}
                value={feature.rice.confidence}
                onChange={e => update({ rice: { ...feature.rice, confidence: Math.min(100, Math.max(50, +e.target.value)) } })}
                min={50}
                max={100}
              />
            </div>
            <div>
              <label className={labelClass}>
                Effort
                <span className="ml-1 text-gray-500" title="Person-months required">ⓘ</span>
              </label>
              <input
                type="number"
                className={inputClass}
                value={feature.rice.effort}
                onChange={e => update({ rice: { ...feature.rice, effort: Math.max(0.1, +e.target.value) } })}
                min={0.1}
                step={0.5}
              />
            </div>
          </div>
        </div>
      )}

      {framework === 'ice' && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">ICE Scores</h3>
          {(['impact', 'confidence', 'ease'] as const).map(dim => (
            <div key={dim}>
              <label className={labelClass}>
                {dim.charAt(0).toUpperCase() + dim.slice(1)}: {feature.ice[dim]}
                <span className="ml-1 text-gray-500" title={dim === 'ease' ? 'Inverse of effort (10 = easiest)' : `1-10 scale`}>ⓘ</span>
              </label>
              <input
                type="range"
                className="w-full accent-purple-500"
                value={feature.ice[dim]}
                onChange={e => update({ ice: { ...feature.ice, [dim]: +e.target.value } })}
                min={1}
                max={10}
              />
            </div>
          ))}
        </div>
      )}

      {framework === 'value-effort' && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-300">Value vs. Effort</h3>
          {(['value', 'effort'] as const).map(dim => (
            <div key={dim}>
              <label className={labelClass}>
                {dim.charAt(0).toUpperCase() + dim.slice(1)}: {feature.valueEffort[dim]}
              </label>
              <input
                type="range"
                className="w-full accent-purple-500"
                value={feature.valueEffort[dim]}
                onChange={e => update({ valueEffort: { ...feature.valueEffort, [dim]: +e.target.value } })}
                min={1}
                max={10}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={disabled}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-purple-600"
        >
          {isEditing ? 'Update Feature' : 'Add Feature'}
        </button>
        {isEditing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
