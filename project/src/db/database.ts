import Dexie from 'dexie';
import type { Goal } from './schema/goals';
import type { Project } from './schema/projects';
import { goalsTableSchema } from './schema/goals';
import { projectsTableSchema } from './schema/projects';

export class SmartGoalsDB extends Dexie {
  goals!: Dexie.Table<Goal, number>;
  projects!: Dexie.Table<Project, number>;

  constructor() {
    super('SmartGoalsDB');
    this.version(3).stores({
      goals: goalsTableSchema,
      projects: projectsTableSchema
    });
  }
}

export const db = new SmartGoalsDB();