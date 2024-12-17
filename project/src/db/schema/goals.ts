import { Table } from 'dexie';
import type { GoalCategory } from '../../types/goals';

export interface Goal {
  id?: number;
  title: string;
  description: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timebound: string; // Store as ISO string
  createdAt: string; // Store as ISO string
  updatedAt: string; // Store as ISO string
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  projectId?: number;
  category: GoalCategory;
  tags: string[];
}

export const goalsTableSchema = '++id, title, status, projectId, timebound, category, *tags';