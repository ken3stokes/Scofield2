import React, { useState } from 'react';
import { FileDown, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import { generateGoalsReport } from '../../utils/reportGenerator';
import { ReportSettings } from './ReportSettings';
import toast from 'react-hot-toast';

export const ReportSection: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const data = useAnalyticsData();

  const handleGenerateReport = () => {
    if (!data?.goals.length) {
      toast.error('No goals available to generate report');
      return;
    }

    try {
      const doc = generateGoalsReport(data.goals);
      doc.save('fox-river-planner-report.pdf');
      toast.success('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Generate Report</h3>
          <p className="text-sm text-gray-600 mt-1">
            Download a detailed PDF report of all your goals and progress
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            icon={<Settings />}
            onClick={() => setShowSettings(!showSettings)}
          >
            Report Settings
          </Button>
          <Button
            variant="primary"
            icon={<FileDown />}
            onClick={handleGenerateReport}
            disabled={!data?.goals.length}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {showSettings && <ReportSettings />}
    </Card>
  );
};