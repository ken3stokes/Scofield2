import { COLORS } from '../theme/constants';

export type GoalStatus = 'not-started' | 'in-progress' | 'completed';

export const getStatusColor = (status: GoalStatus): string => {
  switch (status) {
    case 'completed':
      return COLORS.success;
    case 'in-progress':
      return COLORS.warning;
    default:
      return COLORS.secondary;
  }
};

export const getStatusStyles = (status: GoalStatus) => {
  const color = getStatusColor(status);
  return {
    backgroundColor: `${color}20`,
    color: color,
    borderColor: `${color}40`,
  };
};