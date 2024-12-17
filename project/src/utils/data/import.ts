import { db } from '../../db/database';
import { validateImportData } from './validation';
import type { ImportResult, ExportData } from './types';

export const importData = async (file: File): Promise<ImportResult> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    if (!validateImportData(data)) {
      return {
        success: false,
        message: 'Invalid backup file format'
      };
    }

    await db.transaction('rw', db.goals, db.projects, async () => {
      // Clear existing data
      await Promise.all([
        db.goals.clear(),
        db.projects.clear()
      ]);
      
      // Import new data
      await Promise.all([
        db.goals.bulkAdd(data.goals),
        db.projects.bulkAdd(data.projects)
      ]);
    });

    return {
      success: true,
      message: 'Data imported successfully',
      data
    };
  } catch (error) {
    console.error('Import failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Import failed'
    };
  }
};