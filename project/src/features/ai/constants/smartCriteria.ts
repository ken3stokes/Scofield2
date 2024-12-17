export const SMART_CRITERIA = {
  specific: {
    keywords: ['what', 'why', 'who', 'where', 'which'],
    placeholder: 'What exactly do you want to accomplish? Include the what, why, who, where, and which aspects of your goal.'
  },
  measurable: {
    keywords: ['quantity', 'amount', 'number', 'percentage', 'metric'],
    placeholder: 'How will you measure progress? Include specific numbers, amounts, or percentages.'
  },
  achievable: {
    keywords: ['resources', 'capability', 'realistic', 'attainable', 'steps'],
    placeholder: 'What resources and steps are needed? Explain how this goal is realistic and attainable.'
  },
  relevant: {
    keywords: ['align', 'worthwhile', 'right time', 'matters', 'important'],
    placeholder: 'Why is this goal important now? Describe how it aligns with your broader objectives.'
  },
  timebound: {
    keywords: ['deadline', 'date', 'by', 'until', 'when'],
    placeholder: 'When will you achieve this goal? Set a specific deadline or timeframe.'
  }
} as const;