import React, { useRef } from 'react';
import { Download, Upload, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { downloadExport } from '../../utils/data/export';
import { importData } from '../../utils/data/import';
import toast from 'react-hot-toast';

export const DataManagement: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      await downloadExport();
      toast.success('Data exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Failed to export data');
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await importData(file);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Import failed:', error);
      toast.error('Failed to import data');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Data Management</h3>
          <p className="text-sm text-gray-600">Export or import your goals and projects</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          icon={<Download />}
          onClick={handleExport}
        >
          Export Data
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        
        <Button
          variant="outline"
          icon={<Upload />}
          onClick={() => fileInputRef.current?.click()}
        >
          Import Data
        </Button>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg flex gap-2">
        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          Regularly export your data to prevent loss when clearing browser data. 
          Your goals and progress are stored locally in your browser.
        </p>
      </div>
    </Card>
  );
};