import { SMART_CRITERIA } from '../constants/smartCriteria';
import type { Goal } from '../../../db/schema/goals';
import type { SMARTAnalysis, SMARTCriterion } from '../types/analysis';

const analyzeCriterion = (text: string | undefined, keywords: string[]): SMARTCriterion => {
  if (!text) return { score: 0, strength: 'weak', suggestions: ['This field needs to be filled out'] };

  // Calculate base score from keywords
  const keywordScore = keywords.reduce((acc, criterion) => {
    return text.toLowerCase().includes(criterion.toLowerCase()) ? acc + 1 : acc;
  }, 0) / keywords.length;

  // Additional scoring factors
  const lengthScore = Math.min(text.length / 100, 1);
  const sentenceCount = text.split(/[.!?]+/).length - 1;
  const structureScore = Math.min(sentenceCount / 3, 1);

  // Combined score with weights
  const score = (keywordScore * 0.5 + lengthScore * 0.25 + structureScore * 0.25) * 100;
  const strength = score < 40 ? 'weak' : score < 70 ? 'moderate' : 'strong';
  
  return {
    score,
    strength,
    suggestions: generateSuggestions(strength, text, keywords)
  };
};

const generateSuggestions = (strength: string, text: string, keywords: string[]): string[] => {
  const suggestions: string[] = [];

  if (strength === 'weak' || strength === 'moderate') {
    const missingKeywords = keywords.filter(keyword => 
      !text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (missingKeywords.length > 0) {
      suggestions.push(
        `Consider addressing: ${missingKeywords.slice(0, 3).join(', ')}`
      );
    }

    if (text.length < 50) {
      suggestions.push('Add more detail to make your goal clearer');
    }

    if (text.split(/[.!?]+/).length < 2) {
      suggestions.push('Break down your description into multiple points');
    }
  }

  return suggestions;
};

export const analyzeGoal = (goal: Partial<Goal> | null): SMARTAnalysis => {
  if (!goal) {
    return {
      specific: { score: 0, strength: 'weak', suggestions: ['No goal data provided'] },
      measurable: { score: 0, strength: 'weak', suggestions: ['No goal data provided'] },
      achievable: { score: 0, strength: 'weak', suggestions: ['No goal data provided'] },
      relevant: { score: 0, strength: 'weak', suggestions: ['No goal data provided'] },
      timebound: { score: 0, strength: 'weak', suggestions: ['No goal data provided'] },
      overallScore: 0
    };
  }

  const analysis = Object.entries(SMART_CRITERIA).reduce((acc, [key, { keywords }]) => {
    const value = key === 'timebound' 
      ? goal.timebound?.toString() 
      : goal[key as keyof Goal];
      
    acc[key as keyof SMARTAnalysis] = analyzeCriterion(value, keywords);
    return acc;
  }, {} as SMARTAnalysis);

  // Calculate overall score with weighted criteria
  const weights = {
    specific: 0.25,
    measurable: 0.25,
    achievable: 0.2,
    relevant: 0.15,
    timebound: 0.15
  };

  const overallScore = Object.entries(analysis).reduce((acc, [key, criterion]) => {
    return acc + criterion.score * weights[key as keyof typeof weights];
  }, 0);

  return {
    ...analysis,
    overallScore
  };
};