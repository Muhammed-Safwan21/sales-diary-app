import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

interface SummaryCardProps {
  title: string;
  amount: string;
  change: number;
  icon: React.ReactNode;
  trend: React.ReactNode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  amount, 
  change, 
  icon, 
  trend 
}) => {
  const { theme } = useTheme();
  
  const isPositive = change >= 0;
  
  return (
    <Animated.View 
      entering={FadeInUp.delay(200).springify()}
      layout={Layout.springify()}
      style={[
        styles.container, 
        { 
          backgroundColor: theme.colors.card, 
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        }
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.titleContainer}>
          {icon}
          <Text 
            style={[
              styles.title, 
              { 
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.medium,
                marginLeft: 8
              }
            ]}
          >
            {title}
          </Text>
        </View>
      </View>
      
      <Text 
        style={[
          styles.amount, 
          { 
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily.bold 
          }
        ]}
      >
        {amount}
      </Text>
      
      <View style={styles.changeContainer}>
        {trend}
        <Text 
          style={[
            styles.changeText, 
            { 
              color: isPositive ? theme.colors.success : theme.colors.error,
              fontFamily: theme.typography.fontFamily.medium,
              marginLeft: 4
            }
          ]}
        >
          {isPositive ? '+' : ''}{change}%
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
  },
  amount: {
    fontSize: 24,
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
  },
  // Added responsive styling for tablets and larger screens
  '@media (min-width: 768px)': {
    container: {
      width: '31%',
    },
  },
});