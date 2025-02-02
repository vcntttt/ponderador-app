import { TextInput, TextInputProps } from "react-native";

export default function ThemedTextInput({ ...props }: TextInputProps) {
  return (
    <TextInput
      className={`text-light-text dark:text-dark-text bg-white dark:bg-black/10 rounded-xl px-4 shadow shadow-black/5`}
      {...props}
    />
  );
}


// className="border border-gray-300 rounded-md p-3 text-base"