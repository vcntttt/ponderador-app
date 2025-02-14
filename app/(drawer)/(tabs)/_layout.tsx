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
            name="menu"
            color={tintColor}
            size={20}
            className="ml-5 mr-2"
            onPress={handleHeaderLeftPress}
          />
        ),
        headerTitleStyle: { color: text },
        headerStyle: {
          backgroundColor,
          elevation: 0, // android
          shadowOpacity: 0, // ios
          borderBottomWidth: 0, // por si acaso
        },
        headerShown: true,
        tabBarActiveTintColor: text,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor,
          elevation: 0,
          ...(Platform.OS === "ios" && { position: "absolute" }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
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
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
