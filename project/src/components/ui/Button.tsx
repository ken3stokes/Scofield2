import React from 'react';
import { TRANSITIONS } from '../../theme/constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    rounded-md font-medium 
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transform hover:-translate-y-0.5 active:translate-y-0
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
    glow: `
      relative overflow-hidden
      bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500
      text-white font-semibold
      hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
      before:absolute before:inset-0
      before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-200%] hover:before:translate-x-[200%]
      before:transition-transform before:duration-1000
    `
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${className}
      `}
      style={{ transition: TRANSITIONS.default }}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="w-5 h-5">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="w-5 h-5">{icon}</span>}
    </button>
  );
};