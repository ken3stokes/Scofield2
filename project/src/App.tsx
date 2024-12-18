import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Target } from 'lucide-react';
import { Navigation } from './components/layout/Navigation';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './components/dashboard/Dashboard';
import { GoalList } from './components/goals/GoalList';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AboutPage } from './pages/AboutPage';
import type { Route } from './types/routes';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('home');
  const [showAbout, setShowAbout] = useState(false);

  const handleNavigate = (route: Route) => {
    setCurrentRoute(route);
    setShowAbout(false);
  };

  const handleShowAbout = () => {
    setShowAbout(true);
  };

  const renderRoute = () => {
    if (showAbout) {
      return <AboutPage onBack={() => setShowAbout(false)} />;
    }

    switch (currentRoute) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onShowAbout={handleShowAbout} />;
      case 'dashboard':
        return <Dashboard />;
      case 'goals':
        return <GoalList onCreateNew={() => {}} />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onShowAbout={handleShowAbout} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#E2E8F0',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }
        }} 
      />
      
      {currentRoute !== 'home' && !showAbout && (
        <Navigation currentRoute={currentRoute} onRouteChange={handleNavigate} />
      )}

      <main>
        {renderRoute()}
      </main>
    </div>
  );
};

export default App;