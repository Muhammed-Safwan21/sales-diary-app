import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

interface SummaryCardProps {
  title: string;
  amount: string;
  change: number;
  icon: React.ReactNode;
  trend: React.ReactNode;
  gradient?: string[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  amount, 
  change, 
  icon, 
  trend,
  gradient = ['#6366F1', '#8B5CF6']
}:any) => {
  const { theme, themeType }:any = useTheme();
  
  const isPositive = change >= 0;
  
  return (
    <Animated.View 
      entering={FadeInUp.delay(200).springify()}
      layout={Layout.springify()}
      style={[
        styles.container,
        {
          shadowColor: gradient[0],
        }
      ]}
    >
      <LinearGradient
        colors={themeType === 'dark' 
          ? [`${gradient[0]}20`, `${gradient[1]}10`]
          : [`${gradient[0]}08`, `${gradient[1]}05`]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* Glass effect overlay */}
        <View style={[
          styles.glassOverlay,
          { backgroundColor: themeType === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(255, 255, 255, 0.8)'
          }
        ]} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <LinearGradient
              colors={gradient}
              style={styles.iconContainer}
            >
              {icon}
            </LinearGradient>
            
            <View style={[
              styles.changeContainer,
              { 
                backgroundColor: isPositive 
                  ? 'rgba(34, 197, 94, 0.15)' 
                  : 'rgba(239, 68, 68, 0.15)',
                borderColor: isPositive 
                  ? 'rgba(34, 197, 94, 0.3)' 
                  : 'rgba(239, 68, 68, 0.3)',
              }
            ]}>
              {trend}
              <Text 
                style={[
                  styles.changeText, 
                  { 
                    color: isPositive ? theme.colors.success : theme.colors.error,
                  }
                ]}
              >
                {isPositive ? '+' : ''}{change}%
              </Text>
            </View>
          </View>
          
          <View style={styles.dataSection}>
            <Text 
              style={[
                styles.title, 
                { color: theme.colors.textSecondary }
              ]}
            >
              {title}
            </Text>
            
            <Text 
              style={[
                styles.amount, 
                { color: theme.colors.text }
              ]}
            >
              {amount}
            </Text>
          </View>
          
          {/* Decorative gradient line */}
          <LinearGradient
            colors={[`${gradient[0]}60`, `${gradient[1]}60`, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.decorativeLine}
          />
          
          {/* Background decoration */}
          <View style={[
            styles.backgroundDecoration,
            { backgroundColor: `${gradient[0]}08` }
          ]} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.1)',
      },
    }),
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  content: {
    padding: 16,
    minHeight: 120,
    position: 'relative',
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  dataSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  amount: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  decorativeLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 2,
  },
  backgroundDecoration: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 1,
  },
});