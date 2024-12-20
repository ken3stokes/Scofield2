import React from 'react';
import { HeroBackground } from './hero/HeroBackground';
import { HeroContent } from './hero/HeroContent';

interface HeroProps {
  onGetStarted: () => void;
  onNavigate: (route: 'about') => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onNavigate }) => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <HeroBackground />
      <div className="container mx-auto px-4 relative z-10">
        <HeroContent onGetStarted={onGetStarted} onNavigate={onNavigate} />
      </div>
    </div>
  );
};