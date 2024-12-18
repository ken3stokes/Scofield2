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
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-6">
          Master Your Goals
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Leverage powerful tools designed for strategic achievement
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => (
          <Card 
            key={index}
            className="relative overflow-hidden p-8 group"
            variant="glass"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="p-4 rounded-full bg-white/10 w-fit mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};