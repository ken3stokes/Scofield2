import { db } from '../database';
import type { Goal } from '../schema/goals';
import { toISOString } from '../../utils/dateUtils';

export const goalsRepository = {
  getAll: () => db.goals.toArray(),
  
  getById: (id: number) => db.goals.get(id),
  
  create: async (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = toISOString(new Date());
    return db.goals.add({
      ...goal,
      timebound: typeof goal.timebound === 'string' ? goal.timebound : toISOString(goal.timebound),
      createdAt: timestamp,
      updatedAt: timestamp
    });
  },
  
  update: async (id: number, goal: Partial<Goal>) => {
    const updates: Partial<Goal> = {
      ...goal,
      updatedAt: toISOString(new Date())
    };
    
    // Convert Date objects to ISO strings if present
    if (goal.timebound instanceof Date) {
      updates.timebound = toISOString(goal.timebound);
    }
    
    return db.goals.update(id, updates);
  },
  
  delete: (id: number) => db.goals.delete(id),
  
  getByProject: (projectId: number) => 
    db.goals.where('projectId').equals(projectId).toArray(),
    
  getByCategory: (category: Goal['category']) =>
    db.goals.where('category').equals(category).toArray(),
    
  getByStatus: (status: Goal['status']) =>
    db.goals.where('status').equals(status).toArray(),
    
  updateProgress: async (id: number, progress: number, status: Goal['status']) => {
    return db.goals.update(id, {
      progress,
      status,
      updatedAt: toISOString(new Date())
    });
  }
};