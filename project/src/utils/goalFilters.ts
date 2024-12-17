import { startOfDay, startOfWeek, startOfMonth, isAfter, isBefore, isToday } from 'date-fns';
import type { Goal } from '../db/schema/goals';
import type { GoalFilters, SortField, SortDirection } from '../types/goals';
import { fromISOString, isValidDate } from './dateUtils';

export const filterGoals = (goals: Goal[], filters: GoalFilters): Goal[] => {
  return goals.filter(goal => {
    // Search filter
    if (filters.search && !goal.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(goal.status)) {
      return false;
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(goal.category)) {
      return false;
    }

    // Timeframe filter
    if (!isValidDate(goal.timebound)) return true;

    const today = startOfDay(new Date());
    const weekStart = startOfWeek(today);
    const monthStart = startOfMonth(today);
    const goalDate = startOfDay(fromISOString(goal.timebound));

    switch (filters.timeframe) {
      case 'overdue':
        return isBefore(goalDate, today) && goal.status !== 'completed';
      case 'today':
        return isToday(goalDate);
      case 'week':
        return isAfter(goalDate, weekStart) || isToday(goalDate);
      case 'month':
        return isAfter(goalDate, monthStart) || isToday(goalDate);
      default:
        return true;
    }
  });
};

export const sortGoals = (goals: Goal[], field: SortField, direction: SortDirection): Goal[] => {
  return [...goals].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'timebound':
        if (!isValidDate(a.timebound) || !isValidDate(b.timebound)) {
          return !isValidDate(a.timebound) ? 1 : -1;
        }
        comparison = fromISOString(a.timebound).getTime() - fromISOString(b.timebound).getTime();
        break;
      case 'progress':
        comparison = a.progress - b.progress;
        break;
      case 'status':
        const statusOrder = { 'not-started': 0, 'in-progress': 1, 'completed': 2 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
        break;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
};