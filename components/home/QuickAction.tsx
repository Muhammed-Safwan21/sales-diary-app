import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'expo-router';

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  route: string;
}

export const QuickAction: React.FC<QuickActionProps> = ({ icon, title, route }) => {
  const { theme } = useTheme();
  
  const containerStyle = {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    ...(Platform.OS === 'ios' ? {
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } : Platform.OS === 'android' ? {
      elevation: 2,
    } : {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    }),
  };

  const iconContainerStyle = {
    marginBottom: 12,
  };

  const titleStyle = {
    fontSize: 14,
    textAlign: 'center',
    color: theme.colors.text,
    fontFamily: theme.typography.fontFamily.medium,
  };

  return (
    <Link href={route} asChild>
      <TouchableOpacity style={containerStyle}>
        <View style={iconContainerStyle}>
          {icon}
        </View>
        <Text 
          style={titleStyle}
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};