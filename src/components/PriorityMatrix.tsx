import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import type { Feature, Framework } from '../types';
import { getMatrixCoords, getCategoryColor } from '../types';

interface Props {
  features: Feature[];
  framework: Framework;
}

function getAxisLabels(framework: Framework): { x: string; y: string } {
  switch (framework) {
    case 'rice':
      return { x: 'Effort (person-months)', y: 'Value (Reach × Impact × Confidence)' };
    case 'ice':
      return { x: 'Difficulty (inverse of Ease)', y: 'Impact × Confidence' };
    case 'value-effort':
      return { x: 'Effort', y: 'Value' };
  }
}

interface DataPoint {
  x: number;
  y: number;
  name: string;
  category: string;
  fill: string;
}

export default function PriorityMatrix({ features, framework }: Props) {
  const labels = getAxisLabels(framework);

  const data: DataPoint[] = features.map(f => {
    const coords = getMatrixCoords(f, framework);
    return {
      ...coords,
      name: f.name,
      category: f.category,
      fill: getCategoryColor(f.category),
    };
  });

  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  const xMid = xValues.length > 0 ? (Math.min(...xValues) + Math.max(...xValues)) / 2 : 5;
  const yMid = yValues.length > 0 ? (Math.min(...yValues) + Math.max(...yValues)) / 2 : 5;

  if (features.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm">
        Add features to see them plotted here
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="x"
              name={labels.x}
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            >
              <Label value={labels.x} position="bottom" offset={20} fill="#6b7280" fontSize={12} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              name={labels.y}
              stroke="#6b7280"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            >
              <Label value={labels.y} angle={-90} position="insideLeft" offset={10} fill="#6b7280" fontSize={12} style={{ textAnchor: 'middle' }} />
            </YAxis>
            <ReferenceLine x={xMid} stroke="#4b5563" strokeDasharray="4 4" />
            <ReferenceLine y={yMid} stroke="#4b5563" strokeDasharray="4 4" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3', stroke: '#6b7280' }}
              content={({ payload }) => {
                if (!payload?.[0]) return null;
                const d = payload[0].payload as DataPoint;
                return (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 shadow-lg">
                    <div className="text-sm font-medium text-gray-200">{d.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {labels.x}: {d.x.toFixed(1)} · {labels.y}: {d.y.toFixed(1)}
                    </div>
                  </div>
                );
              }}
            />
            <Scatter data={data} fill="#8b5cf6" r={8} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 text-xs text-gray-500 mt-2 px-4 gap-y-1">
        <span className="text-left">↑← Quick Wins</span>
        <span className="text-right">↑→ Big Bets</span>
        <span className="text-left">↓← Fill-Ins</span>
        <span className="text-right">↓→ Money Pit</span>
      </div>
    </div>
  );
}
