import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
  StatusBar,
  Platform,
  StatusBarStyle,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { spacing } from '../theme';

interface LayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  safeArea?: boolean;
  statusBarStyle?: StatusBarStyle;
}

export const Layout = ({
  children,
  style,
  safeArea = true,
  statusBarStyle = 'dark-content',
}: LayoutProps) => {
  const { theme } = useTheme();

  const Container = safeArea ? SafeAreaView : View;

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={theme.colors.background}
      />
      <Container
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
          style,
        ]}
      >
        {children}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    ...Platform.select({
      ios: {
        paddingTop: spacing.xl,
      },
      android: {
        paddingTop: spacing.lg,
      },
    }),
  },
}); 