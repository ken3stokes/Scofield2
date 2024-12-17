import { useState } from 'react';
import { GOAL_CATEGORIES } from '../../../types/goals';
import type { ReportConfig } from '../types';

const defaultConfig: ReportConfig = {
  sections: {
    summary: true,
    goals: true,
    categories: true,
    progress: true
  },
  categories: Object.keys(GOAL_CATEGORIES).reduce((acc, key) => ({
    ...acc,
    [key]: true
  }), {})
};

export const useReportSettings = () => {
  const [config, setConfig] = useState<ReportConfig>(defaultConfig);

  const toggleSection = (section: keyof ReportConfig['sections']) => {
    setConfig(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section]
      }
    }));
  };

  const toggleCategory = (category: string) => {
    setConfig(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  const resetSettings = () => {
    setConfig(defaultConfig);
  };

  return {
    config,
    toggleSection,
    toggleCategory,
    resetSettings
  };
};