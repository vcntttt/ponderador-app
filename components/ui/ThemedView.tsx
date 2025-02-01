import clsx from "clsx";
import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  safe?: boolean;
  className?: string;
};

export function ThemedView({
  safe = false,
  className,
  ...otherProps
}: ThemedViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...otherProps}
      className={clsx("px-4", className)}
      style={[
        { 
          paddingTop: safe ? insets.top : 8,
          paddingBottom: safe ? insets.bottom : 8,
        },
      ]}
    />
  );
}
  