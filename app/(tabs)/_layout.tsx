import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { HapticTab } from "@/components/HapticTab";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="escala"
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calculadora",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calculator" color={color} size={24} />

          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="escala"
        options={{
          title: "Escala de Notas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
