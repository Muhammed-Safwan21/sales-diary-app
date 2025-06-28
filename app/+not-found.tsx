import React from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/context/ThemeContext';

export default function NotFoundScreen() {
  const { theme, themeType } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <LinearGradient
        colors={
          themeType === 'dark'
            ? ['#1A1B3A', '#2D1B69', 'rgba(61, 42, 122, 0.3)', 'transparent']
            : ['#6366F1', '#8B5CF6', 'rgba(139, 92, 246, 0.2)', 'transparent']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles(theme).background}
      >
        <View style={styles(theme).container}>
          <BlurView
            intensity={themeType === 'dark' ? 20 : 80}
            tint={themeType}
            style={styles(theme).card}
          >
            <Image
              source={require('../assets/images/logo.png')}
              style={styles(theme).logo}
              resizeMode="contain"
            />
            <Text style={styles(theme).title}>Page Not Found</Text>
            <Text style={styles(theme).subtitle}>
              Sorry, the page you are looking for doesn't exist or has been moved.
            </Text>
            <Link href="/" style={styles(theme).link}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight || theme.colors.primary]}
                style={styles(theme).button}
              >
                <Text style={styles(theme).buttonText}>Go to Home</Text>
              </LinearGradient>
            </Link>
          </BlurView>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = (theme: any) => StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    ...Platform.select({
      ios: { shadowColor: theme.colors.primary, shadowOpacity: 0.12, shadowRadius: 24, shadowOffset: { width: 0, height: 8 } },
      android: { elevation: 8 },
    }),
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  link: {
    width: '100%',
  },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: -0.2,
  },
});
