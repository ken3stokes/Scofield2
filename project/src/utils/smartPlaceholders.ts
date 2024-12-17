import { SMART_CRITERIA } from '../features/ai/constants/smartCriteria';
import type { Goal } from '../db/schema/goals';

export const getSmartPlaceholder = (field: keyof typeof SMART_CRITERIA): string => {
  return SMART_CRITERIA[field]?.placeholder || '';
};