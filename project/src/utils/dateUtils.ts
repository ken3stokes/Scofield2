import { format, isAfter, isBefore, addDays, parseISO, startOfDay } from 'date-fns';

export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM d, yyyy');
};

export const isOverdue = (date: string | Date | undefined): boolean => {
  if (!date) return false;
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isBefore(parsedDate, startOfDay(new Date()));
};

export const getDaysRemaining = (date: string | Date | undefined): number => {
  if (!date) return 0;
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  const now = startOfDay(new Date());
  const diffTime = parsedDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const toISOString = (date: Date | undefined): string => {
  return date ? date.toISOString() : new Date().toISOString();
};

export const fromISOString = (dateString: string | Date | undefined): Date => {
  if (!dateString) return new Date();
  return typeof dateString === 'string' ? parseISO(dateString) : dateString;
};

export const isValidDate = (date: any): boolean => {
  if (!date) return false;
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return parsed instanceof Date && !isNaN(parsed.getTime());
};