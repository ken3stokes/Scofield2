import { Goal } from '../db/database';

export interface ValidationError {
  field: keyof Goal;
  message: string;
}

export const validateGoal = (goal: Partial<Goal>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!goal.title?.trim()) {
    errors.push({ field: 'title', message: 'Title is required' });
  }

  if (!goal.category) {
    errors.push({ field: 'category', message: 'Category is required' });
  }

  if (!goal.specific?.trim()) {
    errors.push({ field: 'specific', message: 'Specific goal details are required' });
  }

  if (!goal.measurable?.trim()) {
    errors.push({ field: 'measurable', message: 'Measurable criteria are required' });
  }

  if (!goal.achievable?.trim()) {
    errors.push({ field: 'achievable', message: 'Achievable steps are required' });
  }

  if (!goal.relevant?.trim()) {
    errors.push({ field: 'relevant', message: 'Relevance explanation is required' });
  }

  if (!goal.timebound) {
    errors.push({ field: 'timebound', message: 'Target date is required' });
  } else if (goal.timebound < new Date(new Date().setHours(0, 0, 0, 0))) {
    errors.push({ field: 'timebound', message: 'Target date cannot be in the past' });
  }

  return errors;
};