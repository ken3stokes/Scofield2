import React from 'react';
import { Target, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import { COLORS } from '../../theme/constants';

export const AnalyticsSummary: React.FC = () => {
  const data = useAnalyticsData();

  if (!data) return null;

  const { stats } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={Target}
        label="Total Goals"
        value={stats.total}
        color={COLORS.primary}
      />
      <StatCard
        icon={AlertCircle}
        label="Overdue"
        value={stats.overdue}
        color={COLORS.accent}
      />
      <StatCard
        icon={Clock}
        label="In Progress"
        value={stats.inProgress}
        color={COLORS.warning}
      />
      <StatCard
        icon={CheckCircle}
        label="Completed"
        value={stats.completed}
        color={COLORS.success}
      />
    </div>
  );
};