import React from 'react';
import { GOAL_CATEGORIES } from '../../../types/goals';
import { getFieldError, getInputClasses } from './formUtils';
import type { Goal } from '../../../db/schema/goals';
import type { ValidationError } from '../../../utils/validationUtils';

interface BasicInfoFieldsProps {
  goal: Partial<Goal>;
  onChange: (field: keyof Goal, value: any) => void;
  errors: ValidationError[];
}

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  goal,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={goal.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          className={getInputClasses('title', errors)}
          placeholder="Enter a clear and concise title"
        />
        {getFieldError('title', errors) && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('title', errors)}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={goal.category || ''}
          onChange={(e) => onChange('category', e.target.value)}
          className={getInputClasses('category', errors)}
        >
          <option value="">Select a category</option>
          {Object.entries(GOAL_CATEGORIES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        {getFieldError('category', errors) && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('category', errors)}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={goal.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          className={getInputClasses('description', errors)}
          rows={3}
          placeholder="Provide a detailed description of your goal"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Target Date</label>
        <input
          type="date"
          value={goal.timebound instanceof Date ? goal.timebound.toISOString().split('T')[0] : ''}
          onChange={(e) => onChange('timebound', new Date(e.target.value))}
          className={getInputClasses('timebound', errors)}
        />
        {getFieldError('timebound', errors) && (
          <p className="mt-1 text-sm text-red-600">{getFieldError('timebound', errors)}</p>
        )}
      </div>
    </div>
  );
};