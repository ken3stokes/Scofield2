import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { Card } from '../ui/Card';
import { HOME_THEME } from '../../theme/home';

export const QuoteSection: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => 
        prev === HOME_THEME.quotes.length - 1 ? 0 : prev + 1
      );
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentQuote = HOME_THEME.quotes[currentQuoteIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <Card 
        variant="glass" 
        className="text-center p-12 border border-white/20"
      >
        <Quote className="w-16 h-16 text-white/80 mx-auto mb-8" />
        <blockquote className="text-2xl text-white mb-6 transition-all duration-500">
          {currentQuote.text}
        </blockquote>
        <cite className="text-gray-300 not-italic">
          {currentQuote.attribution}
        </cite>
      </Card>
    </div>
  );
};