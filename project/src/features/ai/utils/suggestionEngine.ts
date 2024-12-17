import { GOAL_TEMPLATES } from '../constants/goalTemplates';
import type { GoalTemplate, SuggestionContext } from '../types/suggestions';
import type { GoalCategory } from '../../../types/goals';

export const generateSuggestions = (
  context: SuggestionContext,
  limit: number = 3
): GoalTemplate[] => {
  const suggestions: GoalTemplate[] = [];
  
  // If category is specified, prioritize that category
  if (context.category) {
    suggestions.push(...getRandomTemplates(context.category, limit));
    return suggestions;
  }

  // Otherwise, suggest based on user's goal distribution
  const underrepresentedCategories = findUnderrepresentedCategories(context);
  
  // Get suggestions for underrepresented categories
  underrepresentedCategories.forEach(category => {
    const categoryTemplates = getRandomTemplates(category, 1);
    suggestions.push(...categoryTemplates);
  });

  // Fill remaining slots with random suggestions
  while (suggestions.length < limit) {
    const randomCategory = getRandomCategory();
    const template = getRandomTemplates(randomCategory, 1)[0];
    
    // Avoid duplicates
    if (!suggestions.some(s => s.title === template.title)) {
      suggestions.push(template);
    }
  }

  return suggestions;
};

const getRandomTemplates = (
  category: GoalCategory,
  count: number
): GoalTemplate[] => {
  const templates = GOAL_TEMPLATES[category];
  const selected: GoalTemplate[] = [];
  
  while (selected.length < count && selected.length < templates.length) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    if (!selected.includes(template)) {
      selected.push(template);
    }
  }
  
  return selected;
};

const findUnderrepresentedCategories = (
  context: SuggestionContext
): GoalCategory[] => {
  const categories = Object.keys(context.userGoals.categories) as GoalCategory[];
  const totalGoals = context.userGoals.total;
  
  return categories
    .filter(category => {
      const categoryCount = context.userGoals.categories[category];
      const expectedShare = 1 / categories.length;
      const actualShare = totalGoals ? categoryCount / totalGoals : 0;
      return actualShare < expectedShare;
    })
    .sort((a, b) => 
      context.userGoals.categories[a] - context.userGoals.categories[b]
    );
};

const getRandomCategory = (): GoalCategory => {
  const categories = Object.keys(GOAL_TEMPLATES) as GoalCategory[];
  return categories[Math.floor(Math.random() * categories.length)];
};