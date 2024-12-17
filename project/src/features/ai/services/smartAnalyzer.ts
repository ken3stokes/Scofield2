import { MistralClient } from './mistralClient';
import { generateSmartAnalysisPrompt } from '../prompts/smartAnalysis';
import type { Goal } from '../../../db/schema/goals';
import type { SMARTAnalysis } from '../types/analysis';

export class SmartAnalyzer {
  static async analyzeGoal(goal: Partial<Goal>): Promise<SMARTAnalysis> {
    try {
      const messages = [
        {
          role: 'system' as const,
          content: 'You are an AI assistant specialized in SMART goal analysis.'
        },
        {
          role: 'user' as const,
          content: generateSmartAnalysisPrompt(goal)
        }
      ];

      const response = await MistralClient.generateCompletion(messages);
      return JSON.parse(response);
    } catch (error) {
      console.error('Smart Analysis Error:', error);
      throw new Error('Failed to analyze goal');
    }
  }
}