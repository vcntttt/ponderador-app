import clsx from "clsx";
import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  safe?: boolean;
  container?: boolean;
  className?: string;
  card?: boolean;
};

export function ThemedView({
  safe = false,
  container = false,
  className,
  card = false,
  ...otherProps
}: ThemedViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...otherProps}
      className={clsx("px-4", className, card && "bg-white dark:bg-black/50 rounded-xl px-4 shadow shadow-black/5 p-3 w-full")}
      style={[
        { 
          paddingTop: safe ? insets.top : 8,
          paddingBottom: safe ? insets.bottom : 8,
        },
        container && { flex: 1 , justifyContent: "center", alignItems: "center" },
      ]}
    />
  );
}
  