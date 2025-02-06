import clsx from "clsx";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  className?: string;
  type?: "default" | "title" | "subtitle" | "card" | "label";
};

export function ThemedText({
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={clsx(`text-light-text dark:text-dark-text ${className}`, {
        "text-lg": type === "default",
        "text-3xl font-semibold": type === "title",
        "text-xl font-medium": type === "subtitle",
        "text-light-text dark:text-dark-text bg-white dark:bg-black/50 rounded-xl px-4 shadow shadow-black/5 w-full p-3":
          type === "card",
        "text-gray-500": type === "label",
      })}
      {...rest}
    />
  );
}
