import type { ExportData } from './types';

export const validateImportData = (data: any): data is ExportData => {
  if (!data || typeof data !== 'object') return false;
  
  // Check required properties
  const requiredProps = ['version', 'timestamp', 'goals', 'projects'];
  if (!requiredProps.every(prop => prop in data)) return false;
  
  // Validate version
  if (typeof data.version !== 'number' || data.version < 1) return false;
  
  // Validate timestamp
  if (!Date.parse(data.timestamp)) return false;
  
  // Validate goals and projects are arrays
  if (!Array.isArray(data.goals) || !Array.isArray(data.projects)) return false;
  
  // Validate goals structure
  const validGoal = (goal: any) => {
    return goal.title && 
           goal.category && 
           goal.status && 
           goal.progress !== undefined &&
           goal.timebound;
  };
  
  // Validate projects structure
  const validProject = (project: any) => {
    return project.name && 
           project.status && 
           project.description;
  };
  
  return data.goals.every(validGoal) && data.projects.every(validProject);
};