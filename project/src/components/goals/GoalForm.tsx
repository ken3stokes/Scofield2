import React, { useState } from 'react';
import { PlusCircle, Save, AlertCircle, X } from 'lucide-react';
import { db } from '../../db/database';
import type { Goal } from '../../db/database';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { GoalFormFields } from './GoalFormFields';
import { MotivationalNudge } from '../../features/ai/components/MotivationalNudge';
import { validateGoal, type ValidationError } from '../../utils/validationUtils';
import toast from 'react-hot-toast';

interface GoalFormProps {
  onComplete: () => void;
}

const initialGoalState: Partial<Goal> = {
  title: '',
  description: '',
  specific: '',
  measurable: '',
  achievable: '',
  relevant: '',
  timebound: new Date(),
  status: 'not-started',
  progress: 0
};

export function GoalForm({ onComplete }: GoalFormProps) {
  const [goal, setGoal] = useState<Partial<Goal>>(initialGoalState);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleFieldChange = (field: keyof Goal, value: any) => {
    setGoal(prev => ({ ...prev, [field]: value }));
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateGoal(goal);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      await db.goals.add({
        ...goal,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Goal);
      toast.success('Goal created successfully!');
      onComplete();
    } catch (error) {
      toast.error('Failed to create goal');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <MotivationalNudge />
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <PlusCircle className="w-6 h-6" />
              Create New Goal
            </h2>
            <Button
              variant="ghost"
              icon={<X />}
              onClick={onComplete}
              className="text-gray-500"
            >
              Cancel
            </Button>
          </div>
          
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <AlertCircle className="w-5 h-5" />
                <h3 className="font-medium">Please fix the following errors:</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-red-700">
                {errors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}

          <GoalFormFields 
            goal={goal} 
            onChange={handleFieldChange}
            errors={errors}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onComplete}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<Save className="w-5 h-5" />}
            >
              Save Goal
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}