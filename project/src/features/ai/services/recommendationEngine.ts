import { isAfter, subDays } from 'date-fns';
import type { Goal } from '../../../db/schema/goals';
import type { Recommendation, RecommendationContext } from '../types/recommendations';
import { fromISOString } from '../../../utils/dateUtils';

export class RecommendationEngine {
  static generateRecommendations(goals: Goal[]): Recommendation[] {
    const context = this.analyzeContext(goals);
    const recommendations: Recommendation[] = [];

    // Progress-based recommendations
    if (context.inProgressGoals.length > 0) {
      recommendations.push(...this.generateProgressRecommendations(context));
    }

    // Milestone recommendations
    if (context.completedGoals.length > 0) {
      recommendations.push(...this.generateMilestoneRecommendations(context));
    }

    // Improvement recommendations
    if (context.overallProgress < 50) {
      recommendations.push(...this.generateImprovementRecommendations(context));
    }

    return this.prioritizeRecommendations(recommendations);
  }

  private static analyzeContext(goals: Goal[]): RecommendationContext {
    const now = new Date();
    const recentGoals = goals.filter(goal => 
      isAfter(fromISOString(goal.updatedAt), subDays(now, 30))
    );

    return {
      recentGoals,
      completedGoals: goals.filter(g => g.status === 'completed'),
      inProgressGoals: goals.filter(g => g.status === 'in-progress'),
      overallProgress: this.calculateOverallProgress(goals),
      lastActivityDate: this.getLastActivityDate(goals)
    };
  }

  private static generateProgressRecommendations(
    context: RecommendationContext
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    const stuckGoals = context.inProgressGoals.filter(g => g.progress < 30);
    if (stuckGoals.length > 0) {
      recommendations.push({
        type: 'improvement',
        title: 'Goals Needing Attention',
        description: `You have ${stuckGoals.length} goals with low progress. Consider breaking them down into smaller tasks.`,
        priority: 'high',
        actionable: true,
        action: {
          label: 'Review Goals',
          handler: 'reviewLowProgressGoals'
        }
      });
    }

    const nearCompletion = context.inProgressGoals.filter(g => g.progress >= 80);
    if (nearCompletion.length > 0) {
      recommendations.push({
        type: 'progress',
        title: 'Almost There!',
        description: `You're close to completing ${nearCompletion.length} goals. Push through to the finish line!`,
        priority: 'medium',
        actionable: true,
        action: {
          label: 'View Goals',
          handler: 'viewNearCompletionGoals'
        }
      });
    }

    return recommendations;
  }

  private static generateMilestoneRecommendations(
    context: RecommendationContext
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    const recentCompletions = context.completedGoals.filter(goal =>
      isAfter(fromISOString(goal.updatedAt), subDays(new Date(), 7))
    );

    if (recentCompletions.length > 0) {
      recommendations.push({
        type: 'milestone',
        title: 'Recent Achievements',
        description: `Congratulations! You've completed ${recentCompletions.length} goals recently.`,
        priority: 'medium',
        actionable: false
      });
    }

    return recommendations;
  }

  private static generateImprovementRecommendations(
    context: RecommendationContext
  ): Recommendation[] {
    return [{
      type: 'improvement',
      title: 'Boost Your Progress',
      description: 'Your overall progress is below 50%. Here are some strategies to help you move forward.',
      priority: 'high',
      actionable: true,
      action: {
        label: 'View Strategies',
        handler: 'viewProgressStrategies'
      }
    }];
  }

  private static calculateOverallProgress(goals: Goal[]): number {
    if (!goals.length) return 0;
    return goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;
  }

  private static getLastActivityDate(goals: Goal[]): Date {
    if (!goals.length) return new Date();
    return new Date(Math.max(...goals.map(g => new Date(g.updatedAt).getTime())));
  }

  private static prioritizeRecommendations(
    recommendations: Recommendation[]
  ): Recommendation[] {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return recommendations.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }
}