import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { View } from "react-native";
import { APP_NAME } from "@/constants/brand";
import { Link } from "expo-router";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{flex: 1}}>
      <ThemedView className="flex flex-col gap-y-4 justify-between h-full">
        <View>
          <ThemedText type="title">{APP_NAME}</ThemedText>
        </View>
        <ThemedText>
          Desarrollado por <Link className="underline italic" href="https://vrivera.is-a.dev">Vicente Rivera.</Link>
        </ThemedText>
      </ThemedView>
      {/* <DrawerItemList {...props} /> */}
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;
