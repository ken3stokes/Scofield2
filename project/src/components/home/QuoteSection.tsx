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
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = HOME_THEME.quotes[currentQuoteIndex];

  return (
    <div className="py-20">
      <Card 
        variant="glass" 
        className="relative overflow-hidden max-w-4xl mx-auto p-16 border border-white/10"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 translate-y-16" />
        
        <div className="relative z-10">
          <Quote className="w-20 h-20 text-white/20 mx-auto mb-8" />
          
          <blockquote className="text-3xl text-white mb-8 italic font-light leading-relaxed transition-all duration-500">
            "{currentQuote.text}"
          </blockquote>
          
          <cite className="text-xl text-gray-300 not-italic block">
            {currentQuote.attribution}
          </cite>
        </div>
      </Card>
    </div>
  );
};