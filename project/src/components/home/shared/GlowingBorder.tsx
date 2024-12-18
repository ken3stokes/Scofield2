import React from 'react';

interface GlowingBorderProps {
  children: React.ReactNode;
  subtle?: boolean;
}

export const GlowingBorder: React.FC<GlowingBorderProps> = ({ children, subtle }) => (
  <div className={`relative group ${subtle ? 'scale-100' : 'hover:scale-105'} transition-transform duration-300`}>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-lg blur group-hover:blur-md transition-all duration-300" />
    <div className="relative bg-[#0F172A] rounded-lg border border-blue-500/20 backdrop-blur-sm">
      {children}
    </div>
  </div>
);