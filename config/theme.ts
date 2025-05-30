// // import { ThemeConfig, ThemeType } from '@/types';

// // const spacing = {
// //   xs: 4,
// //   sm: 8,
// //   md: 16,
// //   lg: 24,
// //   xl: 32,
// //   xxl: 48
// // };

// // const borderRadius = {
// //   xs: 2,
// //   sm: 4,
// //   md: 8,
// //   lg: 12,
// //   xl: 16,
// //   round: 9999
// // };

// // const typography = {
// //   fontFamily: {
// //     regular: 'Inter-Regular',
// //     medium: 'Inter-Medium',
// //     bold: 'Inter-Bold',
// //   },
// //   fontSize: {
// //     xs: 12,
// //     sm: 14,
// //     md: 16,
// //     lg: 18,
// //     xl: 24,
// //     xxl: 32,
// //   },
// // };

// // const lightTheme: ThemeConfig = {
// //   colors: {
// //     primary: '#2563EB',
// //     primaryLight: '#60A5FA',
// //     primaryDark: '#1D4ED8',
// //     secondary: '#0D9488',
// //     secondaryLight: '#5EEAD4',
// //     secondaryDark: '#0F766E',
// //     accent: '#EAB308',
// //     accentLight: '#FDE047',
// //     accentDark: '#CA8A04',
// //     success: '#16A34A',
// //     successLight: '#86EFAC',
// //     successDark: '#166534',
// //     warning: '#F59E0B',
// //     warningLight: '#FCD34D',
// //     warningDark: '#B45309',
// //     error: '#DC2626',
// //     errorLight: '#FECACA',
// //     errorDark: '#991B1B',
// //     background: '#F9FAFB',
// //     card: '#FFFFFF',
// //     text: '#1F2937',
// //     textLight: '#6B7280',
// //     border: '#E5E7EB',
// //     notification: '#EF4444',
// //     shadow: 'rgba(0, 0, 0, 0.05)',
// //   },
// //   typography,
// //   spacing,
// //   borderRadius
// // };

// // const darkTheme: ThemeConfig = {
// //   colors: {
// //     primary: '#3B82F6',
// //     primaryLight: '#93C5FD',
// //     primaryDark: '#1D4ED8',
// //     secondary: '#14B8A6',
// //     secondaryLight: '#5EEAD4',
// //     secondaryDark: '#0F766E',
// //     accent: '#FBBF24',
// //     accentLight: '#FDE68A',
// //     accentDark: '#D97706',
// //     success: '#10B981',
// //     successLight: '#A7F3D0',
// //     successDark: '#065F46',
// //     warning: '#F59E0B',
// //     warningLight: '#FCD34D',
// //     warningDark: '#B45309',
// //     error: '#EF4444',
// //     errorLight: '#FCA5A5',
// //     errorDark: '#B91C1C',
// //     background: '#111827',
// //     card: '#1F2937',
// //     text: '#F9FAFB',
// //     textLight: '#D1D5DB',
// //     border: '#374151',
// //     notification: '#EF4444',
// //     shadow: 'rgba(0, 0, 0, 0.3)',
// //   },
// //   typography,
// //   spacing,
// //   borderRadius
// // };

// // export const getTheme = (themeType: ThemeType): ThemeConfig => {
// //   return themeType === 'light' ? lightTheme : darkTheme;
// // };

// // export default {
// //   light: lightTheme,
// //   dark: darkTheme,
// // };

// import { ThemeConfig, ThemeType } from '@/types';

// const spacing = {
//   xs: 4,
//   sm: 8,
//   md: 12,
//   lg: 16,
//   xl: 24,
//   xxl: 32,
//   xxxl: 48
// };

// const borderRadius = {
//   xs: 4,
//   sm: 6,
//   md: 8,
//   lg: 12,
//   xl: 16,
//   xxl: 20,
//   round: 9999
// };

// const typography = {
//   fontFamily: {
//     regular: 'Inter-Regular',
//     medium: 'Inter-Medium',
//     semiBold: 'Inter-SemiBold',
//     bold: 'Inter-Bold',
//   },
//   fontSize: {
//     xs: 11,
//     sm: 12,
//     base: 14,
//     md: 16,
//     lg: 18,
//     xl: 20,
//     xxl: 24,
//     xxxl: 32,
//   },
//   lineHeight: {
//     tight: 1.2,
//     normal: 1.4,
//     relaxed: 1.6,
//   }
// };

