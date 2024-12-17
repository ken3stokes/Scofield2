import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeatureCards } from '../components/home/FeatureCards';
import { AiFeatureSection } from '../components/home/AiFeatureSection';
import { BlueprintSection } from '../components/home/BlueprintSection';
import { QuoteSection } from '../components/home/QuoteSection';
import { CallToAction } from '../components/home/CallToAction';
import { Footer } from '../components/layout/Footer';
import type { Route } from '../types/routes';

interface HomePageProps {
  onNavigate: (route: Route) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleGetStarted = () => {
    onNavigate('goals');
  };

  return (
    <div className="min-h-screen bg-[#1B2631]">
      <Hero onGetStarted={handleGetStarted} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-24">
        <FeatureCards />
        <AiFeatureSection />
        <BlueprintSection />
        <QuoteSection />
        <CallToAction onGetStarted={handleGetStarted} />
      </div>
      <Footer />
    </div>
  );
};