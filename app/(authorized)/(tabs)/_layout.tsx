import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

// Updated theme to match OrderSummaryModal
const ACCENT_COLOR = "#4D5DFA";
export const COLOR = {
  primary: ACCENT_COLOR,
  secondary: "#E3E6FF",
  accent: "#7A86FF",
  white: "#FFFFFF",
  black: "#212529",
  grey: "#6C757D",
  lightGrey: "#F5F6FA",
  darkGrey: "#495057",
  red: "#ef4444",
  green: "#22c55e",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLOR.primary,
        tabBarInactiveTintColor: COLOR.grey,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: Platform.OS !== "ios" ? "absolute" : undefined,
            marginBottom: -38,
            backgroundColor: COLOR.white,
            borderTopColor: 'rgba(77, 93, 250, 0.1)',
            shadowColor: COLOR.black,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 8,
          },
          default: {
            backgroundColor: COLOR.white,
            borderTopColor: 'rgba(77, 93, 250, 0.1)',
            shadowColor: COLOR.black,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 8,
          },
        }),
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 12,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "stats-chart" : "stats-chart-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "Report",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "receipt" : "receipt-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "settings" : "settings-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}