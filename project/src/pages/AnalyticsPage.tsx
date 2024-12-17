import React from 'react';
import { BarChart2, FileDown } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AnalyticsCharts } from '../components/analytics/AnalyticsCharts';
import { AnalyticsSummary } from '../components/analytics/AnalyticsSummary';
import { ReportSection } from '../components/analytics/ReportSection';
import { DataManagement } from '../components/data/DataManagement';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart2 className="w-6 h-6" />
          Analytics & Reports
        </h2>
      </div>

      <AnalyticsSummary />
      <AnalyticsCharts />
      <ReportSection />
      <DataManagement />
    </div>
  );
};