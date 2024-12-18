import React from 'react';
import { Target, Brain } from 'lucide-react';
import { GlowingBorder } from '../home/shared/GlowingBorder';

export const MissionStatement: React.FC = () => (
  <div className="text-center max-w-4xl mx-auto space-y-8">
    <GlowingBorder>
      <div className="p-8">
        <div className="flex justify-center gap-4 mb-8">
          <Target className="w-12 h-12 text-blue-400" />
          <Brain className="w-12 h-12 text-blue-400" />
        </div>
        
        <h1 className="text-4xl font-bold mb-6 text-white">
          The Vision Behind Scofield
        </h1>
        
        <p className="text-xl text-blue-200 leading-relaxed">
          Just as Michael Scofield approached every challenge with meticulous planning and 
          unwavering determination, we believe that success is not about chance—it's about 
          strategy, precision, and relentless execution.
        </p>
      </div>
    </GlowingBorder>
  </div>
);