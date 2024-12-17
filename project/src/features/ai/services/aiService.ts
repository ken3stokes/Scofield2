import { analyzeGoal } from '../utils/smartAnalyzer';
import { generateSuggestions } from '../utils/suggestionEngine';
import { generateMotivationalMessage, analyzeMotivationContext } from '../utils/motivationEngine';
import type { Goal } from '../../../db/schema/goals';
import type { SMARTAnalysis } from '../types/analysis';
import type { SuggestionContext, GoalTemplate } from '../types/suggestions';
import type { GoalCategory } from '../../../types/goals';

/**
 * Central service for managing AI-related functionality
 */
export class AIService {
  /**
   * Analyze a goal using SMART criteria
   */
  static analyzeGoal(goal: Partial<Goal>): SMARTAnalysis {
    return analyzeGoal(goal);
  }

  /**
   * Generate goal suggestions based on context
   */
  static generateSuggestions(
    context: SuggestionContext,
    limit: number = 3
  ): GoalTemplate[] {
    return generateSuggestions(context, limit);
  }

  /**
   * Generate motivational message based on user's goals
   */
  static generateMotivation(goals: Goal[]) {
    const context = analyzeMotivationContext(goals);
    return generateMotivationalMessage(context);
  }

  /**
   * Get category-specific suggestions
   */
  static getCategorySuggestions(
    category: GoalCategory,
    limit: number = 2
  ): GoalTemplate[] {
    return generateSuggestions({ 
      category,
      userGoals: { total: 0, completed: 0, categories: {} }
    }, limit);
  }
}