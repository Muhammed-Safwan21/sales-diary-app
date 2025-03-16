import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import { ReactNode } from "react";
import { useAuthSession } from "../providers/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout(): ReactNode {
  const { token, isLoading } = useAuthSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (token?.current === "") {
    return <Redirect href="/login" />;
  }

  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
  );
}
