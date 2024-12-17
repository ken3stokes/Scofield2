import { useState, useEffect, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { AIService } from '../services/aiService';
import type { Goal } from '../../../db/schema/goals';
import type { GoalCategory } from '../../../types/goals';
import type { SMARTAnalysis } from '../types/analysis';
import type { GoalTemplate } from '../types/suggestions';

interface AIFeaturesResult {
  analysis: SMARTAnalysis | null;
  suggestions: GoalTemplate[];
  motivation: {
    message: string;
    type: 'success' | 'warning' | 'info';
  };
  loading: boolean;
  error: string | null;
}

export const useAIFeatures = (
  goal?: Partial<Goal>,
  category?: GoalCategory
) => {
  const [result, setResult] = useState<AIFeaturesResult>({
    analysis: null,
    suggestions: [],
    motivation: { message: '', type: 'info' },
    loading: true,
    error: null
  });

  const goals = useLiveQuery(() => db.goals.toArray());

  // Memoize user context to prevent unnecessary recalculations
  const userContext = useMemo(() => {
    if (!goals) return null;
    return {
      total: goals.length,
      completed: goals.filter(g => g.status === 'completed').length,
      categories: goals.reduce((acc, g) => ({
        ...acc,
        [g.category]: (acc[g.category] || 0) + 1
      }), {} as Record<GoalCategory, number>)
    };
  }, [goals]);

  useEffect(() => {
    if (!goals || !userContext) return;

    const loadFeatures = async () => {
      try {
        // Process features in parallel
        const [analysis, suggestions, motivation] = await Promise.all([
          goal ? AIService.analyzeGoal(goal) : Promise.resolve(null),
          AIService.generateSuggestions({
            category,
            userGoals: userContext
          }),
          AIService.generateMotivation(goals)
        ]);

        setResult({
          analysis,
          suggestions,
          motivation,
          loading: false,
          error: null
        });
      } catch (error) {
        setResult(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to process AI features'
        }));
      }
    };

    loadFeatures();
  }, [goals, goal, category, userContext]);

  return result;
};