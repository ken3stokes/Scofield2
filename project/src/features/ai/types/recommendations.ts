import type { Goal } from '../../../db/schema/goals';

export interface Recommendation {
  type: 'progress' | 'milestone' | 'improvement' | 'suggestion';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  action?: {
    label: string;
    handler: string;
  };
}

export interface RecommendationContext {
  recentGoals: Goal[];
  completedGoals: Goal[];
  inProgressGoals: Goal[];
  overallProgress: number;
  lastActivityDate: Date;
}

export interface RecommendationResult {
  recommendations: Recommendation[];
  loading: boolean;
  error?: string;
}