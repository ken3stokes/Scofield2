import React from 'react';
import { Target } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#34495E] py-8 mt-24">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-white">
          <Target className="w-6 h-6" />
          <span className="text-lg font-bold">
            SCOFIELD - Turn Impossible into Inevitable
          </span>
        </div>
      </div>
    </footer>
  );
};