// // Modern light theme with neutral grays and vibrant accents
// const lightTheme: any = {
//   colors: {
//     // Primary - Modern blue
//     primary: '#0066FF',
//     primaryLight: '#4D94FF',
//     primaryDark: '#0052CC',
    
//     // Secondary - Sophisticated purple
//     secondary: '#7C3AED',
//     secondaryLight: '#A78BFA',
//     secondaryDark: '#5B21B6',
    
//     // Accent - Fresh green
//     accent: '#10B981',
//     accentLight: '#6EE7B7',
//     accentDark: '#047857',
    
//     // Status colors
//     success: '#10B981',
//     successLight: '#D1FAE5',
//     successDark: '#047857',
    
//     warning: '#F59E0B',
//     warningLight: '#FEF3C7',
//     warningDark: '#D97706',
    
//     error: '#EF4444',
//     errorLight: '#FEE2E2',
//     errorDark: '#DC2626',
    
//     info: '#3B82F6',
//     infoLight: '#DBEAFE',
//     infoDark: '#1D4ED8',
    
//     // Neutral colors - Modern gray scale
//     background: '#FAFBFC',
//     surface: '#FFFFFF',
//     card: '#FFFFFF',
//     overlay: 'rgba(0, 0, 0, 0.4)',
    
//     // Text colors
//     text: '#0F172A',
//     textSecondary: '#475569',
//     textTertiary: '#94A3B8',
//     textInverse: '#FFFFFF',
    
//     // Border and divider
//     border: '#E2E8F0',
//     borderLight: '#F1F5F9',
//     divider: '#E2E8F0',
    
//     // Interactive states
//     hover: '#F8FAFC',
//     pressed: '#F1F5F9',
//     focus: '#0066FF',
    
//     // Shadows
//     shadow: 'rgba(15, 23, 42, 0.04)',
//     shadowMedium: 'rgba(15, 23, 42, 0.08)',
//     shadowLarge: 'rgba(15, 23, 42, 0.12)',
//   },
//   typography,
//   spacing,
//   borderRadius
// };

// // Modern dark theme with deep blacks and bright accents
// const darkTheme: any = {
//   colors: {
//     // Primary - Brighter blue for dark mode
//     primary: '#3B82F6',
//     primaryLight: '#60A5FA',
//     primaryDark: '#1D4ED8',
    
//     // Secondary - Vibrant purple
//     secondary: '#8B5CF6',
//     secondaryLight: '#A78BFA',
//     secondaryDark: '#7C3AED',
    
//     // Accent - Bright emerald
//     accent: '#10B981',
//     accentLight: '#34D399',
//     accentDark: '#059669',
    
//     // Status colors
//     success: '#10B981',
//     successLight: '#064E3B',
//     successDark: '#34D399',
    
//     warning: '#F59E0B',
//     warningLight: '#451A03',
//     warningDark: '#FBBF24',
    
//     error: '#EF4444',
//     errorLight: '#450A0A',
//     errorDark: '#F87171',
    
//     info: '#3B82F6',
//     infoLight: '#1E293B',
//     infoDark: '#60A5FA',
    
//     // Neutral colors - Rich dark palette
//     background: '#0F0F0F',
//     surface: '#1A1A1A',
//     card: '#262626',
//     overlay: 'rgba(0, 0, 0, 0.6)',
    
//     // Text colors
//     text: '#FAFAFA',
//     textSecondary: '#D4D4D8',
//     textTertiary: '#A1A1AA',
//     textInverse: '#0F172A',
    
//     // Border and divider
//     border: '#404040',
//     borderLight: '#333333',
//     divider: '#404040',
    
//     // Interactive states
//     hover: '#2A2A2A',
//     pressed: '#333333',
//     focus: '#3B82F6',
    
//     // Shadows
//     shadow: 'rgba(0, 0, 0, 0.2)',
//     shadowMedium: 'rgba(0, 0, 0, 0.3)',
//     shadowLarge: 'rgba(0, 0, 0, 0.4)',
//   },
//   typography,
//   spacing,
//   borderRadius
// };

// export const getTheme = (themeType: ThemeType): ThemeConfig => {
//   return themeType === 'light' ? lightTheme : darkTheme;
// };

// export default {
//   light: lightTheme,
//   dark: darkTheme,
// };

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
    card: 'rgba(31, 41, 55, 0.7)',
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