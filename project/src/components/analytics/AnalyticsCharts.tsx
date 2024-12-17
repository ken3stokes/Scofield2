import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import { TimelineChart } from './charts/TimelineChart';
import { CategoryDistribution } from './charts/CategoryDistribution';
import { StatusDistribution } from './charts/StatusDistribution';
import { ProgressTrends } from './charts/ProgressTrends';

type ChartView = 'timeline' | 'category' | 'status' | 'progress';

const CHART_OPTIONS = [
  { id: 'timeline', label: 'Timeline' },
  { id: 'category', label: 'Categories' },
  { id: 'status', label: 'Status' },
  { id: 'progress', label: 'Progress' }
] as const;

export const AnalyticsCharts: React.FC = () => {
  const [activeChart, setActiveChart] = useState<ChartView>('timeline');
  const data = useAnalyticsData();

  if (!data) return <div>Loading...</div>;

  const { goals } = data;

  const charts = {
    timeline: <TimelineChart goals={goals} />,
    category: <CategoryDistribution goals={goals} />,
    status: <StatusDistribution goals={goals} />,
    progress: <ProgressTrends goals={goals} />
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Goal Analytics</h3>
        <div className="flex gap-2">
          {CHART_OPTIONS.map(({ id, label }) => (
            <Button
              key={id}
              variant={activeChart === id ? 'primary' : 'outline'}
              onClick={() => setActiveChart(id as ChartView)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[400px]">
        {charts[activeChart]}
      </div>
    </Card>
  );
};