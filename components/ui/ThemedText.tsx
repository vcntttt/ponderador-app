import clsx from "clsx";
import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  className?: string;
  type?: "default" | "title";
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
      })}
      {...rest}
    />
  );
}
