import { Text, View } from "react-native";

import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";

export default function SettingsScreen() {
  return (
    <ThemedView>
      <ThemedText type="title">Configuración y tema</ThemedText>
    </ThemedView>
  );
}
