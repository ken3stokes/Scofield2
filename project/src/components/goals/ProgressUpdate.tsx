import React from 'react';
import { Goal } from '../../db/database';
import { Button } from '../ui/Button';
import { getStatusStyles } from '../../utils/statusUtils';

interface ProgressUpdateProps {
  status: Goal['status'];
  progress: number;
  onUpdate: (status: Goal['status'], progress: number) => void;
}

export const ProgressUpdate: React.FC<ProgressUpdateProps> = ({
  status,
  progress,
  onUpdate,
}) => {
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value, 10);
    let newStatus: Goal['status'] = status;

    if (newProgress === 100) {
      newStatus = 'completed';
    } else if (newProgress > 0) {
      newStatus = 'in-progress';
    } else {
      newStatus = 'not-started';
    }

    onUpdate(newStatus, newProgress);
  };

  const statusStyles = getStatusStyles(status);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm text-gray-600">{progress}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{
          '--range-color': statusStyles.color
        } as React.CSSProperties}
      />
      <div className="flex gap-2 mt-4">
        {['not-started', 'in-progress', 'completed'].map((s) => (
          <Button
            key={s}
            variant="outline"
            onClick={() => {
              const newProgress = s === 'completed' ? 100 : progress;
              onUpdate(s as Goal['status'], newProgress);
            }}
            className={`flex-1 ${status === s ? 'bg-gray-100' : ''}`}
          >
            {s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Button>
        ))}
      </div>
    </div>
  );
};