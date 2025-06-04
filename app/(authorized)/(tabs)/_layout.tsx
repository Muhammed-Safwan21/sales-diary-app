import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { BarChart4, Home, Menu, Users } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const { theme, themeType }: any = useTheme();

  const tabBarHeight = Platform.OS === 'ios' ? 88 : 65;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor:
          themeType === 'dark'
            ? 'rgba(255, 255, 255, 0.5)'
            : 'rgba(0, 0, 0, 0.4)',
        tabBarStyle: {
          height: tabBarHeight,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 10,
        },
        tabBarBackground: () => (
          <View
            style={[
              styles.glassContainer,
              {
                backgroundColor:
                  themeType === 'dark'
                    ? 'rgba(15, 16, 25, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)',
                borderTopColor:
                  themeType === 'dark'
                    ? 'rgba(255, 255, 255, 0.06)'
                    : 'rgba(0, 0, 0, 0.08)',
              },
            ]}
          >
            {/* Subtle gradient overlay */}
            <LinearGradient
              colors={
                themeType === 'dark'
                  ? [
                      'rgba(99, 102, 241, 0.03)',
                      'rgba(139, 92, 246, 0.02)',
                      'transparent',
                    ]
                  : [
                      'rgba(99, 102, 241, 0.02)',
                      'rgba(139, 92, 246, 0.01)',
                      'transparent',
                    ]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientOverlay}
            />

            {/* Top border */}
            <View
              style={[
                styles.topBorder,
                {
                  backgroundColor:
                    themeType === 'dark'
                      ? 'rgba(255, 255, 255, 0.04)'
                      : 'rgba(0, 0, 0, 0.08)',
                },
              ]}
            />
          </View>
        ),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          letterSpacing: -0.1,
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.modernIconContainer,
                focused && [
                  styles.focusedIconContainer,
                  { backgroundColor: `${theme.colors.primary}10` },
                ],
              ]}
            >
              <View
                style={[
                  styles.iconBackground,
                  focused && {
                    backgroundColor: `${theme.colors.primary}18`,
                    borderColor: `${theme.colors.primary}25`,
                  },
                ]}
              >
                <Home
                  size={20}
                  color={focused ? theme.colors.primary : color}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.modernIconContainer,
                focused && [
                  styles.focusedIconContainer,
                  { backgroundColor: `${theme.colors.primary}12` },
                ],
              ]}
            >
              <View
                style={[
                  styles.iconBackground,
                  focused && {
                    backgroundColor: `${theme.colors.primary}20`,
                    borderColor: `${theme.colors.primary}30`,
                  },
                ]}
              >
                <BarChart4
                  size={20}
                  color={focused ? theme.colors.primary : color}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.createIconContainer,
                {
                  shadowColor: theme.colors.primary,
                },
              ]}
            >
              <LinearGradient
                colors={[
                  theme.colors.primary,
                  theme.colors.primaryLight || theme.colors.primary,
                ]}
                style={styles.createGradient}
              >
                <View style={styles.createIconInner}>
                  <View style={styles.plusIcon}>
                    <View
                      style={[
                        styles.plusHorizontal,
                        { backgroundColor: '#FFFFFF' },
                      ]}
                    />
                    <View
                      style={[
                        styles.plusVertical,
                        { backgroundColor: '#FFFFFF' },
                      ]}
                    />
                  </View>
                </View>
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="parties"
        options={{
          title: 'Parties',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.modernIconContainer,
                focused && [
                  styles.focusedIconContainer,
                  { backgroundColor: `${theme.colors.primary}12` },
                ],
              ]}
            >
              <View
                style={[
                  styles.iconBackground,
                  focused && {
                    backgroundColor: `${theme.colors.primary}20`,
                    borderColor: `${theme.colors.primary}30`,
                  },
                ]}
              >
                <Users
                  size={20}
                  color={focused ? theme.colors.primary : color}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.modernIconContainer,
                focused && [
                  styles.focusedIconContainer,
                  { backgroundColor: `${theme.colors.primary}12` },
                ],
              ]}
            >
              <View
                style={[
                  styles.iconBackground,
                  focused && {
                    backgroundColor: `${theme.colors.primary}20`,
                    borderColor: `${theme.colors.primary}30`,
                  },
                ]}
              >
                <Menu
                  size={20}
                  color={focused ? theme.colors.primary : color}
                  strokeWidth={focused ? 2.2 : 1.8}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glassContainer: {
    flex: 1,
    overflow: 'hidden',
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.06)',
      },
    }),
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  modernIconContainer: {
    width: 50,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  focusedIconContainer: {
    transform: [{ scale: 1.05 }],
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  createIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -4,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
      },
    }),
  },
  createGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createIconInner: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  plusHorizontal: {
    width: 12,
    height: 2.5,
    borderRadius: 1.25,
    position: 'absolute',
  },
  plusVertical: {
    width: 2.5,
    height: 12,
    borderRadius: 1.25,
    position: 'absolute',
  },
});
