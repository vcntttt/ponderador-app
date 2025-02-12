import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedSwitch } from "@/components/ui/ThemedSwitch";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import { ThemedCard } from "@/components/ui/ThemedCard";

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [settings, setSettings] = useState({
    darkMode: colorScheme === "dark",
    system: false,
  });

  const handleSystemToggle = (value: boolean) => {
    if (value) {
      setColorScheme("system");
    } else {
      setColorScheme(settings.darkMode ? "dark" : "light");
    }
    setSettings({ ...settings, system: value });
  };

  const handleDarkModeToggle = (value: boolean) => {
    setSettings({ ...settings, darkMode: value });
    if (!settings.system) {
      setColorScheme(value ? "dark" : "light");
    }
  };

  return (
    <ThemedView className="gap-y-4">
      <ThemedCard>
        <ThemedSwitch
          text="Usar tema del sistema"
          value={settings.system}
          onValueChange={handleSystemToggle}
        />
        <ThemedSwitch
          disabled={settings.system}
          text="Tema oscuro"
          value={settings.darkMode}
          onValueChange={handleDarkModeToggle}
        />
      </ThemedCard>
    </ThemedView>
  );
}
