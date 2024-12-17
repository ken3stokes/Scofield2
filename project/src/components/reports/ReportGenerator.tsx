import React from 'react';
import { FileDown } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db/database';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { generateGoalsReport } from '../../utils/reportGenerator';
import toast from 'react-hot-toast';

export const ReportGenerator = () => {
  const goals = useLiveQuery(() => db.goals.toArray());

  const handleGenerateReport = () => {
    if (!goals?.length) {
      toast.error('No goals available to generate report');
      return;
    }

    try {
      const doc = generateGoalsReport(goals);
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
        <Button
          variant="primary"
          icon={<FileDown />}
          onClick={handleGenerateReport}
          disabled={!goals?.length}
        >
          Generate Report
        </Button>
      </div>
    </Card>
  );
};