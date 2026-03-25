import { useState, lazy, Suspense } from 'react';
import type { Feature, Framework } from './types';
import { SAMPLE_FEATURES } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import FeatureForm from './components/FeatureForm';
import FeatureList from './components/FeatureList';
import ExportButton from './components/ExportButton';

const PriorityMatrix = lazy(() => import('./components/PriorityMatrix'));

const FRAMEWORK_OPTIONS: { value: Framework; label: string }[] = [
  { value: 'rice', label: 'RICE' },
  { value: 'ice', label: 'ICE' },
  { value: 'value-effort', label: 'Value vs. Effort' },
];

const MAX_FEATURES = 20;

function App() {
  const [features, setFeatures] = useLocalStorage<Feature[]>('fp-features', SAMPLE_FEATURES);
  const [framework, setFramework] = useLocalStorage<Framework>('fp-framework', 'rice');
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);

  const atLimit = features.length >= MAX_FEATURES;

  const addFeature = (feature: Feature) => {
    if (atLimit) return;
    setFeatures(prev => [...prev, feature]);
  };

  const updateFeature = (updated: Feature) => {
    setFeatures(prev => prev.map(f => (f.id === updated.id ? updated : f)));
    setEditingFeature(null);
  };

  const deleteFeature = (id: string) => {
    setFeatures(prev => prev.filter(f => f.id !== id));
    if (editingFeature?.id === id) setEditingFeature(null);
  };

  const loadSamples = () => {
    setFeatures(SAMPLE_FEATURES);
    setEditingFeature(null);
  };

  const clearAll = () => {
    if (window.confirm('Delete all features? This cannot be undone.')) {
      setFeatures([]);
      setEditingFeature(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Feature Prioritizer</h1>
          <div className="flex items-center gap-1 bg-gray-900 rounded-lg p-1">
            {FRAMEWORK_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setFramework(opt.value)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  framework === opt.value
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 h-[calc(100vh-140px)]">
          {/* Left panel: form + list */}
          <div className="flex flex-col gap-6 overflow-y-auto pr-2">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-gray-300">
                  {editingFeature ? 'Edit Feature' : 'Add Feature'}
                </h2>
                <span className="text-xs text-gray-500">
                  {features.length}/{MAX_FEATURES}
                </span>
              </div>
              {atLimit && !editingFeature && (
                <div className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2 mb-4">
                  Feature limit reached ({MAX_FEATURES}). Delete a feature to add more.
                </div>
              )}
              <FeatureForm
                key={editingFeature?.id ?? 'new'}
                framework={framework}
                onAdd={addFeature}
                editingFeature={editingFeature}
                onUpdate={updateFeature}
                onCancelEdit={() => setEditingFeature(null)}
                disabled={atLimit && !editingFeature}
              />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex-1 min-h-0 overflow-y-auto">
              <FeatureList
                features={features}
                framework={framework}
                onEdit={setEditingFeature}
                onDelete={deleteFeature}
              />
            </div>
          </div>

          {/* Right panel: matrix */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                <div className="animate-pulse">Loading chart...</div>
              </div>
            }>
              <PriorityMatrix features={features} framework={framework} />
            </Suspense>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ExportButton features={features} framework={framework} />
          <div className="flex items-center gap-4">
            <button
              onClick={loadSamples}
              className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Load Samples
            </button>
            <button
              onClick={clearAll}
              disabled={features.length === 0}
              className="text-sm text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
