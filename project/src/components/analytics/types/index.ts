import type { Goal } from '../../../db/database';

export interface ChartProps {
  goals: Goal[];
}

export interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}

export interface ReportConfig {
  sections: {
    summary: boolean;
    goals: boolean;
    categories: boolean;
    progress: boolean;
  };
  categories: Record<string, boolean>;
}