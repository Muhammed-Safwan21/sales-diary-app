import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { shadows, borderRadius, spacing } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'filled';
}

export const Card = ({ children, style, variant = 'elevated' }: CardProps) => {
  const { theme } = useTheme();

  const getCardStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: theme.colors.outline,
        };
      case 'filled':
        return {
          backgroundColor: theme.colors.surfaceVariant,
        };
      default:
        return {
          backgroundColor: theme.colors.surface,
          ...shadows.md,
        };
    }
  };

  return (
    <View style={[styles.container, getCardStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.sm,
  },
}); 