import React from 'react';
import { Line } from 'react-chartjs-2';
import { Goal } from '../../../db/database';
import { COLORS } from '../../../theme/constants';
import { fromISOString } from '../../../utils/dateUtils';

interface ProgressTrendsProps {
  goals: Goal[];
}

export const ProgressTrends: React.FC<ProgressTrendsProps> = ({ goals }) => {
  const sortedGoals = [...goals].sort((a, b) => 
    fromISOString(a.updatedAt).getTime() - fromISOString(b.updatedAt).getTime()
  );

  const data = {
    labels: sortedGoals.map(goal => fromISOString(goal.updatedAt).toLocaleDateString()),
    datasets: [{
      label: 'Average Progress',
      data: sortedGoals.map((_, index) => {
        const currentGoals = sortedGoals.slice(0, index + 1);
        const avgProgress = currentGoals.reduce((sum, g) => sum + g.progress, 0) / (index + 1);
        return avgProgress;
      }),
      borderColor: COLORS.primary,
      backgroundColor: `${COLORS.primary}20`,
      fill: true,
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Average Progress (%)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `Average Progress: ${context.raw.toFixed(1)}%`
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};