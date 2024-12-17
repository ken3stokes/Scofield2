import { MOTIVATION_PATTERNS, CONTEXT_TRIGGERS } from '../constants/motivationalPatterns';
import type { Goal } from '../../../db/schema/goals';
import { isAfter, differenceInDays } from 'date-fns';

interface MotivationContext {
  recentProgress: number;
  completedCount: number;
  lastActivityDays: number;
  consistentDays: number;
}

export const analyzeMotivationContext = (goals: Goal[]): MotivationContext => {
  const now = new Date();
  const recentGoals = goals.filter(goal => 
    isAfter(new Date(goal.updatedAt), new Date(now.setDate(now.getDate() - 30)))
  );

  return {
    recentProgress: calculateAverageProgress(recentGoals),
    completedCount: countRecentCompletions(recentGoals),
    lastActivityDays: calculateLastActivity(goals),
    consistentDays: calculateConsistentDays(goals)
  };
};

const calculateAverageProgress = (goals: Goal[]): number => {
  if (!goals.length) return 0;
  return goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length;
};

const countRecentCompletions = (goals: Goal[]): number => {
  return goals.filter(goal => goal.status === 'completed').length;
};

const calculateLastActivity = (goals: Goal[]): number => {
  if (!goals.length) return 0;
  
  const lastUpdate = Math.max(
    ...goals.map(goal => new Date(goal.updatedAt).getTime())
  );
  return differenceInDays(new Date(), new Date(lastUpdate));
};

const calculateConsistentDays = (goals: Goal[]): number => {
  if (!goals.length) return 0;

  const activityDates = goals
    .map(goal => new Date(goal.updatedAt).toDateString())
    .sort()
    .filter((date, index, array) => array.indexOf(date) === index);

  let maxStreak = 0;
  let currentStreak = 0;

  for (let i = 1; i < activityDates.length; i++) {
    const diff = differenceInDays(
      new Date(activityDates[i]),
      new Date(activityDates[i - 1])
    );

    if (diff === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  return maxStreak;
};

export const generateMotivationalMessage = (context: MotivationContext): {
  message: string;
  type: 'success' | 'warning' | 'info';
} => {
  const {
    recentProgress,
    completedCount,
    lastActivityDays,
    consistentDays
  } = context;

  // Priority-based message selection
  if (lastActivityDays >= CONTEXT_TRIGGERS.inactivityDays) {
    return {
      message: selectRandomMessage(MOTIVATION_PATTERNS.recovery),
      type: 'warning'
    };
  }

  if (consistentDays >= CONTEXT_TRIGGERS.consistencyDays) {
    return {
      message: selectRandomMessage(MOTIVATION_PATTERNS.streak)
        .replace('{days}', consistentDays.toString()),
      type: 'success'
    };
  }

  if (completedCount >= CONTEXT_TRIGGERS.milestoneCount) {
    return {
      message: selectRandomMessage(MOTIVATION_PATTERNS.milestone)
        .replace('{count}', completedCount.toString()),
      type: 'success'
    };
  }

  if (recentProgress >= CONTEXT_TRIGGERS.highProgress) {
    return {
      message: selectRandomMessage(MOTIVATION_PATTERNS.progress)
        .replace('{progress}', Math.round(recentProgress * 100).toString()),
      type: 'success'
    };
  }

  return {
    message: selectRandomMessage(MOTIVATION_PATTERNS.encouragement),
    type: 'info'
  };
};

const selectRandomMessage = (messages: readonly string[]): string => {
  return messages[Math.floor(Math.random() * messages.length)];
};