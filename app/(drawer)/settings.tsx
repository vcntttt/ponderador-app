import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedSwitch } from "@/components/ui/ThemedSwitch";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import { ThemedCard } from "@/components/ui/ThemedCard";
import { useThemeChangerContext } from "@/context/ThemeContext";

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [settings, setSettings] = useState({
    darkMode: colorScheme === "dark",
    system: false,
  });

  return (
    <ThemedView className="gap-y-4">
      <ThemedCard>
        <ThemedSwitch
          text="Usar tema del sistema"
          value={settings.system}
          onValueChange={(value) => {
            setColorScheme(value ? "system" : "light");
            setSettings({ ...settings, system: value });
          }}
        />
        <ThemedSwitch
          text="Tema oscuro"
          value={settings.darkMode}
          onValueChange={(value) => {
            setColorScheme(value ? "dark" : "light");
            setSettings({ ...settings, darkMode: value });
          }}
        />
      </ThemedCard>
    </ThemedView>
  );
}
