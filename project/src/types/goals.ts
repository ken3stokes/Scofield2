export type GoalCategory = 'financial' | 'health' | 'business' | 'personal-development';

export type SortField = 'title' | 'timebound' | 'progress' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface GoalFilters {
  search: string;
  status: string[];
  categories: GoalCategory[];
  timeframe: 'all' | 'overdue' | 'today' | 'week' | 'month';
}

export const GOAL_CATEGORIES: Record<GoalCategory, { label: string; description: string }> = {
  financial: {
    label: 'Financial',
    description: 'Money management and financial objectives'
  },
  health: {
    label: 'Health',
    description: 'Physical and mental well-being goals'
  },
  business: {
    label: 'Business',
    description: 'Professional and entrepreneurial targets'
  },
  'personal-development': {
    label: 'Personal Development',
    description: 'Self-improvement and skill enhancement'
  }
};