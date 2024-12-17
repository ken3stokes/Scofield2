import React from 'react';
import { BasicInfoFields } from './form/BasicInfoFields';
import { SmartFields } from './form/SmartFields';
import { SmartAnalysis } from '../../features/ai/components/SmartAnalysis';
import { analyzeGoal } from '../../features/ai/utils/smartAnalyzer';
import type { Goal } from '../../db/schema/goals';
import type { ValidationError } from '../../utils/validationUtils';

interface GoalFormFieldsProps {
  goal: Partial<Goal>;
  onChange: (field: keyof Goal, value: any) => void;
  errors: ValidationError[];
}

export const GoalFormFields: React.FC<GoalFormFieldsProps> = ({ 
  goal, 
  onChange,
  errors 
}) => {
  const analysis = analyzeGoal(goal);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BasicInfoFields goal={goal} onChange={onChange} errors={errors} />
        <SmartFields goal={goal} onChange={onChange} errors={errors} />
      </div>

      <div className="mt-6">
        <SmartAnalysis analysis={analysis} />
      </div>
    </div>
  );
};