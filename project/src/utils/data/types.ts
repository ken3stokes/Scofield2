import type { Goal } from '../../db/schema/goals';
import type { Project } from '../../db/schema/projects';

export interface ExportData {
  version: number;
  timestamp: string;
  goals: Goal[];
  projects: Project[];
}

export interface ImportResult {
  success: boolean;
  message: string;
  data?: ExportData;
}