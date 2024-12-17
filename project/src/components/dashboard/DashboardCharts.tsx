import React from 'react';
import { Card } from '../ui/Card';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Goal } from '../../db/database';
import { GOAL_CATEGORIES } from '../../types/goals';
import { COLORS } from '../../theme/constants';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardChartsProps {
  goals: Goal[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ goals }) => {
  // Status distribution data
  const statusData = {
    labels: ['Not Started', 'In Progress', 'Completed'],
    datasets: [{
      data: [
        goals.filter(g => g.status === 'not-started').length,
        goals.filter(g => g.status === 'in-progress').length,
        goals.filter(g => g.status === 'completed').length
      ],
      backgroundColor: [
        COLORS.secondary,
        COLORS.warning,
        COLORS.success
      ]
    }]
  };

  // Category distribution data
  const categoryData = {
    labels: Object.values(GOAL_CATEGORIES).map(c => c.label),
    datasets: [{
      label: 'Goals by Category',
      data: Object.keys(GOAL_CATEGORIES).map(category =>
        goals.filter(g => g.category === category).length
      ),
      backgroundColor: [
        COLORS.primary,
        COLORS.secondary,
        COLORS.accent,
        COLORS.warning,
        COLORS.success
      ]
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Goal Status Distribution</h3>
        <div className="h-64">
          <Pie data={statusData} options={chartOptions} />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Goals by Category</h3>
        <div className="h-64">
          <Bar data={categoryData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};