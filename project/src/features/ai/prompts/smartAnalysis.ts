import type { Goal } from '../../../db/schema/goals';

export const generateSmartAnalysisPrompt = (goal: Partial<Goal>): string => `
Analyze this goal using SMART criteria:

Goal Details:
${JSON.stringify(goal, null, 2)}

Provide a detailed analysis of how well this goal meets each SMART criterion:
- Specific: Is it clear and unambiguous?
- Measurable: Can progress be tracked?
- Achievable: Is it realistic with available resources?
- Relevant: Does it align with broader objectives?
- Time-bound: Is there a clear deadline?

Format the response as JSON with this structure:
{
  "analysis": {
    "specific": { "score": number, "strength": "weak"|"moderate"|"strong", "suggestions": string[] },
    "measurable": { "score": number, "strength": "weak"|"moderate"|"strong", "suggestions": string[] },
    "achievable": { "score": number, "strength": "weak"|"moderate"|"strong", "suggestions": string[] },
    "relevant": { "score": number, "strength": "weak"|"moderate"|"strong", "suggestions": string[] },
    "timebound": { "score": number, "strength": "weak"|"moderate"|"strong", "suggestions": string[] }
  },
  "overallScore": number
}
`;