import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ThemedText } from "@/components/ui/ThemedText";
import CustomButton from "@/components/ui/CustomButton";
import { ThemedView } from "@/components/ui/ThemedView";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <ThemedView className="flex flex-col gap-y-4">
        <ThemedText type="title">Ponderador</ThemedText>
      </ThemedView>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
export default CustomDrawer;
