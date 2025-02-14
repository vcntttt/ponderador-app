import React, { useEffect, useMemo, useState } from "react";
import { FlatList, TouchableOpacity, View, Platform } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import clsx from "clsx";
import { useResultSettingsStore } from "@/store/result-settings";

interface NotaEscala {
  score: number | string;
  grade: number | string;
  type: "reprobado" | "aprobado";
}

export default function ResultsScreen() {
  const { numColumns, ascending, setNumColumns, toggleAscending } =
    useResultSettingsStore();
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
      title: `Escala Generada: ${maxScoreNum} pts${
        increment !== "1" ? ` | +${increment}` : ""
      }`,
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
          className="absolute right-12 top-0 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
        >
          <ThemedText>{numColumns}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleAscending}
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

      <FlatList
        className="flex-1 gap-x-2"
        data={chunkedData}
        keyExtractor={(_, rowIndex) => rowIndex.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: row, index: rowIndex }) => {
          const isStriped = rowIndex % 2 === 0;
          return (
            <View
              className={clsx("flex-row gap-x-2 px-2", {
                "bg-white dark:bg-black/50": isStriped,
              })}
            >
              {row.map((colItem: NotaEscala, colIndex: number) => (
                <React.Fragment key={`cell-${rowIndex}-${colIndex}`}>
                  <View
                    className={clsx("flex-1 py-2", {
                      "px-1": numColumns >= 1,
                      "px-2": numColumns === 3,
                      "px-3": numColumns === 4,
                    })}
                  >
                    <View
                      className={clsx("flex-row items-center", {
                        "flex-1": numColumns == 1,
                        // "justify-between": 1 > numColumns,
                      })}
                    >
                      <ThemedText
                        type="subtitle"
                        className={clsx("flex-1", {
                          "text-xs": numColumns === 3,
                          "text-sm": numColumns === 4,
                        })}
                      >
                        {colItem.score}
                      </ThemedText>
                      <ThemedText
                        type="subtitle"
                        className={clsx(
                          "flex-1",
                          {
                            "text-right": numColumns > 1,
                            "text-xs": numColumns === 3,
                            "text-sm": numColumns === 4,
                          },
                          {
                            "!text-red-600 dark:!text-red-500":
                              colItem.type === "reprobado",
                            "!text-blue-600 dark:!text-blue-500":
                              colItem.type === "aprobado",
                          }
                        )}
                      >
                        {colItem.grade}
                      </ThemedText>
                    </View>
                  </View>
                  {colIndex < row.length - 1 && (
                    <View className="w-2 bg-light-background dark:bg-dark-background h-full" />
                  )}
                </React.Fragment>
              ))}
              {row.length < numColumns &&
                Array.from({ length: numColumns - row.length }).map((_, i) => (
                  <View
                    key={`empty-${rowIndex}-${i}`}
                    className="flex-1 py-2 px-1"
                  />
                ))}
            </View>
          );
        }}
      />
    </ThemedView>
  );
}
