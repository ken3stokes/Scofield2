import { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../db/database';
import { RecommendationEngine } from '../services/recommendationEngine';
import type { RecommendationResult } from '../types/recommendations';

export const useRecommendations = () => {
  const [result, setResult] = useState<RecommendationResult>({
    recommendations: [],
    loading: true
  });

  const goals = useLiveQuery(() => db.goals.toArray());

  useEffect(() => {
    if (!goals) return;

    try {
      const recommendations = RecommendationEngine.generateRecommendations(goals);
      setResult({
        recommendations,
        loading: false
      });
    } catch (error) {
      setResult({
        recommendations: [],
        loading: false,
        error: 'Failed to generate recommendations'
      });
    }
  }, [goals]);

  return result;
};