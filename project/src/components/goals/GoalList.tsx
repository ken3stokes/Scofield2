import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Target, PlusCircle } from 'lucide-react';
import { db } from '../../db/database';
import { GoalCard } from './GoalCard';
import { GoalDetails } from './GoalDetails';
import { GoalFiltersPanel } from './GoalFilters';
import { GoalSort } from './GoalSort';
import { GoalForm } from './GoalForm';
import { GoalCardSkeleton } from './GoalCardSkeleton';
import { Button } from '../ui/Button';
import { filterGoals, sortGoals } from '../../utils/goalFilters';
import type { GoalFilters, SortField, SortDirection } from '../../types/goals';

interface GoalListProps {
  onCreateNew: () => void;
}

export function GoalList({ onCreateNew }: GoalListProps) {
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<GoalFilters>({
    search: '',
    status: [],
    categories: [],
    timeframe: 'all'
  });
  const [sortField, setSortField] = useState<SortField>('timebound');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const goals = useLiveQuery(() => db.goals.toArray());

  const handleViewDetails = (goalId: number) => {
    setSelectedGoalId(goalId);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleBack = () => {
    setSelectedGoalId(null);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleCreateNew = () => {
    setShowForm(true);
    setSelectedGoalId(null);
    setIsEditing(false);
  };

  const handleFormComplete = () => {
    setShowForm(false);
  };

  if (!goals) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Target className="w-6 h-6" />
            The Plan
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <GoalCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (showForm) {
    return <GoalForm onComplete={handleFormComplete} />;
  }

  if (selectedGoalId) {
    return (
      <GoalDetails
        goalId={selectedGoalId}
        onBack={handleBack}
        onEdit={() => setIsEditing(true)}
        isEditing={isEditing}
      />
    );
  }

  const filteredGoals = filterGoals(goals, filters);
  const sortedGoals = sortGoals(filteredGoals, sortField, sortDirection);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Target className="w-6 h-6" />
          The Plan
        </h2>
        <div className="flex gap-4">
          <GoalSort
            field={sortField}
            direction={sortDirection}
            onSort={(field, direction) => {
              setSortField(field);
              setSortDirection(direction);
            }}
          />
          <Button
            variant="primary"
            icon={<PlusCircle />}
            onClick={handleCreateNew}
          >
            Create New Goal
          </Button>
        </div>
      </div>

      <GoalFiltersPanel
        filters={filters}
        onFilterChange={setFilters}
      />

      {sortedGoals.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed">
          <Target className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">No goals found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating your first goal
          </p>
          <Button
            variant="primary"
            icon={<PlusCircle />}
            onClick={handleCreateNew}
            className="mt-4"
          >
            Create New Goal
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}