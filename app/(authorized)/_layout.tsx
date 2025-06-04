import { Redirect, Stack } from 'expo-router';
import { ReactNode } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function RootLayout(): ReactNode {
  const { isAuthenticated, isLoading } = useSelector(
    (state: any) => state.auth
  );
  console.log('isAuthenticatedisAuthenticatedisAuthenticated', isAuthenticated);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
