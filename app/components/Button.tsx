import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { borderRadius, spacing, typography } from '../../theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      opacity: disabled ? 0.5 : 1,
    };

    switch (variant) {
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary,
        };
    }
  };

  const getTextStyle = () => {
    const baseStyle = {
      color:
        variant === 'outline' || variant === 'text'
          ? theme.colors.primary
          : '#FFFFFF',
    };

    switch (size) {
      case 'small':
        return {
          ...baseStyle,
          fontSize: typography.fontSize.sm,
          paddingVertical: spacing.xs,
        };
      case 'large':
        return {
          ...baseStyle,
          fontSize: typography.fontSize.lg,
          paddingVertical: spacing.md,
        };
      default:
        return {
          ...baseStyle,
          fontSize: typography.fontSize.md,
          paddingVertical: spacing.sm,
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, getButtonStyle(), style]}
    >
      <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
  },
});
