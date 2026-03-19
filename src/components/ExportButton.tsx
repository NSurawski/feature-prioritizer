import type { Feature, Framework } from '../types';
import { getPriorityScore } from '../types';

interface Props {
  features: Feature[];
  framework: Framework;
}

function frameworkLabel(fw: Framework): string {
  switch (fw) {
    case 'rice': return 'RICE';
    case 'ice': return 'ICE';
    case 'value-effort': return 'Value vs. Effort';
  }
}

export default function ExportButton({ features, framework }: Props) {
  const copyMarkdown = () => {
    const sorted = [...features].sort((a, b) => getPriorityScore(b, framework) - getPriorityScore(a, framework));
    const lines = [
      `## Feature Prioritization (${frameworkLabel(framework)})`,
      '',
      '| # | Feature | Score |',
      '|---|---------|-------|',
      ...sorted.map((f, i) => `| ${i + 1} | ${f.name} | ${getPriorityScore(f, framework).toFixed(1)} |`),
    ];
    navigator.clipboard.writeText(lines.join('\n'));
  };

  return (
    <button
      onClick={copyMarkdown}
      disabled={features.length === 0}
      className="text-sm text-gray-400 hover:text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      Copy as Markdown
    </button>
  );
}
