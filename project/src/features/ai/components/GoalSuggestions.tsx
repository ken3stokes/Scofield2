import React from 'react';
import { Target, ArrowRight } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useGoalSuggestions } from '../hooks/useGoalSuggestions';
import type { GoalCategory } from '../../../types/goals';

interface GoalSuggestionsProps {
  category?: GoalCategory;
  onSelect: (suggestion: any) => void;
}

export const GoalSuggestions: React.FC<GoalSuggestionsProps> = ({
  category,
  onSelect
}) => {
  const { suggestions, loading } = useGoalSuggestions(category);

  if (loading) return <div>Loading suggestions...</div>;

  return (
    <Card className="p-4 space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Target className="w-5 h-5" />
        Suggested Goals
      </h3>

      <div className="grid gap-4">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{suggestion.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                icon={<ArrowRight />}
                onClick={() => onSelect(suggestion)}
              >
                Use Template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};