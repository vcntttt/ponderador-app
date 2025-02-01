import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps } from "react-native";

export default function ThemedTextInput({ ...props }: TextInputProps) {
  const color = useThemeColor({}, "text");
  return (
    <TextInput
      {...props}
      style={{
        color,
      }}
    />
  );
}
