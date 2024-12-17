import { useLiveQuery } from 'dexie-react-hooks';
import { goalsRepository } from '../repositories/goals';
import type { Goal } from '../schema/goals';

export const useGoals = () => {
  const goals = useLiveQuery(() => goalsRepository.getAll());
  
  return {
    goals,
    loading: goals === undefined,
    error: goals === null
  };
};

export const useGoal = (id: number) => {
  const goal = useLiveQuery(() => goalsRepository.getById(id), [id]);
  
  return {
    goal,
    loading: goal === undefined,
    error: goal === null
  };
};

export const useGoalsByCategory = (category: Goal['category']) => {
  const goals = useLiveQuery(() => goalsRepository.getByCategory(category), [category]);
  
  return {
    goals,
    loading: goals === undefined,
    error: goals === null
  };
};

export const useGoalsByStatus = (status: Goal['status']) => {
  const goals = useLiveQuery(() => goalsRepository.getByStatus(status), [status]);
  
  return {
    goals,
    loading: goals === undefined,
    error: goals === null
  };
};