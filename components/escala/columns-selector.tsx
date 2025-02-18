import { Platform, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { useState } from "react";
import { useResultSettingsStore } from "@/store/result-settings";

export const ColumnsSelector = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { numColumns, setNumColumns } = useResultSettingsStore();

  const options = Platform.OS === "web" ? 8 : 4;
  const columnOptions = Array.from({ length: options }, (_, i) => i + 1);


  return (
    <>
      <TouchableOpacity
        onPress={() => setDropdownVisible((prev) => !prev)}
        className="absolute right-12 top-0 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
      >
        <ThemedText>{numColumns}</ThemedText>
      </TouchableOpacity>
      {dropdownVisible && (
        <View
          style={{ position: "absolute", right: 35, top: 45, zIndex: 100 }}
          className="bg-gray-200 dark:bg-gray-700 rounded"
        >
          {columnOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                setNumColumns(option);
                setDropdownVisible(false);
              }}
              className="px-4 py-2"
            >
              <ThemedText type="subtitle">{option}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};
