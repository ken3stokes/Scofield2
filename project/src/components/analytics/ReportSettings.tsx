import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { ReportSettingsSection } from './components/ReportSettingsSection';
import { useReportSettings } from './hooks/useReportSettings';
import { GOAL_CATEGORIES } from '../../types/goals';

export const ReportSettings: React.FC = () => {
  const { config, toggleSection, toggleCategory, resetSettings } = useReportSettings();

  const sectionItems = [
    { id: 'summary', label: 'Summary Statistics' },
    { id: 'goals', label: 'Goals List' },
    { id: 'categories', label: 'Category Distribution' },
    { id: 'progress', label: 'Progress Charts' }
  ];

  const categoryItems = Object.entries(GOAL_CATEGORIES).map(([key, { label }]) => ({
    id: key,
    label
  }));

  return (
    <div className="mt-6 space-y-4 border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Report Settings</h3>
        <Button
          variant="outline"
          size="sm"
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={resetSettings}
        >
          Reset Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReportSettingsSection
          title="Include Sections"
          items={sectionItems}
          values={config.sections}
          onToggle={toggleSection}
        />

        <ReportSettingsSection
          title="Filter by Category"
          items={categoryItems}
          values={config.categories}
          onToggle={toggleCategory}
        />
      </div>
    </div>
  );
};