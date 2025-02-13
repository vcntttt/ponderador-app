import { Stack } from "expo-router/stack";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

export default function Layout() {
  const backgroundColor = useThemeColor({}, "background");
  const navigation = useNavigation();

  const handleHeaderLeftPress = (canGoBack: boolean = false) => {
    if (canGoBack) {
      router.push("..");
      return;
    }
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor },
        headerShadowVisible: false,
        headerLeft: ({ tintColor, canGoBack }) => (
          <Ionicons
            name={canGoBack ? "chevron-back" : "menu"}
            color={tintColor}
            size={20}
            className={canGoBack ? "mr-5" : "mr-3"}
            onPress={() => handleHeaderLeftPress(canGoBack)}
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Escala de Notas",
        }}
      />
      <Stack.Screen
        name="results"
        options={{
          // headerShown: true,
          title: "Escala Generada",
        }}
      />
    </Stack>
  );
}
