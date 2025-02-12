import React from "react";
import { Platform } from "react-native";
import { Tabs, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { HapticTab } from "@/components/HapticTab";
import { useThemeColor } from "@/hooks/useThemeColor";
import { DrawerActions } from "@react-navigation/native";

export default function TabLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const navigation = useNavigation();

  const handleHeaderLeftPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <Tabs
      screenOptions={{
        headerLeft: ({ tintColor }) => (
          <Ionicons
            name="grid-outline"
            color={tintColor}
            size={20}
            className="ml-5 mr-2"
            onPress={handleHeaderLeftPress}
          />
        ),
        headerStyle: {
          backgroundColor,
          elevation: 0, // android
          shadowOpacity: 0, // ios
          borderBottomWidth: 0, // por si acaso
        },
        tabBarActiveTintColor: text,
        headerShown: true,
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
          tabBarIcon: ({ color }) => (
            <Ionicons name="calculator" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="escala"
        options={{
          headerShown: false,
          title: "Escala de Notas",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
