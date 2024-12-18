import React from 'react';
import { Shield, Lock, Database } from 'lucide-react';
import { Card } from '../ui/Card';
import { GlowingBorder } from '../home/shared/GlowingBorder';

export const PrivacyFocus: React.FC = () => (
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4 text-white">Privacy by Design</h2>
      <p className="text-xl text-blue-200">
        Your data stays where it belongs - in your control
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: Shield,
          title: "Local-First",
          description: "All your data is stored locally in your browser, never on our servers."
        },
        {
          icon: Lock,
          title: "Zero Data Collection",
          description: "We don't track, collect, or analyze your personal information or goals."
        },
        {
          icon: Database,
          title: "Full Data Control",
          description: "Export or delete your data anytime - you maintain complete ownership."
        }
      ].map((feature, index) => (
        <GlowingBorder key={index}>
          <Card className="p-8 bg-transparent">
            <div className="flex flex-col items-center text-center">
              <feature.icon className="w-12 h-12 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </div>
          </Card>
        </GlowingBorder>
      ))}
    </div>
  </div>
);