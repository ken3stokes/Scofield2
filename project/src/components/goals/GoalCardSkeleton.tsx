import React from 'react';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';

export const GoalCardSkeleton: React.FC = () => {
  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton variant="text" className="w-2/3" />
        <Skeleton variant="text" className="w-20" />
      </div>

      <Skeleton variant="text" className="w-full" />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" className="w-4 h-4" />
          <Skeleton variant="text" className="w-1/3" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton variant="rectangular" className="h-2 flex-1" />
          <Skeleton variant="text" className="w-12" />
        </div>
      </div>

      <Skeleton variant="rectangular" className="h-9" />
    </Card>
  );
};