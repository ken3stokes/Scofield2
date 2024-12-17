import { db } from '../database';
import type { Project } from '../schema/projects';

export const projectsRepository = {
  getAll: () => db.projects.toArray(),
  
  getById: (id: number) => db.projects.get(id),
  
  create: async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = new Date();
    return db.projects.add({
      ...project,
      createdAt: timestamp,
      updatedAt: timestamp
    });
  },
  
  update: async (id: number, project: Partial<Project>) => {
    return db.projects.update(id, {
      ...project,
      updatedAt: new Date()
    });
  },
  
  delete: (id: number) => db.projects.delete(id),
  
  getActive: () => 
    db.projects.where('status').equals('active').toArray(),
    
  getCompleted: () =>
    db.projects.where('status').equals('completed').toArray(),
    
  getArchived: () =>
    db.projects.where('status').equals('archived').toArray()
};