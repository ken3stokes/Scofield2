import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { generateSuggestions } from '../utils/suggestionEngine';
import type { GoalCategory } from '../../../types/goals';
import type { SuggestionResult, SuggestionContext } from '../types/suggestions';

export const useGoalSuggestions = (category?: GoalCategory): SuggestionResult => {
  const [result, setResult] = useState<SuggestionResult>({
    suggestions: [],
    loading: true
  });

  const goals = useLiveQuery(() => db.goals.toArray());

  useEffect(() => {
    if (!goals) return;

    try {
      // Analyze user's current goals
      const context: SuggestionContext = {
        category,
        userGoals: {
          total: goals.length,
          completed: goals.filter(g => g.status === 'completed').length,
          categories: goals.reduce((acc, goal) => ({
            ...acc,
            [goal.category]: (acc[goal.category] || 0) + 1
          }), {} as Record<GoalCategory, number>)
        }
      };

      // Generate suggestions based on context
      const suggestions = generateSuggestions(context);

      setResult({
        suggestions,
        loading: false
      });
    } catch (error) {
      setResult({
        suggestions: [],
        loading: false,
        error: 'Failed to generate suggestions'
      });
    }
  }, [goals, category]);

  return result;
};