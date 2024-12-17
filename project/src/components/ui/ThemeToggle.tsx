import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '../../theme/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="text-gray-600 dark:text-gray-300"
      icon={theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    >
      {theme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};