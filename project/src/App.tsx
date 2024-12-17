import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Target } from 'lucide-react';
import { Navigation } from './components/layout/Navigation';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './components/dashboard/Dashboard';
import { GoalList } from './components/goals/GoalList';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { COLORS, BLUEPRINT_PATTERNS } from './theme/constants';
import type { Route } from './types/routes';

function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');

  const handleNavigate = (route: Route) => {
    setCurrentRoute(route);
  };

  const renderRoute = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard />;
      case 'goals':
        return <GoalList onCreateNew={() => {}} />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: COLORS.background,
        backgroundImage: BLUEPRINT_PATTERNS.grid,
        backgroundSize: BLUEPRINT_PATTERNS.gridSize,
        backgroundAttachment: 'fixed'
      }}
    >
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: COLORS.paper,
            color: COLORS.text.primary,
            border: `1px solid ${COLORS.border}`
          }
        }} 
      />
      
      <header className="bg-gradient-to-r from-[#1B2631] to-[#34495E] shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Scofield</h1>
          </div>
        </div>
      </header>

      {currentRoute !== 'home' && (
        <Navigation currentRoute={currentRoute} onRouteChange={handleNavigate} />
      )}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-8">
          {renderRoute()}
        </div>
      </main>
    </div>
  );
}

export default App;