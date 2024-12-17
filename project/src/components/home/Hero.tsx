import React from 'react';
import { Target, Brain } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const features = [
    'AI-Powered Analysis',
    'Smart Goal Tracking',
    'Personalized Insights'
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#1B2631] to-[#34495E] py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <div className="flex justify-center mb-8">
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
              <div className="relative">
                <Target className="w-16 h-16 text-white" />
                <Brain className="w-8 h-8 text-white absolute -right-2 -bottom-2" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6">
            Turn Impossible into Inevitable
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your goals, mapped with precision, powered by AI
          </p>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onGetStarted}
            className="border-white text-white hover:bg-white/10"
          >
            Start Your Journey
          </Button>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-center text-white gap-2">
                <Target className="w-5 h-5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};