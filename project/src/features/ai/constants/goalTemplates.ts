import type { GoalTemplate } from '../types/suggestions';

export const GOAL_TEMPLATES: Record<string, GoalTemplate[]> = {
  financial: [
    {
      title: 'Emergency Fund Creation',
      description: 'Build a robust emergency fund for financial security',
      template: {
        specific: 'Save 6 months of living expenses in a high-yield savings account',
        measurable: 'Track monthly savings and calculate percentage of target achieved',
        achievable: 'Set aside 15% of monthly income through automatic transfers',
        relevant: 'Financial security is essential for long-term stability',
        category: 'financial'
      }
    },
    {
      title: 'Investment Portfolio Diversification',
      description: 'Create a balanced investment portfolio',
      template: {
        specific: 'Diversify investments across stocks, bonds, and alternative assets',
        measurable: 'Achieve target allocation percentages for each asset class',
        achievable: 'Research and allocate funds monthly according to strategy',
        relevant: 'Portfolio diversification reduces risk and optimizes returns',
        category: 'financial'
      }
    }
  ],
  health: [
    {
      title: 'Fitness Milestone Achievement',
      description: 'Improve cardiovascular health through consistent exercise',
      template: {
        specific: 'Complete a 5K run without stopping',
        measurable: 'Track running distance, time, and frequency',
        achievable: 'Follow a 12-week training program with gradual progression',
        relevant: 'Improved cardiovascular health reduces health risks',
        category: 'health'
      }
    },
    {
      title: 'Nutrition Optimization',
      description: 'Develop healthy eating habits for better wellness',
      template: {
        specific: 'Follow a balanced meal plan with proper macronutrient ratios',
        measurable: 'Track daily caloric intake and macronutrient percentages',
        achievable: 'Meal prep weekly and gradually adjust eating habits',
        relevant: 'Proper nutrition supports overall health and energy levels',
        category: 'health'
      }
    }
  ],
  business: [
    {
      title: 'Market Expansion Strategy',
      description: 'Expand business reach to new target markets',
      template: {
        specific: 'Launch products/services in two new geographic regions',
        measurable: 'Track revenue growth and market penetration metrics',
        achievable: 'Develop region-specific marketing plans and partnerships',
        relevant: 'Market expansion is crucial for business growth',
        category: 'business'
      }
    },
    {
      title: 'Customer Retention Improvement',
      description: 'Enhance customer loyalty and reduce churn',
      template: {
        specific: 'Implement customer retention program with loyalty rewards',
        measurable: 'Increase customer retention rate by 25%',
        achievable: 'Launch quarterly initiatives and gather customer feedback',
        relevant: 'Customer retention directly impacts business sustainability',
        category: 'business'
      }
    }
  ],
  'personal-development': [
    {
      title: 'Skill Certification Achievement',
      description: 'Obtain professional certification in your field',
      template: {
        specific: 'Complete certification program and pass final exam',
        measurable: 'Track study hours and practice test scores',
        achievable: 'Dedicate 2 hours daily to study and preparation',
        relevant: 'Professional certification enhances career prospects',
        category: 'personal-development'
      }
    },
    {
      title: 'Language Proficiency Development',
      description: 'Achieve conversational fluency in a new language',
      template: {
        specific: 'Reach B2 level proficiency in target language',
        measurable: 'Complete language assessment tests and track conversation practice',
        achievable: 'Study 1 hour daily using structured learning materials',
        relevant: 'Language skills open new personal and professional opportunities',
        category: 'personal-development'
      }
    }
  ]
};