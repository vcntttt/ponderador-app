import { useThemeColor } from "@/hooks/useThemeColor";
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


// className="border border-gray-300 rounded-md p-3 text-base"