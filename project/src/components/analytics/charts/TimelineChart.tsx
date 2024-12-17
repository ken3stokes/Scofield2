import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Goal } from '../../../db/database';
import { COLORS } from '../../../theme/constants';
import { fromISOString, formatDate } from '../../../utils/dateUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface TimelineChartProps {
  goals: Goal[];
}

export const TimelineChart: React.FC<TimelineChartProps> = ({ goals }) => {
  const sortedGoals = [...goals].sort((a, b) => 
    fromISOString(a.timebound).getTime() - fromISOString(b.timebound).getTime()
  );

  const data = {
    labels: sortedGoals.map(goal => fromISOString(goal.timebound)),
    datasets: [
      {
        label: 'Goal Timeline',
        data: sortedGoals.map((_, index) => index + 1),
        borderColor: COLORS.primary,
        backgroundColor: `${COLORS.primary}20`,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
          displayFormats: {
            day: 'MMM d'
          }
        },
        title: {
          display: true,
          text: 'Timeline'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cumulative Goals'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: (items: any[]) => {
            const index = items[0].dataIndex;
            return sortedGoals[index].title;
          },
          label: (item: any) => {
            const index = item.dataIndex;
            return `Due: ${formatDate(sortedGoals[index].timebound)}`;
          }
        }
      }
    }
  };

  return <Line data={data} options={options} />;
};