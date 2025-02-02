import React from "react";
import { ScrollView, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import clsx from "clsx";

export default function ResultsScreen() {
  const { scale } = useLocalSearchParams<{ scale?: string }>();
  const scaleData = scale ? JSON.parse(scale) : [];

  return (
    <ThemedView>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 8,
          }}
          className="border-light-text dark:border-dark-text"
        >
          <ThemedText style={{ flex: 1, fontWeight: "bold" }}>
            Puntaje
          </ThemedText>
          <ThemedText style={{ flex: 1, fontWeight: "bold" }}>Nota</ThemedText>
        </View>

        {scaleData.map(
          (
            item: { grade: number; score: string; type: string },
            index: number
          ) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                paddingVertical: 8,
                borderBottomWidth: 0.5,
                borderColor: "#ccc",
              }}
            >
              <ThemedText
                className={clsx("flex-1", {
                  "!text-red-500": item.type === "reprobado",
                  "!text-blue-400": item.type === "aprobado",
                })}
              >
                {item.score}
              </ThemedText>
              <ThemedText
                className={clsx("flex-1", {
                  "!text-red-500": item.type === "reprobado",
                  "!text-blue-400": item.type === "aprobado",
                })}
              >
                {item.grade}
              </ThemedText>
            </View>
          )
        )}
      </ScrollView>
    </ThemedView>
  );
}
