import type { Goal } from '../../../db/schema/goals';
import type { ValidationError } from '../../../utils/validationUtils';

export const getFieldError = (field: keyof Goal, errors: ValidationError[]) => 
  errors.find(error => error.field === field)?.message;

export const getInputClasses = (field: keyof Goal, errors: ValidationError[]) => `
  mt-1 block w-full rounded-md shadow-sm
  ${getFieldError(field, errors)
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
`;