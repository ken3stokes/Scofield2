import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { useMotivationalNudges } from '../hooks/useMotivationalNudges';

export const MotivationalNudge: React.FC = () => {
  const { message, type } = useMotivationalNudges();

  if (!message) return null;

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <Card className={`p-4 border ${styles[type]} transition-all duration-300 animate-fade-in`}>
      <div className="flex items-center gap-3">
        <Lightbulb className="w-5 h-5" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </Card>
  );
};