import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Mail, Phone } from 'lucide-react-native';

interface SocialButtonProps {
  provider: 'google' | 'phone';
  onPress: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, onPress }) => {
  const { theme } = useTheme();

  const getIcon = () => {
    switch (provider) {
      case 'google':
        return <Mail size={24} color={theme.colors.text} />;
      case 'phone':
        return <Phone size={24} color={theme.colors.text} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border }
      ]}
      onPress={onPress}
    >
      {getIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 