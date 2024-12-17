import React from 'react';
import { Brain, Target, Sparkles, MessageCircle } from 'lucide-react';
import { Card } from '../ui/Card';

const AI_FEATURES = [
  {
    icon: Brain,
    title: 'SMART Analysis',
    description: 'Real-time AI feedback on your goals using SMART criteria'
  },
  {
    icon: Target,
    title: 'Goal Suggestions',
    description: 'Personalized goal recommendations based on your progress'
  },
  {
    icon: MessageCircle,
    title: 'Motivational Nudges',
    description: 'Timely encouragement and progress insights'
  },
  {
    icon: Sparkles,
    title: 'Smart Templates',
    description: 'AI-crafted templates for different goal categories'
  }
] as const;

export const AiFeatureSection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          AI-Powered Goal Achievement
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Leverage advanced AI to transform your goals from aspirations to achievements
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AI_FEATURES.map((feature, index) => (
          <Card
            key={index}
            variant="glass"
            className="p-6 text-center transform transition-all duration-300 hover:scale-105"
          >
            <div className="p-3 rounded-full bg-white/10 w-fit mx-auto mb-4">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-sm">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};