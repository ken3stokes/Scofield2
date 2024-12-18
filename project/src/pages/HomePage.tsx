import React from 'react';
import { Hero } from '../components/home/hero/Hero';
import { ProductivityFeatures } from '../components/home/features/ProductivityFeatures';
import { SystemOverview } from '../components/home/features/SystemOverview';
import { SmartGoals } from '../components/home/features/SmartGoals';
import { Testimonials } from '../components/home/testimonials/Testimonials';
import { CallToAction } from '../components/home/CallToAction';
import { Footer } from '../components/layout/Footer';
import type { Route } from '../types/routes';

interface HomePageProps {
  onNavigate: (route: Route) => void;
  onShowAbout: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onShowAbout }) => {
  const handleGetStarted = () => {
    onNavigate('goals');
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Hero 
        onGetStarted={handleGetStarted} 
        onNavigate={onShowAbout}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32 pb-32">
        <ProductivityFeatures />
        <SystemOverview />
        <SmartGoals />
        <Testimonials />
        <CallToAction onGetStarted={handleGetStarted} />
      </div>
      <Footer />
    </div>
  );
};