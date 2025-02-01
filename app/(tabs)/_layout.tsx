import React from "react";
import { Platform, View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { HapticTab } from "@/components/HapticTab";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const backgroundColor = useThemeColor({ }, "background");
  const text = useThemeColor({ }, "text");
  return (
    <Tabs
      initialRouteName="escala"
      screenOptions={{
        tabBarActiveTintColor: text,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor,
          ...(Platform.OS === "ios" && { position: "absolute" }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calculadora",
          headerShown: true,
          headerStyle: { backgroundColor },
          tabBarIcon: ({ color }) => (
            <Ionicons name="calculator" color={color} size={24} />
          ),
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
