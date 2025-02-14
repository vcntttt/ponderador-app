import React, { useEffect, useMemo, useState } from "react";
import { FlatList, TouchableOpacity, View, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ESCALA_SETTINGS_STORAGE_KEY } from "@/constants/storage";
import clsx from "clsx";

interface NotaEscala {
  score: number | string;
  grade: number | string;
  type: "reprobado" | "aprobado";
}

export default function ResultsScreen() {
  const [ascending, setAscending] = useState(true);
  const [numColumns, setNumColumns] = useState(2);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const options = Platform.OS === "web" ? 8 : 4;
  const columnOptions = Array.from({ length: options }, (_, i) => i + 1);

  const { scale, maxScoreNum, increment } = useLocalSearchParams<any>();
  const scaleData: NotaEscala[] = scale ? JSON.parse(scale) : [];

  const navigation = useNavigation();

  const orderedData = useMemo(() => {
    return ascending ? scaleData : [...scaleData].reverse();
  }, [scaleData, ascending]);

  const chunkedData = useMemo(() => {
    const rows = [];
    for (let i = 0; i < orderedData.length; i += numColumns) {
      rows.push(orderedData.slice(i, i + numColumns));
    }
    return rows;
  }, [orderedData, numColumns]);

  useEffect(() => {
    navigation.setOptions({
      title: `Escala Generada: ${maxScoreNum} pts - ${increment !== "1" ? `+${increment}` : ""}`,
    });
  }, [scaleData]);

  useEffect(() => {
    async function fetchSettings() {
      const settings = await AsyncStorage.getItem(ESCALA_SETTINGS_STORAGE_KEY);
      if (!settings) return;

      console.log("🚀 ~ fetchSettings ~ settings:", JSON.parse(settings));
      const { numColumns, ascending } = JSON.parse(settings);
      setNumColumns(numColumns);
      setAscending(ascending);
    }
    fetchSettings();
  }, []);

  async function handleColumnsChange(value: number) {
    setNumColumns(value);
    await AsyncStorage.setItem(
      ESCALA_SETTINGS_STORAGE_KEY,
      JSON.stringify({ numColumns: value, ascending })
    );
  }

  async function handleSortOrderChange() {
    setAscending((prev) => !prev);
    await AsyncStorage.setItem(
      ESCALA_SETTINGS_STORAGE_KEY,
      JSON.stringify({ ascending: !ascending, numColumns })
    );
  }

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
          className="absolute right-12 top-0 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          <ThemedText>{numColumns}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSortOrderChange}
          className="absolute right-0 top-0 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
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
                  handleColumnsChange(option);
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

      <FlatList
        className="flex-1 gap-x-2"
        data={chunkedData}
        keyExtractor={(_, rowIndex) => rowIndex.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: row, index: rowIndex }) => {
          const isStriped = rowIndex % 2 === 0;
          return (
            <View
              className={clsx("flex-row px-2 gap-x-2", {
                "bg-white dark:bg-black/50": isStriped,
              })}
            >
              {row.map((colItem: NotaEscala, colIndex: number) => (
                <>
                  <View key={colIndex} className="flex-1 py-2 px-1">
                    <View className="flex-row">
                      <ThemedText type="subtitle" className="flex-1">
                        {colItem.score}
                      </ThemedText>
                      <ThemedText
                        type="subtitle"
                        className={clsx("flex-1", {
                          "!text-red-600 dark:!text-red-500":
                            colItem.type === "reprobado",
                          "!text-blue-600 dark:!text-blue-500":
                            colItem.type === "aprobado",
                        })}
                      >
                        {colItem.grade}
                      </ThemedText>
                    </View>
                  </View>
                  {colIndex < row.length - 1 && (
                    <View className="w-2 bg-light-background dark:bg-dark-background h-full" />
                  )}
                </>
              ))}
              {row.length < numColumns &&
                Array.from({ length: numColumns - row.length }).map((_, i) => (
                  <View key={`empty-${i}`} className="flex-1 py-2 px-1" />
                ))}
            </View>
          );
        }}
      />
    </ThemedView>
  );
}
