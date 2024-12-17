import React from 'react';
import { Target, BarChart2, List, Sun, Moon } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import type { Route } from '../../types/routes';

interface NavigationProps {
  currentRoute: Route;
  onRouteChange: (route: Route) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, onRouteChange }) => {
  const navItems = [
    { id: 'dashboard' as Route, label: 'Dashboard', icon: Target },
    { id: 'goals' as Route, label: 'Goals', icon: List },
    { id: 'analytics' as Route, label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <nav className="bg-white shadow dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => onRouteChange('home')}
              className="flex items-center gap-2 px-4 py-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Target className="w-6 h-6" />
              <span className="font-bold text-lg">Scofield</span>
            </button>

            <div className="ml-6 flex">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onRouteChange(id)}
                  className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                    currentRoute === id
                      ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};