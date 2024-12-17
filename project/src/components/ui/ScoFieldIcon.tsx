import React from 'react';
import { Target } from 'lucide-react';

interface ScoFieldIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ScoFieldIcon: React.FC<ScoFieldIconProps> = ({ 
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${className}`}>
      <Target className={`${sizes[size]} text-current`} />
      <svg
        className={`absolute -right-1 -bottom-1 ${size === 'lg' ? 'w-8 h-8' : 'w-4 h-4'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Stylized silhouette of Michael Scofield */}
        <path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-6h6v6h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z" />
        <path d="M9 17v4" />
        <path d="M15 17v4" />
        <path d="M12 3v6" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    </div>
  );
};