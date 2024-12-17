import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type { SMARTAnalysis, SMARTCriterion } from '../types/analysis';

interface SmartAnalysisProps {
  analysis: SMARTAnalysis;
}

const CriterionIndicator: React.FC<{ criterion: SMARTCriterion; label: string }> = ({ 
  criterion,
  label 
}) => {
  const { strength, score, suggestions } = criterion;
  
  const icons = {
    weak: <AlertCircle className="w-5 h-5 text-red-500" />,
    moderate: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    strong: <CheckCircle className="w-5 h-5 text-green-500" />
  };

  const colors = {
    weak: '#EF4444',
    moderate: '#F59E0B',
    strong: '#10B981'
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icons[strength]}
          <span className="font-medium">{label}</span>
        </div>
        <span className="text-sm text-gray-600">{Math.round(score)}%</span>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${score}%`,
            backgroundColor: colors[strength]
          }}
        />
      </div>

      {suggestions.length > 0 && (
        <div className="mt-2 space-y-1">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SmartAnalysis: React.FC<SmartAnalysisProps> = ({ analysis }) => {
  const criteria = [
    { key: 'specific', label: 'Specific' },
    { key: 'measurable', label: 'Measurable' },
    { key: 'achievable', label: 'Achievable' },
    { key: 'relevant', label: 'Relevant' },
    { key: 'timebound', label: 'Time-bound' }
  ];

  const getOverallStrength = (score: number): SMARTCriterion['strength'] => {
    if (score >= 70) return 'strong';
    if (score >= 40) return 'moderate';
    return 'weak';
  };

  const overallStrength = getOverallStrength(analysis.overallScore);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">SMART Analysis</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Overall Score:</span>
          <div 
            className={`px-3 py-1 rounded-full font-medium text-sm
              ${overallStrength === 'strong' ? 'bg-green-100 text-green-800' :
                overallStrength === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}
          >
            {Math.round(analysis.overallScore)}%
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {criteria.map(({ key, label }) => (
          <CriterionIndicator 
            key={key}
            criterion={analysis[key as keyof SMARTAnalysis]}
            label={label}
          />
        ))}
      </div>
    </Card>
  );
};