import React from 'react';
import { Card } from '../../ui/Card';
import { GlowingBorder } from '../shared/GlowingBorder';

const TESTIMONIALS = [
  {
    quote: "This system transformed how I approach my goals. The AI insights are game-changing.",
    author: "Sarah Chen",
    role: "Productivity Coach"
  },
  {
    quote: "Finally, a goal-setting app that understands the science of productivity.",
    author: "Marcus Rodriguez",
    role: "Performance Expert"
  },
  {
    quote: "The SMART goal analysis helped me achieve more in 3 months than I did all last year.",
    author: "Emily Thompson",
    role: "Business Strategist"
  }
];

export const Testimonials: React.FC = () => (
  <div className="py-20">
    <div className="grid md:grid-cols-3 gap-8">
      {TESTIMONIALS.map((testimonial, index) => (
        <GlowingBorder key={index}>
          <Card className="p-8 bg-transparent">
            <blockquote className="text-lg text-blue-100 mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div>
              <cite className="text-white font-semibold block not-italic">
                {testimonial.author}
              </cite>
              <span className="text-blue-300 text-sm">
                {testimonial.role}
              </span>
            </div>
          </Card>
        </GlowingBorder>
      ))}
    </div>
  </div>
);