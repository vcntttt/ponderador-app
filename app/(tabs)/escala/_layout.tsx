import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Escala de Notas",
          headerLeft: () => (
            <Ionicons name="stats-chart" color="#fff" size={24} />
          ),
        }}
      />
      <Stack.Screen name="results" options={{ title: "Resultados" }} />
    </Stack>
  );
}
