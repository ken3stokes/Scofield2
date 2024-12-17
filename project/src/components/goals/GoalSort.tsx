import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import type { SortField, SortDirection } from '../../types/goals';

interface GoalSortProps {
  field: SortField;
  direction: SortDirection;
  onSort: (field: SortField, direction: SortDirection) => void;
}

export const GoalSort: React.FC<GoalSortProps> = ({
  field,
  direction,
  onSort,
}) => {
  const sortFields: Array<{ value: SortField; label: string }> = [
    { value: 'title', label: 'Title' },
    { value: 'timebound', label: 'Due Date' },
    { value: 'progress', label: 'Progress' },
    { value: 'status', label: 'Status' }
  ];

  const handleSort = (newField: SortField) => {
    const newDirection = field === newField && direction === 'asc' ? 'desc' : 'asc';
    onSort(newField, newDirection);
  };

  const SortIcon = ({ currentField }: { currentField: SortField }) => {
    if (field !== currentField) return <ArrowUpDown className="w-4 h-4" />;
    return direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      {sortFields.map(({ value, label }) => (
        <Button
          key={value}
          variant={field === value ? 'primary' : 'outline'}
          onClick={() => handleSort(value)}
          className="text-sm flex items-center gap-1"
        >
          {label}
          <SortIcon currentField={value} />
        </Button>
      ))}
    </div>
  );
};