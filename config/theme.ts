import { ThemeConfig, ThemeType } from '@/types';

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999
};

const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};

const lightTheme: ThemeConfig = {
  colors: {
    primary: '#2563EB',
    primaryLight: '#60A5FA',
    primaryDark: '#1D4ED8',
    secondary: '#0D9488',
    secondaryLight: '#5EEAD4',
    secondaryDark: '#0F766E',
    accent: '#EAB308',
    accentLight: '#FDE047',
    accentDark: '#CA8A04',
    success: '#16A34A',
    successLight: '#86EFAC',
    successDark: '#166534',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#DC2626',
    errorLight: '#FECACA',
    errorDark: '#991B1B',
    background: '#F9FAFB',
    card: '#FFFFFF',
    text: '#1F2937',
    textLight: '#6B7280',
    border: '#E5E7EB',
    notification: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.05)',
  },
  typography,
  spacing,
  borderRadius
};

const darkTheme: ThemeConfig = {
  colors: {
    primary: '#3B82F6',
    primaryLight: '#93C5FD',
    primaryDark: '#1D4ED8',
    secondary: '#14B8A6',
    secondaryLight: '#5EEAD4',
    secondaryDark: '#0F766E',
    accent: '#FBBF24',
    accentLight: '#FDE68A',
    accentDark: '#D97706',
    success: '#10B981',
    successLight: '#A7F3D0',
    successDark: '#065F46',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    warningDark: '#B45309',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    errorDark: '#B91C1C',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    textLight: '#D1D5DB',
    border: '#374151',
    notification: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.3)',
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