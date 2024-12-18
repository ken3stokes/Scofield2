import React from 'react';
import { Brain, Target, BarChart2 } from 'lucide-react';
import { Card } from '../../ui/Card';
import { GlowingBorder } from '../shared/GlowingBorder';

const ADVANCED_FEATURES = [
  {
    icon: Brain,
    title: 'AI Analysis',
    description: 'Get intelligent insights and recommendations for your goals'
  },
  {
    icon: Target,
    title: 'Precision Planning',
    description: 'Break down complex objectives into achievable milestones'
  },
  {
    icon: BarChart2,
    title: 'Advanced Analytics',
    description: 'Track progress with detailed performance metrics'
  }
] as const;

export const AdvancedFeatures: React.FC = () => (
  <div className="py-20">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-6">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Advanced Features
        </span>
      </h2>
      <p className="text-xl text-blue-200 max-w-2xl mx-auto">
        Cutting-edge tools for strategic goal achievement
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {ADVANCED_FEATURES.map((feature, index) => (
        <GlowingBorder key={index}>
          <Card 
            className="relative overflow-hidden p-8 group bg-transparent"
            variant="glass"
          >
            <div className="relative z-10">
              <div className="p-4 rounded-full bg-blue-500/10 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-blue-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-blue-100 mb-4">{feature.title}</h3>
              <p className="text-blue-200 text-lg leading-relaxed">{feature.description}</p>
            </div>
          </Card>
        </GlowingBorder>
      ))}
    </div>
  </div>
);