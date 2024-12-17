import { db } from '../../db/database';
import type { ExportData } from './types';

export const exportData = async (): Promise<Blob> => {
  const [goals, projects] = await Promise.all([
    db.goals.toArray(),
    db.projects.toArray()
  ]);

  const exportData: ExportData = {
    version: 1,
    timestamp: new Date().toISOString(),
    goals,
    projects
  };

  return new Blob(
    [JSON.stringify(exportData, null, 2)],
    { type: 'application/json' }
  );
};

export const downloadExport = async (filename = 'scofield-backup') => {
  const blob = await exportData();
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};