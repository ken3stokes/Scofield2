import React from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import { RecommendationCard } from './RecommendationCard';

export const RecommendationsList: React.FC = () => {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div>Failed to load recommendations</div>;
  if (!recommendations.length) return null;

  const handleAction = (handler: string) => {
    // Implement action handlers
    console.log('Action handler:', handler);
  };

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation, index) => (
        <RecommendationCard
          key={index}
          recommendation={recommendation}
          onAction={handleAction}
        />
      ))}
    </div>
  );
};