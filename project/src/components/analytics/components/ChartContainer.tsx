import React from 'react';
import { Card } from '../../ui/Card';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => (
  <Card className="p-4">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="h-64">
      {children}
    </div>
  </Card>
);