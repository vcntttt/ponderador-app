import { Pressable, PressableProps } from "react-native";
import { ThemedText } from "./ThemedText";
import clsx from "clsx";

interface Props extends PressableProps {
  title: string;
  onPress?: () => void;
  className?: string;
  type?: "primary" | "outline";
}

export const CustomButton = ({
  title,
  onPress,
  className,
  type = "primary",
  ...props
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(`p-3 rounded-md w-full ${className}`, {
        "bg-light-primary dark:bg-dark-primary": type === "primary",
        "bg-white dark:!bg-black/50": type === "outline",
      })}
      {...props}
    >
      <ThemedText
        className={clsx("text-center font-medium", {
          "!text-dark-text dark:text-dark-text": type === "primary",
          "text-light-text dark:text-dark-text": type === "outline",
        })}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
};
