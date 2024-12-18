import React from 'react';
import { Target } from 'lucide-react';
import { GlowingBorder } from '../home/shared/GlowingBorder';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-blue-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <GlowingBorder subtle>
              <div className="px-6 py-3 flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-400" />
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                  SCOFIELD
                </span>
              </div>
            </GlowingBorder>

            <p className="text-blue-200 text-center max-w-xl">
              Transform your goals into achievements with precision planning and AI-powered insights
            </p>

            <div className="flex gap-8 text-sm text-blue-300">
              {['About', 'Features'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="text-blue-300/60 text-sm">
              © {new Date().getFullYear()} Scofield. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};