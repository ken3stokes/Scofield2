import React from 'react';
import { GOAL_CATEGORIES } from '../../../types/goals';
import type { ReportConfig } from '../types';

interface ReportSettingsSectionProps {
  title: string;
  items: Array<{ id: string; label: string }>;
  values: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export const ReportSettingsSection: React.FC<ReportSettingsSectionProps> = ({
  title,
  items,
  values,
  onToggle
}) => (
  <div>
    <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
    <div className="space-y-2">
      {items.map(({ id, label }) => (
        <label key={id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={values[id]}
            onChange={() => onToggle(id)}
            className="rounded border-gray-300 text-[#1B2631] focus:ring-[#1B2631]"
          />
          <span className="text-sm text-gray-700">{label}</span>
        </label>
      ))}
    </div>
  </div>
);