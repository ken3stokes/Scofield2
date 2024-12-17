import React from 'react';
import { Card } from '../../ui/Card';
import type { StatCardProps } from '../types';

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  color
}) => (
  <Card className="p-4">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-6 h-6" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  </Card>
);