import React from 'react';
import { Target, CheckCircle2, TrendingUp, Clock, Brain } from 'lucide-react';
import { Card } from '../../ui/Card';
import { GlowingBorder } from '../shared/GlowingBorder';

export const SmartGoals: React.FC = () => (
  <div className="py-20">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-6">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          SMART Goal Framework
        </span>
      </h2>
      <p className="text-xl text-blue-200 max-w-2xl mx-auto">
        Enhanced by AI for maximum clarity and achievability
      </p>
    </div>

    <div className="grid grid-cols-1 gap-8">
      {[
        {
          letter: 'S',
          title: 'Specific',
          description: 'AI helps define clear, unambiguous goals',
          icon: Target
        },
        {
          letter: 'M',
          title: 'Measurable',
          description: 'Track progress with quantifiable metrics',
          icon: TrendingUp
        },
        {
          letter: 'A',
          title: 'Achievable',
          description: 'Set realistic goals with AI insights',
          icon: CheckCircle2
        },
        {
          letter: 'R',
          title: 'Relevant',
          description: 'Align goals with your broader vision',
          icon: Brain
        },
        {
          letter: 'T',
          title: 'Time-bound',
          description: 'Set strategic deadlines and milestones',
          icon: Clock
        }
      ].map((item) => (
        <GlowingBorder key={item.letter} subtle>
          <Card className="p-6 bg-transparent">
            <div className="flex items-center gap-8">
              <div className="text-4xl font-bold text-blue-400">{item.letter}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200">{item.description}</p>
              </div>
              <item.icon className="w-8 h-8 text-blue-400" />
            </div>
          </Card>
        </GlowingBorder>
      ))}
    </div>
  </div>
);