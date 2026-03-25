import type { Feature, Framework } from '../types';
import { getPriorityScore, getCategoryColor } from '../types';

interface Props {
  features: Feature[];
  framework: Framework;
  onEdit: (feature: Feature) => void;
  onDelete: (id: string) => void;
}

function formatScore(score: number): string {
  if (score >= 1000) return `${(score / 1000).toFixed(1)}k`;
  return score.toFixed(1);
}

export default function FeatureList({ features, framework, onEdit, onDelete }: Props) {
  const sorted = [...features].sort((a, b) => getPriorityScore(b, framework) - getPriorityScore(a, framework));

  if (sorted.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 text-sm">
        No features yet. Add one above to get started.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-400 mb-3">
        Ranked by {framework.toUpperCase()} Score
      </h3>
      {sorted.map((feature, i) => {
        const score = getPriorityScore(feature, framework);
        return (
          <div
            key={feature.id}
            className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 flex items-center gap-3 group hover:border-gray-600 transition-colors"
          >
            <span className="text-lg font-bold text-gray-600 w-6 text-right shrink-0">
              {i + 1}
            </span>
            {feature.category && (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: getCategoryColor(feature.category) }}
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-200 truncate">{feature.name}</div>
              {feature.description && (
                <div className="text-xs text-gray-500 truncate">{feature.description}</div>
              )}
            </div>
            <span className="text-sm font-mono text-purple-400 shrink-0">
              {formatScore(score)}
            </span>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => onEdit(feature)}
                className="text-xs text-gray-500 hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(feature.id)}
                className="text-xs text-gray-500 hover:text-red-300 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
