import React from 'react';
import { Timer, Crosshair, Workflow, Focus } from 'lucide-react';
import { Card } from '../../ui/Card';
import { GlowingBorder } from '../shared/GlowingBorder';

const PRODUCTIVITY_FEATURES = [
  {
    icon: Timer,
    title: 'Time Blocking',
    description: 'Optimize your day with strategic time allocation and focused work sessions'
  },
  {
    icon: Crosshair,
    title: 'Goal Stacking',
    description: 'Build powerful habits by linking goals to existing routines'
  },
  {
    icon: Workflow,
    title: 'Systems Thinking',
    description: 'Create sustainable processes that lead to consistent results'
  },
  {
    icon: Focus,
    title: 'Deep Work',
    description: 'Eliminate distractions and achieve flow state in your goal pursuit'
  }
] as const;

export const ProductivityFeatures: React.FC = () => (
  <div className="py-20">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-6">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Productivity Amplified
        </span>
      </h2>
      <p className="text-xl text-blue-200 max-w-2xl mx-auto">
        Advanced techniques for maximum efficiency and focus
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {PRODUCTIVITY_FEATURES.map((feature, index) => (
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