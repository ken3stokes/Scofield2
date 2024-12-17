import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  animation = 'pulse'
}) => {
  const baseStyles = 'bg-gray-200 dark:bg-gray-700';
  const animationStyles = animation === 'pulse' 
    ? 'animate-pulse' 
    : 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700';
  
  const variantStyles = {
    text: 'h-4 w-3/4 rounded',
    rectangular: 'h-24 w-full rounded-lg',
    circular: 'h-12 w-12 rounded-full'
  };

  return (
    <div 
      className={`${baseStyles} ${animationStyles} ${variantStyles[variant]} ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
};