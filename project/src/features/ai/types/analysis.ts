export interface SMARTAnalysis {
  specific: SMARTCriterion;
  measurable: SMARTCriterion;
  achievable: SMARTCriterion;
  relevant: SMARTCriterion;
  timebound: SMARTCriterion;
  overallScore: number;
}

export interface SMARTCriterion {
  score: number;
  suggestions: string[];
  strength: 'weak' | 'moderate' | 'strong';
}

export interface AnalysisResult {
  analysis: SMARTAnalysis;
  suggestions: string[];
}