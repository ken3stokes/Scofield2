import React, { createContext, useContext } from 'react';
import { useAIFeatures } from '../hooks/useAIFeatures';
import type { Goal } from '../../../db/schema/goals';
import type { GoalCategory } from '../../../types/goals';

interface AIFeaturesContextValue {
  analysis: any;
  suggestions: any[];
  motivation: {
    message: string;
    type: 'success' | 'warning' | 'info';
  };
  loading: boolean;
  error: string | null;
}

const AIFeaturesContext = createContext<AIFeaturesContextValue>({
  analysis: null,
  suggestions: [],
  motivation: { message: '', type: 'info' },
  loading: false,
  error: null
});

interface AIFeaturesProviderProps {
  goal?: Partial<Goal>;
  category?: GoalCategory;
  children: React.ReactNode;
}

export const AIFeaturesProvider: React.FC<AIFeaturesProviderProps> = ({
  goal,
  category,
  children
}) => {
  const features = useAIFeatures(goal, category);

  return (
    <AIFeaturesContext.Provider value={features}>
      {children}
    </AIFeaturesContext.Provider>
  );
};

export const useAIFeaturesContext = () => {
  const context = useContext(AIFeaturesContext);
  if (!context) {
    throw new Error('useAIFeaturesContext must be used within AIFeaturesProvider');
  }
  return context;
};