import React, { useMemo } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import clsx from "clsx";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ResultsScreen() {
  const [ascending, setAscending] = useState(true);
  const { scale } = useLocalSearchParams<{ scale?: string }>();
  const scaleData = scale ? JSON.parse(scale) : [];

  const orderedData = useMemo(() => {
    return ascending ? scaleData : [...scaleData].reverse();
  }, [scaleData, ascending]);

  return (
    <ThemedView>
      <FlatList
        data={orderedData}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <ThemedView className="flex-row pb-2 mb-2 items-center">
            <ThemedText type="subtitle" className="flex-1">
              Puntaje
            </ThemedText>
            <ThemedText type="subtitle" className="flex-1">
              Nota
            </ThemedText>
            <TouchableOpacity
              onPress={() => setAscending((prev) => !prev)}
              className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded ml-2 absolute right-0"
            >
              <ThemedText type="subtitle">
                {ascending ? (
                  <Ionicons name="arrow-down" />
                ) : (
                  <Ionicons name="arrow-up" />
                )}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ThemedView
            className={clsx("flex-row py-2", {
              "bg-white dark:bg-black/50": index % 2 === 0,
            })}
          >
            <ThemedText type="subtitle" className="flex-1">
              {item.score}
            </ThemedText>
            <ThemedText
              type="subtitle"
              className={clsx("flex-1", {
                "!text-red-600 dark:!text-red-500": item.type === "reprobado",
                "!text-blue-600 dark:!text-blue-500": item.type === "aprobado",
              })}
            >
              {item.grade}
            </ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}
