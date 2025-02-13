import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ui/ThemedView";
import { useColorScheme } from "nativewind";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedText } from "@/components/ui/ThemedText";
import { THEME_STORAGE_KEY } from "@/constants/storage";
import { Ionicons } from "@expo/vector-icons";

type Theme = "system" | "dark" | "light";

const radioOptions: { label: string; value: Theme; icon: any }[] = [
  { label: "Sistema", value: "system", icon: "contrast-outline" },
  { label: "Oscuro", value: "dark", icon: "moon-outline" },
  { label: "Claro", value: "light", icon: "sunny-outline" },
];

export default function SettingsScreen() {
  const { setColorScheme } = useColorScheme();
  const [selectedOption, setSelectedOption] = useState("system");

  const handleSelect = async (value: Theme) => {
    try {
      setSelectedOption(value);
      setColorScheme(value);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, value);
    } catch (error) {
      console.error("Error al guardar el tema seleccionado:", error);
    }
  };

  return (
    <ThemedView className="gap-y-4 p-4">
      <ThemedText type="subtitle">Tema</ThemedText>
      <ThemedCard className="gap-y-4 p-4">
        {radioOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleSelect(option.value)}
            className="flex-row items-center justify-between py-2"
          >
            <View className="flex-row gap-x-4">
              <Ionicons
                name={option.icon}
                size={24}
                color={selectedOption === option.value ? "blue" : "gray"}
              />
              <ThemedText
                className={selectedOption === option.value ? "font-bold" : ""}
              >
                {option.label}
              </ThemedText>
            </View>
            <View className="w-5 h-5 rounded-full border border-gray-400 items-center justify-center">
              {selectedOption === option.value && (
                <View className="w-3 h-3 rounded-full bg-blue-500" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ThemedCard>
    </ThemedView>
  );
}
