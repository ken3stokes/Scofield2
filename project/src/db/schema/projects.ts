import { Table } from 'dexie';

export interface Project {
  id?: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'completed' | 'archived';
}

export const projectsTableSchema = '++id, name, status';