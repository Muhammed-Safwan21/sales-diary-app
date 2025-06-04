import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { ThemeColors } from './types';

export const colors = {
  primary: {
    main: '#2563EB',
    light: '#60A5FA',
    dark: '#1E40AF',
  },
  secondary: {
    main: '#7C3AED',
    light: '#A78BFA',
    dark: '#5B21B6',
  },
  success: {
    main: '#059669',
    light: '#34D399',
    dark: '#065F46',
  },
  error: {
    main: '#DC2626',
    light: '#F87171',
    dark: '#991B1B',
  },
  warning: {
    main: '#D97706',
    light: '#FBBF24',
    dark: '#92400E',
  },
  info: {
    main: '#0284C7',
    light: '#38BDF8',
    dark: '#075985',
  },
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

const createThemeColors = (isDark: boolean): ThemeColors => ({
  primary: isDark ? colors.primary.light : colors.primary.main,
  onPrimary: '#FFFFFF',
  primaryContainer: isDark ? colors.primary.dark : colors.primary.light,
  onPrimaryContainer: isDark ? colors.primary.light : colors.primary.dark,
  secondary: isDark ? colors.secondary.light : colors.secondary.main,
  onSecondary: '#FFFFFF',
  secondaryContainer: isDark ? colors.secondary.dark : colors.secondary.light,
  onSecondaryContainer: isDark ? colors.secondary.light : colors.secondary.dark,
  tertiary: isDark ? colors.info.light : colors.info.main,
  onTertiary: '#FFFFFF',
  tertiaryContainer: isDark ? colors.info.dark : colors.info.light,
  onTertiaryContainer: isDark ? colors.info.light : colors.info.dark,
  error: isDark ? colors.error.light : colors.error.main,
  onError: '#FFFFFF',
  errorContainer: isDark ? colors.error.dark : colors.error.light,
  onErrorContainer: isDark ? colors.error.light : colors.error.dark,
  background: isDark ? colors.grey[900] : colors.grey[50],
  onBackground: isDark ? colors.grey[50] : colors.grey[900],
  surface: isDark ? colors.grey[800] : colors.grey[100],
  onSurface: isDark ? colors.grey[50] : colors.grey[900],
  surfaceVariant: isDark ? colors.grey[700] : colors.grey[200],
  onSurfaceVariant: isDark ? colors.grey[300] : colors.grey[700],
  outline: isDark ? colors.grey[600] : colors.grey[300],
  outlineVariant: isDark ? colors.grey[700] : colors.grey[200],
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: isDark ? colors.grey[50] : colors.grey[900],
  inverseOnSurface: isDark ? colors.grey[900] : colors.grey[50],
  inversePrimary: isDark ? colors.primary.dark : colors.primary.light,
  elevation: {
    level0: 'transparent',
    level1: isDark ? colors.grey[800] : colors.grey[100],
    level2: isDark ? colors.grey[700] : colors.grey[200],
    level3: isDark ? colors.grey[600] : colors.grey[300],
    level4: isDark ? colors.grey[500] : colors.grey[400],
    level5: isDark ? colors.grey[400] : colors.grey[500],
  },
});

export const lightTheme = {
  ...MD3LightTheme,
  colors: createThemeColors(false),
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: createThemeColors(true),
}; 