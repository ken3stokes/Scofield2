import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Goal } from '../../db/database';
import { formatDate, getDaysRemaining } from '../../utils/dateUtils';
import { getStatusStyles } from '../../utils/statusUtils';

interface GoalCardProps {
  goal: Goal;
  onViewDetails: (goalId: number) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onViewDetails }) => {
  const statusStyles = getStatusStyles(goal.status);
  const daysRemaining = getDaysRemaining(goal.timebound);

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
        <span 
          className="px-2 py-1 text-xs font-medium rounded-full border"
          style={statusStyles}
        >
          {goal.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm">{goal.description}</p>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Due: {formatDate(goal.timebound)}</span>
          {daysRemaining > 0 && (
            <span className="text-xs">({daysRemaining} days remaining)</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${goal.progress}%`,
                backgroundColor: statusStyles.color
              }}
            />
          </div>
          <span className="text-sm text-gray-600">{goal.progress}%</span>
        </div>
      </div>

      <Button
        variant="outline"
        icon={<ArrowRight />}
        onClick={() => goal.id && onViewDetails(goal.id)}
        className="w-full"
      >
        View Details
      </Button>
    </Card>
  );
};