import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  
  const getBackgroundColor = () => {
    if (disabled) return theme.colors.textLight;
    
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'danger': return theme.colors.error;
      case 'outline': return 'transparent';
      case 'ghost': return 'transparent';
      default: return theme.colors.primary;
    }
  };
  
  const getTextColor = () => {
    if (disabled) return '#FFFFFF';
    
    switch (variant) {
      case 'primary': 
      case 'secondary': 
      case 'danger': 
        return '#FFFFFF';
      case 'outline': 
        return variant === 'outline' && variant === 'danger' ? theme.colors.error : theme.colors.primary;
      case 'ghost': 
        return theme.colors.text;
      default: 
        return '#FFFFFF';
    }
  };
  
  const getBorderColor = () => {
    if (disabled) return theme.colors.textLight;
    
    switch (variant) {
      case 'outline': 
        return variant === 'danger' ? theme.colors.error : theme.colors.primary;
      default: 
        return 'transparent';
    }
  };
  
  const getPadding = () => {
    switch (size) {
      case 'sm': return { paddingVertical: 6, paddingHorizontal: 12 };
      case 'md': return { paddingVertical: 10, paddingHorizontal: 16 };
      case 'lg': return { paddingVertical: 14, paddingHorizontal: 20 };
      default: return { paddingVertical: 10, paddingHorizontal: 16 };
    }
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'sm': return 14;
      case 'md': return 16;
      case 'lg': return 18;
      default: return 16;
    }
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        getPadding(),
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: disabled ? 0.7 : 1,
          width: fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: getFontSize(),
                fontFamily: theme.typography.fontFamily.medium,
                marginLeft: icon && iconPosition === 'left' ? 8 : 0,
                marginRight: icon && iconPosition === 'right' ? 8 : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});