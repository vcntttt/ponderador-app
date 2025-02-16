import { Drawer } from "expo-router/drawer";
import { useThemeColor } from "@/hooks/theme/useThemeColor";
import DrawerContent from "@/components/drawer";

export default function DrawerLayout() {
  const backgroundColor = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor,
          elevation: 0, // android
          shadowOpacity: 0, // ios
          borderBottomWidth: 0, // por si acaso
        },
        headerTitleStyle: { color: text },
      }}
      drawerContent={DrawerContent}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerLabel: "Home",
          title: "",
        }}
      />
      <Drawer.Screen
        name="changelog"
        options={{
          drawerLabel: "Changelog",
          title: "Changelog",
        }}
      />
    </Drawer>
  );
}
