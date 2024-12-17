import React from 'react';
import { getFieldError, getInputClasses } from './formUtils';
import { getSmartPlaceholder } from '../../../utils/smartPlaceholders';
import type { Goal } from '../../../db/schema/goals';
import type { ValidationError } from '../../../utils/validationUtils';

interface SmartFieldsProps {
  goal: Partial<Goal>;
  onChange: (field: keyof Goal, value: any) => void;
  errors: ValidationError[];
}

export const SmartFields: React.FC<SmartFieldsProps> = ({
  goal,
  onChange,
  errors
}) => {
  const renderSmartField = (field: 'specific' | 'measurable' | 'achievable' | 'relevant') => (
    <div key={field}>
      <label className="block text-sm font-medium text-gray-700 capitalize">
        {field}
      </label>
      <textarea
        value={goal[field] || ''}
        onChange={(e) => onChange(field, e.target.value)}
        className={getInputClasses(field, errors)}
        rows={3}
        placeholder={getSmartPlaceholder(field)}
      />
      {getFieldError(field, errors) && (
        <p className="mt-1 text-sm text-red-600">{getFieldError(field, errors)}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {(['specific', 'measurable', 'achievable', 'relevant'] as const).map(renderSmartField)}
    </div>
  );
};