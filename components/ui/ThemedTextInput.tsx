import { useThemeColor } from "@/hooks/theme/useThemeColor";
import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  className?: string;
}

export default function ThemedTextInput({ className, ...props }: Props) {
  const text = useThemeColor({ }, "text");
  
  return (
    <TextInput
      className={`text-light-text dark:text-dark-text bg-white dark:bg-black/50 rounded-xl px-4 shadow shadow-black/5 ${className} p-3`}
      placeholderTextColor={text}
      {...props}
    />
  );
}
