import { Pressable, PressableProps } from "react-native";
import { ThemedText } from "./ThemedText";
import clsx from "clsx";

interface Props extends PressableProps {
  title: string;
  onPress?: () => void;
  className?: string;
  type?: "primary" | "outline";
  disabled?: boolean;
}

export const CustomButton = ({
  title,
  onPress,
  className,
  type = "primary",
  disabled = false,
  ...props
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(`p-3 rounded-md w-full ${className}`, {
        "bg-light-primary dark:bg-dark-primary": type === "primary",
        "bg-white dark:!bg-black/50": type === "outline",
        "opacity-50": disabled,
      })}
      {...props}
    >
      <ThemedText
        className={clsx("text-center font-medium", {
          "!text-dark-text dark:text-dark-text": type === "primary",
          "text-light-text dark:text-dark-text": type === "outline",
          "opacity-50": disabled,
        })}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
};
