import React from 'react';
import { Target, ArrowRight, Award, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import type { Recommendation } from '../types/recommendations';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onAction?: (handler: string) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onAction
}) => {
  const icons = {
    progress: TrendingUp,
    milestone: Award,
    improvement: Target,
    suggestion: ArrowRight
  };

  const Icon = icons[recommendation.type];

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-50">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">{recommendation.title}</h3>
            <p className="text-sm text-gray-600">{recommendation.description}</p>
          </div>
        </div>
        {recommendation.actionable && recommendation.action && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAction?.(recommendation.action!.handler)}
          >
            {recommendation.action.label}
          </Button>
        )}
      </div>
    </Card>
  );
};