import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { isOverdue } from '../../../utils/dateUtils';

export const useAnalyticsData = () => {
  const goals = useLiveQuery(() => db.goals.toArray());

  if (!goals) return null;

  const stats = {
    total: goals.length,
    overdue: goals.filter(g => isOverdue(g.timebound) && g.status !== 'completed').length,
    inProgress: goals.filter(g => g.status === 'in-progress').length,
    completed: goals.filter(g => g.status === 'completed').length,
  };

  return {
    goals,
    stats
  };
};