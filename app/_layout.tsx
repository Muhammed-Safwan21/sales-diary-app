import { Slot, SplashScreen } from "expo-router";
import { ReactNode, useEffect } from "react";
import AuthProvider from "./providers/AuthProvider";
import { useFonts } from "expo-font";
import { fonts } from "@/config/font";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
export default function RootLayout(): ReactNode {
  const [loaded] = useFonts(fonts);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </SafeAreaView>
  );
}
