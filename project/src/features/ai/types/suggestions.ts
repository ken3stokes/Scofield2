import type { GoalCategory } from '../../../types/goals';

export interface GoalTemplate {
  title: string;
  description: string;
  template: {
    specific: string;
    measurable: string;
    achievable: string;
    relevant: string;
    category: GoalCategory;
  };
}

export interface SuggestionContext {
  category?: GoalCategory;
  userGoals: {
    total: number;
    completed: number;
    categories: Record<GoalCategory, number>;
  };
}

export interface SuggestionResult {
  suggestions: GoalTemplate[];
  loading: boolean;
  error?: string;
}