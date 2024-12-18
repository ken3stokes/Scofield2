import React from 'react';
import { Target, Brain, ArrowRight, Info } from 'lucide-react';
import { Button } from '../../ui/Button';
import { GlowingBorder } from '../shared/GlowingBorder';

interface HeroContentProps {
  onGetStarted: () => void;
  onNavigate: (route: 'about') => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onGetStarted, onNavigate }) => (
  <div className="text-center max-w-4xl mx-auto space-y-8">
    <div className="animate-fade-in">
      <div className="flex justify-center mb-12">
        <GlowingBorder>
          <div className="relative p-6">
            <Target className="w-20 h-20 text-blue-400" />
            <Brain className="w-10 h-10 text-blue-300 absolute -right-2 -bottom-2" />
          </div>
        </GlowingBorder>
      </div>
      
      <h1 className="text-7xl font-bold mb-6 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
          SCOFIELD
        </span>
      </h1>
      
      <p className="text-2xl text-blue-200 mb-8 leading-relaxed">
        AI-powered planning system for exceptional results
      </p>
      
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="glow"
          size="lg"
          onClick={onGetStarted}
          className="px-12 py-4 text-lg"
          icon={<ArrowRight className="w-6 h-6" />}
        >
          Start Planning
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => onNavigate('about')}
          className="px-8 py-4 text-lg border-blue-500/20 text-blue-300 hover:bg-blue-500/10"
          icon={<Info className="w-6 h-6" />}
        >
          About Scofield
        </Button>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mt-20">
      {[
        'AI-Powered Analysis',
        'Smart Goal Tracking',
        'Strategic Planning'
      ].map((feature, index) => (
        <GlowingBorder key={index} subtle>
          <div className="flex items-center justify-center gap-3 py-4 px-6">
            <Target className="w-5 h-5 text-blue-400" />
            <span className="text-lg text-blue-100">{feature}</span>
          </div>
        </GlowingBorder>
      ))}
    </div>
  </div>
);