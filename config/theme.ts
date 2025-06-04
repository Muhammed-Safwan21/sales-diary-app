import { ThemeConfig, ThemeType } from '@/types';

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48
};

const borderRadius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  round: 9999
};

const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    xxxl: 36,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  }
};

// Ultra-modern light theme with vibrant gradients and glass effects
const lightTheme: any = {
  colors: {
    // Primary - Electric blue gradient
    primary: '#6366F1',
    primaryLight: '#8B5CF6',
    primaryDark: '#4F46E5',
    primaryGradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    
    // Secondary - Vibrant purple
    secondary: '#EC4899',
    secondaryLight: '#F472B6',
    secondaryDark: '#DB2777',
    secondaryGradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    
    // Accent - Electric green
    accent: '#06D6A0',
    accentLight: '#34D399',
    accentDark: '#059669',
    accentGradient: 'linear-gradient(135deg, #06D6A0 0%, #34D399 100%)',
    
    // Status colors with modern twist
    success: '#22C55E',
    successLight: '#86EFAC',
    successDark: '#16A34A',
    
    warning: '#F59E0B',
    warningLight: '#FDE047',
    warningDark: '#D97706',
    
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#DC2626',
    
    info: '#3B82F6',
    infoLight: '#93C5FD',
    infoDark: '#2563EB',
    
    // Glass morphism backgrounds
    background: '#FAFBFF',
    surface: 'rgba(255, 255, 255, 0.8)',
    surfaceStrong: 'rgba(255, 255, 255, 0.95)',
    card: 'rgba(255, 255, 255, 0.7)',
    cardStrong: 'rgba(255, 255, 255, 0.9)',
    overlay: 'rgba(15, 23, 42, 0.1)',
    glass: 'rgba(255, 255, 255, 0.25)',
    
    // Modern text hierarchy
    text: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#94A3B8',
    textInverse: '#FFFFFF',
    textGradient: 'linear-gradient(135deg, #0F172A 0%, #475569 100%)',
    
    // Subtle borders and dividers
    border: 'rgba(148, 163, 184, 0.2)',
    borderLight: 'rgba(148, 163, 184, 0.1)',
    divider: 'rgba(148, 163, 184, 0.15)',
    
    // Interactive states with glow effects
    hover: 'rgba(99, 102, 241, 0.05)',
    pressed: 'rgba(99, 102, 241, 0.1)',
    focus: '#6366F1',
    glow: 'rgba(99, 102, 241, 0.4)',
    
    // Advanced shadows
    shadow: 'rgba(15, 23, 42, 0.04)',
    shadowMedium: 'rgba(15, 23, 42, 0.08)',
    shadowLarge: 'rgba(15, 23, 42, 0.12)',
    shadowGlow: 'rgba(99, 102, 241, 0.15)',
  },
  typography,
  spacing,
  borderRadius
};

// Ultra-modern dark theme with neon accents
const darkTheme: any = {
  colors: {
    // Primary - Neon blue
    primary: '#818CF8',
    primaryLight: '#A5B4FC',
    primaryDark: '#6366F1',
    primaryGradient: 'linear-gradient(135deg, #818CF8 0%, #A5B4FC 100%)',
    
    // Secondary - Electric pink
    secondary: '#F472B6',
    secondaryLight: '#F9A8D4',
    secondaryDark: '#EC4899',
    secondaryGradient: 'linear-gradient(135deg, #F472B6 0%, #F9A8D4 100%)',
    
    // Accent - Cyber green
    accent: '#34D399',
    accentLight: '#6EE7B7',
    accentDark: '#10B981',
    accentGradient: 'linear-gradient(135deg, #34D399 0%, #6EE7B7 100%)',
    
    // Status colors
    success: '#34D399',
    successLight: '#6EE7B7',
    successDark: '#10B981',
    
    warning: '#FBBF24',
    warningLight: '#FDE68A',
    warningDark: '#F59E0B',
    
    error: '#F87171',
    errorLight: '#FCA5A5',
    errorDark: '#EF4444',
    
    info: '#60A5FA',
    infoLight: '#93C5FD',
    infoDark: '#3B82F6',
    
    // Dark glass morphism
    background: '#0A0A0F',
    surface: 'rgba(17, 24, 39, 0.8)',
    surfaceStrong: 'rgba(17, 24, 39, 0.95)',
    card: 'rgba(31, 41, 55, 0.9)',
    cardStrong: 'rgba(31, 41, 55, 0.9)',
    overlay: 'rgba(0, 0, 0, 0.4)',
    glass: 'rgba(31, 41, 55, 0.3)',
    
    // Dark text with neon touches
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    textInverse: '#0F172A',
    textGradient: 'linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 100%)',
    
    // Glowing borders
    border: 'rgba(129, 140, 248, 0.2)',
    borderLight: 'rgba(129, 140, 248, 0.1)',
    divider: 'rgba(129, 140, 248, 0.15)',
    
    // Interactive with glow
    hover: 'rgba(129, 140, 248, 0.1)',
    pressed: 'rgba(129, 140, 248, 0.2)',
    focus: '#818CF8',
    glow: 'rgba(129, 140, 248, 0.6)',
    
    // Dramatic shadows
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowMedium: 'rgba(0, 0, 0, 0.4)',
    shadowLarge: 'rgba(0, 0, 0, 0.5)',
    shadowGlow: 'rgba(129, 140, 248, 0.3)',
  },
  typography,
  spacing,
  borderRadius
};

export const getTheme = (themeType: ThemeType): ThemeConfig => {
  return themeType === 'light' ? lightTheme : darkTheme;
};

export default {
  light: lightTheme,
  dark: darkTheme,
};