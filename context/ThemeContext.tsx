import { createContext, useContext, useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import { useThemeColor } from "@/hooks/useThemeColor";
import { THEME_STORAGE_KEY } from "@/constants/storage";
import { ColorScheme, Theme } from "@/types";

interface ThemeContextType {
  currentTheme: ColorScheme;
  isSystemSelected: boolean;
  toggleTheme: (theme: Theme) => void;
}

const ThemeContext = createContext({} as ThemeContextType);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const [isSystemSelected, setIsSystemSelected] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((theme) => {
      if (!theme) return;

      setIsSystemSelected(theme === "system");

      setColorScheme(theme as Theme);
    });
  }, []);

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

  return (
    <ThemeProvider value={theme}>
      <ThemeContext.Provider
        value={{
          currentTheme: colorScheme!,
          isSystemSelected,
          toggleTheme: async (theme: Theme) => {
            setColorScheme(theme);

            await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
          },
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};
