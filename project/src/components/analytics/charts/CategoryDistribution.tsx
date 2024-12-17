import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Goal } from '../../../db/database';
import { GOAL_CATEGORIES } from '../../../types/goals';
import { COLORS } from '../../../theme/constants';

interface CategoryDistributionProps {
  goals: Goal[];
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ goals }) => {
  const categoryData = Object.entries(GOAL_CATEGORIES).map(([key, { label }]) => ({
    category: key,
    label,
    count: goals.filter(g => g.category === key).length
  }));

  const data = {
    labels: categoryData.map(c => c.label),
    datasets: [
      {
        data: categoryData.map(c => c.count),
        backgroundColor: [
          COLORS.primary,
          COLORS.secondary,
          COLORS.accent,
          COLORS.warning,
          COLORS.success
        ],
        borderWidth: 1
      }
    ]
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

  return <Pie data={data} options={options} />;
};