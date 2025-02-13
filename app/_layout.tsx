import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeContextProvider } from "@/context/ThemeContext";
import "./global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const theme =
    colorScheme === "dark"
      ? {
          ...DarkTheme,
          colors: { ...DarkTheme.colors, background: backgroundColor },
        }
      : {
          ...DefaultTheme,
          colors: { ...DefaultTheme.colors, background: backgroundColor },
        };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <ThemeProvider value={theme}> */}
        <ThemeContextProvider>
          <Slot />
          <StatusBar style="auto" />
        </ThemeContextProvider>
        {/* </ThemeProvider> */}
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
