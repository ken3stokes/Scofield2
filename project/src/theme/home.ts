export const HOME_THEME = {
  colors: {
    primary: '#1B2631',
    secondary: '#34495E',
    accent: '#C0392B',
    text: {
      primary: '#FFFFFF',
      secondary: '#CBD5E0',
      muted: '#A0AEC0'
    },
    background: {
      primary: 'bg-[#1B2631]',
      gradient: 'bg-gradient-to-br from-[#1B2631] to-[#34495E]',
      card: 'bg-[#34495E]/50'
    }
  },
  features: [
    'Strategic Planning',
    'Progress Tracking',
    'Visual Analytics'
  ],
  steps: [
    {
      number: '1',
      title: 'Analysis',
      description: 'Break down complex objectives into manageable components'
    },
    {
      number: '2',
      title: 'Strategy',
      description: 'Develop precise execution plans with contingencies'
    },
    {
      number: '3',
      title: 'Execution',
      description: 'Implement with methodical precision and adaptability'
    },
    {
      number: '4',
      title: 'Evolution',
      description: 'Continuously refine and optimize your approach'
    }
  ],
  metrics: [
    { label: 'Strategic Planning', value: 85 },
    { label: 'Goal Achievement', value: 90 },
    { label: 'Execution Rate', value: 95 }
  ],
  quotes: [
    {
      text: "The plan is to work the plan. And if the plan doesn't work, you change the plan.",
      attribution: "- Michael Scofield",
      theme: "strategy"
    },
    {
      text: "I choose to have faith, because without that, I have nothing.",
      attribution: "- Michael Scofield",
      theme: "faith"
    },
    {
      text: "We're not going to do this the hard way or the easy way. We're going to do this the smart way.",
      attribution: "- Michael Scofield",
      theme: "intelligence"
    },
    {
      text: "Preparation can only take you so far. After that, you gotta take a few leaps of faith.",
      attribution: "- Michael Scofield",
      theme: "action"
    }
  ]
} as const;