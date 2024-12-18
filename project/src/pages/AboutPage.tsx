import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { MissionStatement } from '../components/about/MissionStatement';
import { ScoFieldProfile } from '../components/about/ScoFieldProfile';
import { PrivacyFocus } from '../components/about/PrivacyFocus';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
        <div className="space-y-32">
          <MissionStatement />
          <ScoFieldProfile />
          <PrivacyFocus />
        </div>
      </div>
      <Footer />
    </div>
  );
};