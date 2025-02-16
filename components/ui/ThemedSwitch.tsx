import { View, Pressable, Platform } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/theme/useThemeColor";

interface Props {
  text?: string;
  value: boolean;
  className?: string;
  disabled?: boolean;
  onValueChange: (value: boolean) => void;
}

const isAndroid = Platform.OS === "android";

export const ThemedSwitch = ({
  text,
  value,
  className,
  disabled = false,
  onValueChange,
}: Props) => {
  const switchActiveColor = useThemeColor({}, "primary");

  return (
    <Pressable
      disabled={disabled}
      className={`flex flex-row mx-2 items-center justify-between ${
        disabled ? "opacity-50" : "active:opacity-80"
      } ${className}`}
      onPress={() => {
        if (!disabled) {
          onValueChange(!value);
        }
      }}
    >
      {text ? <ThemedText type="subtitle">{text}</ThemedText> : <View />}
      <Switch
        pointerEvents={disabled ? "none" : "auto"}
        value={value}
        onValueChange={(newValue) => {
          if (!disabled) {
            onValueChange(newValue);
          }
        }}
        disabled={disabled}
        thumbColor={isAndroid ? switchActiveColor : ""}
        trackColor={{
          false: "grey",
          true: switchActiveColor,
        }}
      />
    </Pressable>
  );
};
