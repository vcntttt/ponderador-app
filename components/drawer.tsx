import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { View } from "react-native";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      {/* <ThemedView className="flex flex-col gap-y-4">
        <ThemedText type="title">Ponderador</ThemedText>
      </ThemedView> */}
      {/* <DrawerItemList {...props} /> */}
      {/* <View className="my-4 bg-black dark:bg-white/80 h-px w-full" /> */}
      <ThemedText>coming soon..</ThemedText>
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;
