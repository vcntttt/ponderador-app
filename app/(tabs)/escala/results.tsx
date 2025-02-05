import React from "react";
import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import clsx from "clsx";

export default function ResultsScreen() {
  const { scale } = useLocalSearchParams<{ scale?: string }>();
  const scaleData = scale ? JSON.parse(scale) : [];
  console.log(scaleData);

  return (
    <ThemedView>
      <FlatList
        data={scaleData}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <ThemedView className="flex-row border-b border-light-text dark:border-dark-text pb-2 mb-2">
            <ThemedText className="flex-1 font-bold">Puntaje</ThemedText>
            <ThemedText className="flex-1 font-bold">Nota</ThemedText>
          </ThemedView>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ThemedView className="flex-row py-2 border-b border-gray-300">
            <ThemedText
              className={clsx("flex-1", {
                "!text-red-500": item.type === "reprobado",
                "!text-blue-600 dark:!text-blue-400": item.type === "aprobado",
              })}
            >
              {item.score}
            </ThemedText>
            <ThemedText
              className={clsx("flex-1", {
                "!text-red-500": item.type === "reprobado",
                "!text-blue-600 dark:!text-blue-400": item.type === "aprobado",
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
