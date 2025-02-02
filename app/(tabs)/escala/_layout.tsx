import { Stack } from "expo-router/stack";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Layout() {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Escala de Notas",
        }}
      />
      <Stack.Screen name="results" options={{ title: "Resultados" }} />
    </Stack>
  );
}
