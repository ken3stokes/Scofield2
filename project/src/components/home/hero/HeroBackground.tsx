import React from 'react';

export const HeroBackground: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155]" />
    
    {/* Cyberpunk Grid */}
    <div className="absolute inset-0" 
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    />
    
    {/* Animated Particles */}
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `-${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  </>
);