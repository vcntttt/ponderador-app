import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedText } from "@/components/ui/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../../../context/ThemeContext";
import { ColorScheme } from "@/types";

// todo: system option support
const radioOptions: { label: string; value: ColorScheme; icon: any }[] = [
  // { label: "Sistema", value: "system", icon: "contrast-outline" },
  { label: "Oscuro", value: "dark", icon: "moon-outline" },
  { label: "Claro", value: "light", icon: "sunny-outline" },
];

export default function SettingsScreen() {
  const { currentTheme, toggleTheme } = useThemeContext();
  const [selectedOption, setSelectedOption] = useState(currentTheme);

  const handleSelect = async (value: ColorScheme) => {
    try {
      await toggleTheme(value);
      setSelectedOption(value);
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
                color={selectedOption === option.value ? "purple" : "gray"}
              />
              <ThemedText
                className={selectedOption === option.value ? "font-bold" : ""}
              >
                {option.label}
              </ThemedText>
            </View>
            <View className="w-5 h-5 rounded-full border border-gray-400 items-center justify-center">
              {selectedOption === option.value && (
                <View className="w-3 h-3 rounded-full bg-light-primary dark:bg-dark-primary" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ThemedCard>
    </ThemedView>
  );
}
