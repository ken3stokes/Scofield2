import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface CallToActionProps {
  onGetStarted: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onGetStarted }) => {
  return (
    <div className="py-20">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <h2 className="text-5xl font-bold text-white mb-8">
          Ready to Execute Your Plan?
        </h2>
        
        <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
          Join the ranks of strategic achievers who turn their goals into reality
        </p>
        
        <Button
          variant="outline"
          size="lg"
          onClick={onGetStarted}
          icon={<ArrowRight className="w-6 h-6" />}
          className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-12 py-4 text-lg transform hover:scale-105 transition-all duration-300"
        >
          Begin Your Mission
        </Button>
      </div>
    </div>
  );
};