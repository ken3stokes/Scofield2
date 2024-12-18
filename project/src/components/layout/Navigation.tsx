import React from 'react';
import { Target, BarChart2, List } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { GlowingBorder } from '../home/shared/GlowingBorder';
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
    <nav className="bg-[#0F172A] border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => onRouteChange('home')}
              className="flex items-center gap-2 px-4 py-2 text-white hover:text-blue-400 transition-colors"
            >
              <Target className="w-6 h-6" />
              <span className="font-bold text-lg">Scofield</span>
            </button>

            <div className="ml-6 flex">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onRouteChange(id)}
                  className={`
                    inline-flex items-center px-4 py-2 text-sm font-medium
                    ${currentRoute === id
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-300 hover:text-blue-300 border-b-2 border-transparent'
                    }
                    transition-all duration-300
                  `}
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