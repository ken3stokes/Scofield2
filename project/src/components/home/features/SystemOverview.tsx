import React from 'react';
import { Card } from '../../ui/Card';
import { GlowingBorder } from '../shared/GlowingBorder';

export const SystemOverview: React.FC = () => (
  <div className="py-20">
    <GlowingBorder>
      <Card className="p-12 bg-transparent">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">
              The System Behind Success
            </h2>
            <div className="space-y-6">
              {[
                {
                  number: '01',
                  title: 'Goal Clarity',
                  description: 'Define objectives with crystal clarity using AI-powered SMART criteria'
                },
                {
                  number: '02',
                  title: 'Strategic Planning',
                  description: 'Break down goals into actionable steps with milestone tracking'
                },
                {
                  number: '03',
                  title: 'Execution Framework',
                  description: 'Implement proven productivity techniques for consistent progress'
                },
                {
                  number: '04',
                  title: 'Progress Analytics',
                  description: 'Track performance metrics and optimize your approach'
                }
              ].map((step) => (
                <div key={step.number} className="flex gap-6">
                  <span className="text-2xl font-bold text-blue-400">{step.number}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-blue-200">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg blur-xl" />
            <img 
              src="/productivity-system.svg" 
              alt="Productivity System" 
              className="relative z-10 w-full"
            />
          </div>
        </div>
      </Card>
    </GlowingBorder>
  </div>
);