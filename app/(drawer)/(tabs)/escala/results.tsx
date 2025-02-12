import React, { useEffect, useMemo, useState } from "react";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import clsx from "clsx";

interface NotaEscala {
  score: string | number;
  grade: string | number;
  type: "reprobado" | "aprobado";
}

export default function ResultsScreen() {
  const [ascending, setAscending] = useState(true);
  const [numColumns, setNumColumns] = useState(1);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const options = Platform.OS === "web" ? 8 : 4;
  const columnOptions = Array.from({ length: options }, (_, i) => i + 1);

  const { scale } = useLocalSearchParams<{ scale?: string }>();
  const scaleData = scale ? JSON.parse(scale) : [];

  const orderedData = useMemo(() => {
    return ascending ? scaleData : [...scaleData].reverse();
  }, [scaleData, ascending]);

  const columnsData = useMemo(() => {
    const perColumn = Math.ceil(orderedData.length / numColumns);
    const subsets = [];
    for (let i = 0; i < numColumns; i++) {
      subsets.push(orderedData.slice(i * perColumn, (i + 1) * perColumn));
    }
    return subsets;
  }, [orderedData, numColumns]);

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `Escala Generada: ${scaleData?.length - 1} pts`,
    });
  }, [scaleData]);

  return (
    <ThemedView className="flex-1">
      <View className="relative mb-4">
        <View className="flex-row">
          <ThemedText type="subtitle" className="flex-1">
            Puntaje
          </ThemedText>
          <ThemedText type="subtitle" className="flex-1">
            Nota
          </ThemedText>
        </View>
        <TouchableOpacity
          onPress={() => setDropdownVisible((prev) => !prev)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded absolute right-12"
        >
          <ThemedText>{numColumns}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setAscending((prev) => !prev)}
          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded absolute right-0"
        >
          <ThemedText>
            {ascending ? (
              <Ionicons name="arrow-down" size={16} />
            ) : (
              <Ionicons name="arrow-up" size={16} />
            )}
          </ThemedText>
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between">
          {columnsData.map((subset, colIndex) => (
            <View key={colIndex} className="flex-1 mx-1">
              {subset.map((item: NotaEscala, rowIndex: number) => (
                <View
                  key={rowIndex}
                  className={clsx("flex-row py-2 px-2", {
                    "bg-white dark:bg-black/50": rowIndex % 2 === 0,
                  })}
                >
                  <ThemedText type="subtitle" className="flex-1">
                    {item.score}
                  </ThemedText>
                  <ThemedText
                    type="subtitle"
                    className={clsx("flex-1", {
                      "!text-red-600 dark:!text-red-500":
                        item.type === "reprobado",
                      "!text-blue-600 dark:!text-blue-500":
                        item.type === "aprobado",
                    })}
                  >
                    {item.grade}
                  </ThemedText>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
