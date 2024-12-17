import React, { useState } from 'react';
import { Search, Filter, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GOAL_CATEGORIES } from '../../types/goals';
import type { GoalFilters } from '../../types/goals';

interface GoalFiltersProps {
  filters: GoalFilters;
  onFilterChange: (filters: GoalFilters) => void;
}

export const GoalFiltersPanel: React.FC<GoalFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const toggleStatus = (status: string) => {
    const newStatuses = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFilterChange({ ...filters, status: newStatuses });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category as any)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category as any];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const setTimeframe = (timeframe: GoalFilters['timeframe']) => {
    onFilterChange({ ...filters, timeframe });
  };

  const activeFiltersCount = 
    filters.status.length + 
    filters.categories.length + 
    (filters.timeframe !== 'all' ? 1 : 0);

  return (
    <Card className="overflow-hidden transition-all duration-300">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search goals..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs">
                {activeFiltersCount}
              </span>
            )}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</h3>
              <div className="flex flex-wrap gap-2">
                {['not-started', 'in-progress', 'completed'].map(status => (
                  <Button
                    key={status}
                    variant={filters.status.includes(status) ? 'primary' : 'outline'}
                    onClick={() => toggleStatus(status)}
                    className="text-sm"
                  >
                    {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(GOAL_CATEGORIES).map(([key, { label }]) => (
                  <Button
                    key={key}
                    variant={filters.categories.includes(key as any) ? 'primary' : 'outline'}
                    onClick={() => toggleCategory(key)}
                    className="text-sm"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Timeframe
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'overdue', label: 'Overdue' },
                  { value: 'today', label: 'Today' },
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' }
                ].map(({ value, label }) => (
                  <Button
                    key={value}
                    variant={filters.timeframe === value ? 'primary' : 'outline'}
                    onClick={() => setTimeframe(value as GoalFilters['timeframe'])}
                    className="text-sm"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};