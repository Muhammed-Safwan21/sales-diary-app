import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';

export default function SplashScreen() {
  const { theme } = useTheme();
  const router: any = useRouter();

  const navigateToLogin = () => {
    router.replace('/auth/login');
  };

  useEffect(() => {
    // Simulate loading time and navigate to login
    const timer = setTimeout(() => {
      navigateToLogin();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSequence(
            withSpring(0.8, { damping: 10 }),
            withDelay(500, withSpring(1.2, { damping: 8 })),
            withDelay(1000, withSpring(1, { damping: 12 }))
          ),
        },
      ],
      opacity: withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(1, {
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
        withDelay(1500, withTiming(0.8, { duration: 500 }))
      ),
    };
  });

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(500)}
        style={[styles.logoContainer, logoStyle]}
      >
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
