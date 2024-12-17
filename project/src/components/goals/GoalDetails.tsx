import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, Calendar, Target, CheckCircle2, AlertCircle, Edit2, Trash2, Save } from 'lucide-react';
import { db, type Goal } from '../../db/database';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { InlineEdit } from '../ui/InlineEdit';
import { formatDate, getDaysRemaining, isOverdue } from '../../utils/dateUtils';
import { getStatusStyles } from '../../utils/statusUtils';
import { GoalFormFields } from './GoalFormFields';
import { validateGoal } from '../../utils/validationUtils';
import { DeleteConfirmation } from '../ui/DeleteConfirmation';
import { ProgressUpdate } from './ProgressUpdate';
import toast from 'react-hot-toast';

interface GoalDetailsProps {
  goalId: number;
  onBack: () => void;
  onEdit: () => void;
  isEditing: boolean;
}

export const GoalDetails: React.FC<GoalDetailsProps> = ({ 
  goalId, 
  onBack, 
  onEdit,
  isEditing 
}) => {
  const goal = useLiveQuery(() => db.goals.get(goalId), [goalId]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Partial<Goal> | null>(null);
  const [errors, setErrors] = useState<any[]>([]);

  if (!goal) return <div>Loading...</div>;

  const currentGoal = editedGoal || goal;
  const statusStyles = getStatusStyles(currentGoal.status);
  const daysRemaining = getDaysRemaining(currentGoal.timebound);
  const overdue = isOverdue(currentGoal.timebound);

  const handleDelete = async () => {
    try {
      await db.goals.delete(goalId);
      toast.success('Goal deleted successfully');
      onBack();
    } catch (error) {
      toast.error('Failed to delete goal');
      console.error(error);
    }
  };

  const handleFieldChange = async (field: keyof Goal, value: any) => {
    try {
      setEditedGoal((prevGoal) => ({ ...prevGoal, [field]: value }));
    } catch (error) {
      toast.error('Failed to update goal');
      console.error(error);
    }
  };

  const handleStatusUpdate = async (newStatus: Goal['status'], newProgress: number) => {
    try {
      setEditedGoal((prevGoal) => ({ ...prevGoal, status: newStatus, progress: newProgress }));
    } catch (error) {
      toast.error('Failed to update progress');
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      const updatedGoal = { ...goal, ...editedGoal };
      const validationErrors = validateGoal(updatedGoal);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
      await db.goals.update(goalId, updatedGoal);
      toast.success('Goal updated successfully');
      onEdit();
    } catch (error) {
      toast.error('Failed to update goal');
      console.error(error);
    }
  };

  const SmartSection = ({ title, content, field }: { 
    title: string; 
    content: string;
    field: keyof Goal;
  }) => (
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h4>
      <InlineEdit
        value={content}
        onChange={(value) => handleFieldChange(field, value)}
        type="textarea"
        className="text-gray-600 dark:text-gray-400"
        placeholder={`Enter ${title.toLowerCase()}`}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" icon={<ArrowLeft />} onClick={onBack}>
            Back to Goals
          </Button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Goal Details</h2>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <Button
              variant="primary"
              icon={<Save />}
              onClick={handleSave}
              className="text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="outline"
              icon={<Edit2 />}
              onClick={onEdit}
              className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Edit
            </Button>
          )}
          <Button
            variant="outline"
            icon={<Trash2 />}
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Delete
          </Button>
        </div>
      </div>

      <Card className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <InlineEdit
              value={currentGoal.title}
              onChange={(value) => handleFieldChange('title', value)}
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
              placeholder="Enter goal title"
            />
            <InlineEdit
              value={currentGoal.description}
              onChange={(value) => handleFieldChange('description', value)}
              type="textarea"
              className="text-gray-600 dark:text-gray-400"
              placeholder="Enter goal description"
            />
          </div>
          <span 
            className="px-3 py-1 text-sm font-medium rounded-full border ml-4"
            style={statusStyles}
          >
            {currentGoal.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SmartSection title="Specific" content={currentGoal.specific} field="specific" />
          <SmartSection title="Measurable" content={currentGoal.measurable} field="measurable" />
          <SmartSection title="Achievable" content={currentGoal.achievable} field="achievable" />
          <SmartSection title="Relevant" content={currentGoal.relevant} field="relevant" />
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium">
                Target Date: {formatDate(currentGoal.timebound)}
              </p>
              {overdue ? (
                <p className="text-red-600 text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" />
                  Overdue by {Math.abs(daysRemaining)} days
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {daysRemaining} days remaining
                </p>
              )}
            </div>
          </div>

          <ProgressUpdate
            status={currentGoal.status}
            progress={currentGoal.progress}
            onUpdate={handleStatusUpdate}
          />
        </div>
      </Card>

      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Goal"
        message="Are you sure you want to delete this goal? This action cannot be undone."
      />
    </div>
  );
};