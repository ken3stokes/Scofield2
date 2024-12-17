import React from 'react';
import { Card } from '../ui/Card';
import { HOME_THEME } from '../../theme/home';

export const BlueprintSection: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center px-4">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-white">The Blueprint Approach</h2>
        <div className="space-y-6">
          {HOME_THEME.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              <div>
                <h5 className="text-xl font-bold text-white mb-2">{step.title}</h5>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card 
        variant="glass" 
        className="p-8 border border-white/20"
      >
        <h3 className="text-2xl font-bold text-white mb-8">Success Metrics</h3>
        <div className="space-y-6">
          {HOME_THEME.metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-white">
                <span>{metric.label}</span>
                <span>{metric.value}%</span>
              </div>
              <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-1000 ease-out"
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};