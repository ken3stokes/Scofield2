import React from 'react';
import { Map, Clock, BarChart2 } from 'lucide-react';
import { Card } from '../ui/Card';

const FEATURES = [
  {
    icon: Map,
    title: 'Strategic Planning',
    description: 'Break down complex goals into precise, actionable steps'
  },
  {
    icon: Clock,
    title: 'Time Mastery',
    description: 'Execute with perfect timing and unwavering focus'
  },
  {
    icon: BarChart2,
    title: 'Progress Tracking',
    description: 'Monitor your journey with detailed analytics'
  }
] as const;

export const FeatureCards: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {FEATURES.map((feature, index) => (
        <Card 
          key={index}
          className="text-center p-8 transform transition-all duration-300 hover:scale-105"
          variant="glass"
        >
          <div className="p-4 rounded-full bg-white/10 w-fit mx-auto mb-6">
            <feature.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
};