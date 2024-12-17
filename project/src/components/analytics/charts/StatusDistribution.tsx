import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Goal } from '../../../db/database';
import { COLORS } from '../../../theme/constants';

interface StatusDistributionProps {
  goals: Goal[];
}

export const StatusDistribution: React.FC<StatusDistributionProps> = ({ goals }) => {
  const statusCounts = {
    'not-started': goals.filter(g => g.status === 'not-started').length,
    'in-progress': goals.filter(g => g.status === 'in-progress').length,
    'completed': goals.filter(g => g.status === 'completed').length
  };

  const data = {
    labels: ['Not Started', 'In Progress', 'Completed'],
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: [
        COLORS.secondary,
        COLORS.warning,
        COLORS.success
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const total = goals.length;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value} goals (${percentage}%)`;
          }
        }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};