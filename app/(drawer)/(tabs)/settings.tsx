import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { ThemedText } from "@/components/ui/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "@/context/ThemeContext";
import { Theme } from "@/types/theme";
import { ThemedSwitch } from "@/components/ui/ThemedSwitch";

const radioOptions: { label: string; value: Theme; icon: any }[] = [
  { label: "Sistema", value: "system", icon: "contrast-outline" },
  { label: "Oscuro", value: "dark", icon: "moon-outline" },
  { label: "Claro", value: "light", icon: "sunny-outline" },
];

export default function SettingsScreen() {
  const { currentTheme, isSystemSelected, toggleTheme } = useThemeContext();
  const [selectedOption, setSelectedOption] = useState<Theme>(currentTheme);
  // const [isRueditasOn, setIsRueditasOn] = useState(false);

  useEffect(() => {
    isSystemSelected
      ? setSelectedOption("system")
      : setSelectedOption(currentTheme);
  }, [currentTheme]);

  const handleSelect = async (value: Theme) => {
    try {
      await toggleTheme(value);
      setSelectedOption(value);
    } catch (error) {
      console.error("Error al guardar el tema seleccionado:", error);
    }
  };

  return (
    <ThemedView className="gap-y-4">
      <ThemedText type="subtitle">Tema</ThemedText>
      <View className="gap-y-4 py-4">
        {radioOptions.map((option, index) => (
          <View key={option.value}>
            <TouchableOpacity
              onPress={() => handleSelect(option.value)}
              className="flex-row items-center justify-between py-2"
            >
              <View className="flex-row gap-x-4">
                <Ionicons
                  name={option.icon}
                  size={24}
                  color={
                    selectedOption === option.value
                      ? currentTheme === "light"
                        ? "black"
                        : "white"
                      : "gray"
                  }
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
          </View>
        ))}
      </View>
      {/* <ThemedText type="subtitle">Interfaz</ThemedText>
      <ThemedCard>
        <ThemedSwitch
          textType="default"
          text="Protocolo rueditas de bici"
          value={isRueditasOn}
          onValueChange={() => setIsRueditasOn(!isRueditasOn)}
        />
      </ThemedCard> */}
    </ThemedView>
  );
}
