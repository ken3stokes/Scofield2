import React from 'react';
import { Card } from '../ui/Card';
import { GlowingBorder } from '../home/shared/GlowingBorder';

export const ScoFieldProfile: React.FC = () => (
  <div className="max-w-5xl mx-auto">
    <GlowingBorder>
      <Card className="p-12 bg-transparent">
        <h2 className="text-3xl font-bold mb-8 text-white">
          The Scofield Method
        </h2>
        
        <div className="space-y-8 text-blue-200">
          <p className="text-lg leading-relaxed">
            Michael Scofield's genius lay not just in his intelligence, but in his 
            extraordinary ability to see patterns, create intricate plans, and adapt 
            to changing circumstances. His methodology combines:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Strategic Vision",
                description: "The ability to see the end goal and work backwards, creating a detailed roadmap to success."
              },
              {
                title: "Meticulous Planning",
                description: "Breaking down complex objectives into precise, manageable steps."
              },
              {
                title: "Adaptability",
                description: "The flexibility to adjust plans when circumstances change, without losing sight of the goal."
              },
              {
                title: "Pattern Recognition",
                description: "Identifying opportunities and potential obstacles before they become apparent to others."
              }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-blue-200">{item.description}</p>
              </div>
            ))}
          </div>

          <blockquote className="text-xl italic border-l-4 border-blue-500 pl-6 my-8">
            "The plan is to work the plan. And if the plan doesn't work, you change the plan."
            <cite className="block text-sm mt-2 text-blue-300">- Michael Scofield</cite>
          </blockquote>
        </div>
      </Card>
    </GlowingBorder>
  </div>
);