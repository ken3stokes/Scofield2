export const COLORS = {
  primary: '#1B2631', // Dark navy blue (Prison uniform)
  secondary: '#34495E', // Steel blue (Industrial)
  accent: '#C0392B', // Deep red (Urgency)
  success: '#27AE60', // Forest green
  warning: '#F39C12', // Prison yellow
  background: '#ECF0F1', // Blueprint paper
  paper: '#FFFFFF',
  border: '#BDC3C7',
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    light: '#BDC3C7'
  }
};

export const BLUEPRINT_PATTERNS = {
  grid: `
    repeating-linear-gradient(0deg, rgba(27, 38, 49, 0.03) 0px, transparent 1px),
    repeating-linear-gradient(90deg, rgba(27, 38, 49, 0.03) 0px, transparent 1px),
    linear-gradient(to right bottom, ${COLORS.background}dd, ${COLORS.background}ff)
  `,
  dots: `radial-gradient(circle, rgba(27, 38, 49, 0.1) 1px, transparent 1px)`,
  gridSize: '20px 20px',
  dotSize: '16px 16px'
};

export const SHADOWS = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
};

export const TRANSITIONS = {
  default: 'all 0.3s ease-in-out',
  fast: 'all 0.15s ease-in-out',
  slow: 'all 0.5s ease-in-out'
};