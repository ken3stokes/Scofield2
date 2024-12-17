export type Route = 'home' | 'dashboard' | 'goals' | 'analytics';

export interface NavItem {
  id: Route;
  label: string;
  icon: string;
}