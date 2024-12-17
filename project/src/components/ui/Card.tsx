import React from 'react';
import { BLUEPRINT_PATTERNS, SHADOWS, TRANSITIONS } from '../../theme/constants';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'blueprint';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default',
  hover = true
}) => {
  const variantStyles = {
    default: 'bg-white dark:bg-gray-800 shadow-md',
    elevated: `bg-white dark:bg-gray-800 ${SHADOWS.lg}`,
    outlined: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
    glass: 'bg-[#34495E]/90 backdrop-blur-sm border border-white/10',
    blueprint: `bg-[#34495E]/95 ${SHADOWS.md} backdrop-blur-sm border border-white/10`
  };

  const hoverStyles = hover 
    ? 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300' 
    : '';

  return (
    <div 
      className={`
        rounded-lg p-6 
        ${variantStyles[variant]}
        ${hoverStyles}
        ${className}
      `}
      style={{
        transition: TRANSITIONS.default,
        backgroundImage: variant === 'blueprint' ? BLUEPRINT_PATTERNS.grid : undefined,
        backgroundSize: variant === 'blueprint' ? BLUEPRINT_PATTERNS.gridSize : undefined,
      }}
    >
      {children}
    </div>
  );
};