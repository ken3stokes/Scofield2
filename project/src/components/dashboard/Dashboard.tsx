import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Target, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { db } from '../../db/database';
import { Card } from '../ui/Card';
import { DashboardCharts } from './DashboardCharts';
import { isOverdue } from '../../utils/dateUtils';
import { COLORS } from '../../theme/constants';

const StatCard = ({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) => (
  <Card className="p-4">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  </Card>
);

export const Dashboard = () => {
  const goals = useLiveQuery(() => db.goals.toArray());

  if (!goals) return <div>Loading...</div>;

  const stats = {
    total: goals.length,
    overdue: goals.filter(g => isOverdue(g.timebound) && g.status !== 'completed').length,
    inProgress: goals.filter(g => g.status === 'in-progress').length,
    completed: goals.filter(g => g.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Target className="w-6 h-6" />
        Dashboard Overview
      </h2>

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

      <DashboardCharts goals={goals} />
    </div>
  );
};