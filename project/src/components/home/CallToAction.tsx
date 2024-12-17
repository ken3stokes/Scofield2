import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface CallToActionProps {
  onGetStarted: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onGetStarted }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-6">
        Ready to Execute Your Plan?
      </h2>
      <p className="text-xl text-gray-300 mb-8">
        Join the ranks of strategic achievers who turn their goals into reality
      </p>
      <Button
        variant="outline"
        size="lg"
        onClick={onGetStarted}
        icon={<ArrowRight />}
        className="border-white text-white hover:bg-white/10"
      >
        Begin Your Mission
      </Button>
    </div>
  );
};